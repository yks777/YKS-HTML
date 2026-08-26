/* ============================================
   YKS HTML — Shared Module
   Funções reutilizadas pelo preview do side panel
   e pela aba inteira de teste.
   ============================================ */

const YKS = (() => {
  function wrapWithTheme(code) {
    if (!code || code.trim() === '') {
      return emptyTemplate();
    }

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 16px;
      background: #0d0812;
      color: #a390b5;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      line-height: 1.6;
      min-height: 100vh;
    }
    h1, h2, h3, h4, h5, h6 { color: #f3edff; margin-top: 1em; margin-bottom: 0.5em; }
    a { color: #a855f7; text-decoration: none; }
    a:hover { color: #c084fc; text-decoration: underline; }
    code { background: #1a0f2e; padding: 2px 6px; border-radius: 3px; font-size: 0.9em; color: #d8b4fe; }
    pre { background: #1a0f2e; padding: 12px; border-radius: 6px; overflow-x: auto; border: 1px solid #2a0d45; }
    pre code { background: transparent; padding: 0; }
    img { max-width: 100%; height: auto; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #2a0d45; padding: 8px 12px; text-align: left; }
    th { background: #1a0f2e; color: #f3edff; }
    input, textarea, button, select { font-family: inherit; font-size: inherit; }
    button { background: #a855f7; color: #000; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
    button:hover { background: #c084fc; }
    input, textarea { background: #1a0f2e; border: 1px solid #2a0d45; color: #f3edff; padding: 8px; border-radius: 4px; }
    input:focus, textarea:focus { outline: none; border-color: #a855f7; }
    ::selection { background: rgba(168,85,247,0.3); }
  </style>
</head>
<body>
${code}
</body>
</html>`;
  }

  function emptyTemplate() {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      margin: 0;
      padding: 40px;
      background: #0d0812;
      color: #581c87;
      font-family: monospace;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
  </style>
</head>
<body>
  <div>
    <p>$ aguardando HTML...</p>
    <p style="font-size: 12px; margin-top: 8px;">digite ou cole seu código</p>
  </div>
</body>
</html>`;
  }

  return { wrapWithTheme, emptyTemplate };
})();
