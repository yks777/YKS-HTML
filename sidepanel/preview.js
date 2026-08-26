/* ============================================
   YKS HTML — Preview Module
   ============================================ */

const Preview = (() => {
  let iframe;
  let debounceTimer = null;
  const DEBOUNCE_DELAY = 300;

  function init() {
    iframe = document.getElementById('previewFrame');
  }

  function update(code) {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      render(code);
    }, DEBOUNCE_DELAY);
  }

  function render(code) {
    if (!iframe) return;
    iframe.srcdoc = YKS.wrapWithTheme(code);
  }

  return { init, update };
})();
