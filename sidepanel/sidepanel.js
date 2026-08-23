/* ============================================
   YKS HTML — Main Controller
   ============================================ */

const App = (() => {
  let currentMode = 'editor';

  async function init() {
    Editor.init();
    Preview.init();
    await loadSavedCode();
    setupEventListeners();
    setupModals();
    Storage.startAutoSave(() => Editor.getCode());
    Editor.focus();
  }

  async function loadSavedCode() {
    const autoSaved = await Storage.loadAutoSave();
    if (autoSaved) {
      Editor.setCode(autoSaved);
    }
  }

  function setupEventListeners() {
    document.getElementById('btnView').addEventListener('click', showPreview);
    document.getElementById('btnBack').addEventListener('click', showEditor);
    document.getElementById('btnSave').addEventListener('click', openSaveModal);
    document.getElementById('btnLoad').addEventListener('click', openLoadModal);
    document.getElementById('btnTemplates').addEventListener('click', openTemplatesModal);
    document.getElementById('btnClear').addEventListener('click', clearEditor);
  }

  function showPreview() {
    const code = Editor.getCode();
    if (code.trim() === '') return;

    currentMode = 'preview';
    document.getElementById('editorSection').classList.add('hidden');
    document.getElementById('viewActions').classList.add('hidden');
    document.getElementById('previewSection').classList.remove('hidden');
    document.getElementById('commandText').textContent = 'preview index.html';

    Preview.update(code);
  }

  function showEditor() {
    currentMode = 'editor';
    document.getElementById('editorSection').classList.remove('hidden');
    document.getElementById('viewActions').classList.remove('hidden');
    document.getElementById('previewSection').classList.add('hidden');
    document.getElementById('commandText').textContent = 'cat index.html';

    Editor.focus();
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
        if (currentMode === 'preview') {
          showEditor();
        } else {
          document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.classList.remove('active');
          });
        }
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