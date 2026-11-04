/* ============================================
   YKS HTML — Main Controller
   Preview destrutivo via document.write(fonte.value)
   ============================================ */

const App = (() => {
  const LIVE_KEY = 'yks-live';
  const SENDER = 'sidepanel';
  let applyingExternal = false;

  async function init() {
    Editor.init();
    await loadSavedCode();
    setupEventListeners();
    setupModals();
    setupLiveSync();
    Storage.startAutoSave(() => Editor.getCode());
    Editor.focus();
  }

  /* ---------- Live sync (aba inteira) ---------- */
  function setLive(code) {
    return new Promise((resolve) => {
      chrome.storage.session.set({ [LIVE_KEY]: { code, sender: SENDER } }, resolve);
    });
  }

  function handleExternalChange(changes, area) {
    if (area !== 'session') return;
    const change = changes[LIVE_KEY];
    if (!change || !change.newValue) return;
    if (change.newValue.sender === SENDER) return;

    applyingExternal = true;
    Editor.setCode(change.newValue.code);
    applyingExternal = false;
  }

  function setupLiveSync() {
    chrome.storage.onChanged.addListener(handleExternalChange);
  }

  async function loadSavedCode() {
    const autoSaved = await Storage.loadAutoSave();
    if (autoSaved) {
      Editor.setCode(autoSaved);
    }
  }

  function setupEventListeners() {
    document.getElementById('btnSave').addEventListener('click', openSaveModal);
    document.getElementById('btnLoad').addEventListener('click', openLoadModal);
    document.getElementById('btnTemplates').addEventListener('click', openTemplatesModal);
    document.getElementById('btnOpenTab').addEventListener('click', openTab);
    document.getElementById('btnClear').addEventListener('click', clearEditor);

    Editor.onChange((code) => {
      if (!applyingExternal) {
        setLive(code);
      }
    });
  }

  async function openTab() {
    const code = Editor.getCode();
    await setLive(code);

    const tabUrl = chrome.runtime.getURL('sidepanel/tab.html');
    const tabs = await new Promise((resolve) =>
      chrome.tabs.query({ url: tabUrl }, resolve)
    );
    if (tabs && tabs.length > 0) {
      chrome.tabs.update(tabs[0].id, { active: true });
    } else {
      chrome.tabs.create({ url: tabUrl });
    }
  }

  function setupModals() {
    document.getElementById('closeTemplates').addEventListener('click', closeTemplatesModal);
    document.getElementById('closeSave').addEventListener('click', closeSaveModal);
    document.getElementById('closeLoad').addEventListener('click', closeLoadModal);
    document.getElementById('confirmSave').addEventListener('click', confirmSave);
    document.getElementById('cancelSave').addEventListener('click', closeSaveModal);

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
          overlay.classList.remove('active');
        });
      }
    });
  }

  function openTemplatesModal() {
    const modal = document.getElementById('templatesModal');
    const list = document.getElementById('templatesList');
    const templates = Templates.getAll();

    list.innerHTML = templates.map((t, i) => `
      <div class="template-item" data-index="${i}">
        <div class="template-name">[${i + 1}] ${t.name}</div>
        <div class="template-desc">${t.desc}</div>
      </div>
    `).join('');

    list.querySelectorAll('.template-item').forEach(item => {
      item.addEventListener('click', () => {
        const index = parseInt(item.dataset.index);
        const template = Templates.get(index);
        if (template) {
          Editor.setCode(template.code);
          closeTemplatesModal();
        }
      });
    });

    modal.classList.add('active');
  }

  function closeTemplatesModal() {
    document.getElementById('templatesModal').classList.remove('active');
  }

  function openSaveModal() {
    const modal = document.getElementById('saveModal');
    const input = document.getElementById('saveNameInput');
    input.value = '';
    modal.classList.add('active');
    input.focus();
  }

  function closeSaveModal() {
    document.getElementById('saveModal').classList.remove('active');
  }

  async function confirmSave() {
    const input = document.getElementById('saveNameInput');
    const name = input.value.trim();
    
    if (!name) {
      input.style.borderColor = '#ef4444';
      setTimeout(() => {
        input.style.borderColor = '';
      }, 1000);
      return;
    }

    const code = Editor.getCode();
    await Storage.saveSnippet(name, code);
    closeSaveModal();
  }

  async function openLoadModal() {
    const modal = document.getElementById('loadModal');
    const list = document.getElementById('loadList');
    const snippets = await Storage.loadSnippets();

    if (snippets.length === 0) {
      list.innerHTML = '<div class="empty-state">$ nenhum snippet salvo</div>';
    } else {
      list.innerHTML = snippets.map(s => `
        <div class="snippet-item" data-id="${s.id}">
          <div class="snippet-info">
            <div class="snippet-name">${escapeHtml(s.name)}</div>
            <div class="snippet-date">${Storage.formatDate(s.created)}</div>
          </div>
          <button class="snippet-delete" data-id="${s.id}">[x]</button>
        </div>
      `).join('');

      list.querySelectorAll('.snippet-item').forEach(item => {
        item.addEventListener('click', async (e) => {
          if (e.target.classList.contains('snippet-delete')) return;
          const id = item.dataset.id;
          const snippet = await Storage.loadSnippet(id);
          if (snippet) {
            Editor.setCode(snippet.code);
            closeLoadModal();
          }
        });
      });

      list.querySelectorAll('.snippet-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const id = btn.dataset.id;
          await Storage.deleteSnippet(id);
          openLoadModal();
        });
      });
    }

    modal.classList.add('active');
  }

  function closeLoadModal() {
    document.getElementById('loadModal').classList.remove('active');
  }

  function clearEditor() {
    const code = Editor.getCode();
    if (code.trim() === '') return;
    
    if (confirm('Limpar todo o conteúdo do editor?')) {
      Editor.clear();
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
