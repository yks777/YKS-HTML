/* ============================================
   YKS HTML — Tab Controller (aba inteira)
   Preview destrutivo via document.write(fonte.value)
   ============================================ */

const TabApp = (() => {
  function init() {
    const fonte = document.getElementById('fonte');
    window.fonte = fonte;
    fonte.focus();

    document.getElementById('btnClose').addEventListener('click', () => window.close());
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', TabApp.init);
