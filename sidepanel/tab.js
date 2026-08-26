/* ============================================
   YKS HTML — Tab Controller (aba inteira)
   Editor (esq) + Preview (dir) com sync ao vivo
   via chrome.storage.session.
   ============================================ */

const TabApp = (() => {
  const SENDER = 'tab';
  const LIVE_KEY = 'yks-live';
  const DEBOUNCE_DELAY = 300;

  let editor;
  let lineNumbers;
  let lineCount;
  let previewFrame;
  let commandText;

  let debounceTimer = null;
  let applyingExternal = false;

  /* ---------- storage.session helpers ---------- */
  function setLive(code) {
    return new Promise((resolve) => {
      chrome.storage.session.set({ [LIVE_KEY]: { code, sender: SENDER } }, resolve);
    });
  }

  function getLive() {
    return new Promise((resolve) => {
      chrome.storage.session.get(LIVE_KEY, (result) => {
        resolve(result[LIVE_KEY] || null);
      });
    });
  }

  /* ---------- editor ---------- */
  function updateLineNumbers() {
    const lines = editor.value.split('\n').length;
    let html = '';
    for (let i = 1; i <= lines; i++) {
      html += i + '\n';
    }
    lineNumbers.textContent = html;
    lineCount.textContent = lines + (lines === 1 ? ' line' : ' lines');
  }

  function renderPreview() {
    previewFrame.srcdoc = YKS.wrapWithTheme(editor.value);
  }

  function onInput() {
    updateLineNumbers();
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      renderPreview();
      setLive(editor.value);
    }, DEBOUNCE_DELAY);
  }

  function applyExternal(code) {
    if (code === editor.value) return;
    applyingExternal = true;
    editor.value = code;
    updateLineNumbers();
    renderPreview();
    applyingExternal = false;
  }

  function handleExternalChange(changes, area) {
    if (area !== 'session') return;
    const change = changes[LIVE_KEY];
    if (!change || !change.newValue) return;
    if (change.newValue.sender === SENDER) return;
    applyExternal(change.newValue.code);
  }

  /* ---------- init ---------- */
  async function init() {
    editor = document.getElementById('tabEditor');
    lineNumbers = document.getElementById('tabLineNumbers');
    lineCount = document.getElementById('tabLineCount');
    previewFrame = document.getElementById('tabPreview');
    commandText = document.getElementById('commandText');

    editor.addEventListener('input', onInput);

    editor.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.slice(0, start) + '  ' + editor.value.slice(end);
        editor.selectionStart = editor.selectionEnd = start + 2;
        onInput();
      }
    });

    editor.addEventListener('scroll', () => {
      lineNumbers.scrollTop = editor.scrollTop;
    });

    document.getElementById('btnReload').addEventListener('click', renderPreview);
    document.getElementById('btnClose').addEventListener('click', () => window.close());

    chrome.storage.onChanged.addListener(handleExternalChange);

    const live = await getLive();
    let initial = live ? live.code : '';
    if (!initial) {
      const auto = await new Promise((r) =>
        chrome.storage.local.get('yks-html-autosave', (res) => r(res['yks-html-autosave'] || null))
      );
      initial = auto ? auto.code : '';
    }

    editor.value = initial;
    updateLineNumbers();
    renderPreview();
    editor.focus();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', TabApp.init);
