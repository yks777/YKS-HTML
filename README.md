# YKS HTML

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)
![Version](https://img.shields.io/badge/Version-1.0.0-purple)

Side panel para testar HTML

## Funcionalidades

- **Editor de código** com numeração de linhas e suporte a Tab
- **Preview em tempo real** com debounce (300ms)
- **8 templates prontos** para começar rapidamente
- **Save/Load de snippets** (máximo 50 salvos)
- **Auto-save** a cada 5 segundos
- **Design CRT** com scanlines e tema roxo phosphor
- **Aba inteira de teste** (`[ Aba ]`): abre uma aba do navegador com editor (esquerda) + preview (direita) em tela cheia
- **Sync ao vivo** entre side panel e aba — editar em um atualiza o outro automaticamente

### Templates Inclusos

1. HTML5 Básico
2. Flexbox Demo
3. CSS Grid
4. Formulário
5. Animação CSS
6. Canvas JS
7. Tabela
8. Cards

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/NicolasToledoo/yks-html.git
   ```

2. Abra o Chrome e acesse `chrome://extensions`

3. Ative o **"Modo do desenvolvedor"** (canto superior direito)

4. Clique em **"Carregar extensão descompactada"**

5. Selecione a pasta do projeto

6. O ícone da extensão aparecerá na barra de ferramentas

## Uso

1. Clique no ícone da extensão para abrir o side panel

2. Digite ou cole seu HTML no editor

3. Clique em **[ Ver HTML ]** para visualizar o preview

4. Use a toolbar para:
   - **[Save]** — Salvar snippet atual
   - **[Load]** — Carregar snippet salvo
   - **[Templates]** — Selecionar template pronto
    - **[Clear]** — Limpar editor
    - **[ Aba ]** — Abrir aba inteira de teste (editor + preview em tela cheia, com sync ao vivo)

5. Pressione `ESC` para voltar do preview ao editor

### Aba inteira de teste

O botão `[ Aba ]` abre uma aba do navegador dedicada a testar o HTML em tela cheia:

- **Esquerda:** editor com numeração de linhas (mesmo do side panel)
- **Direita:** preview em tempo real
- Edições na aba sincronizam com o side panel e vice-versa (sem duplicar abas)
- `[ Recarregar ]` re-renderiza o preview; `[ Fechar ]` fecha a aba

## Estrutura do Projeto

```
yks-html/
├── manifest.json          # Configuração da extensão (Manifest V3)
├── background.js          # Service worker para abrir side panel
├── icons/                 # Ícones da extensão
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── assets/
│   └── fonts/             # Fontes personalizadas
└── sidepanel/
    ├── sidepanel.html     # HTML principal do side panel
    ├── sidepanel.css      # Estilos com tema CRT phosphor-purple
    ├── sidepanel.js       # Controlador principal da aplicação
    ├── editor.js          # Módulo do editor de código
    ├── preview.js         # Módulo de preview com iframe
    ├── shared.js          # wrapWithTheme/emptyTemplate reutilizado (preview + aba)
    ├── tab.html           # Aba inteira de teste (editor + preview)
    ├── tab.css            # Layout de 2 colunas da aba
    ├── tab.js             # Controller da aba (sync ao vivo via storage.session)
    ├── templates.js       # Templates HTML prontos
    └── storage.js         # Gerenciamento de armazenamento (chrome.storage)
```

## Tecnologias

- **Chrome Extension Manifest V3**
- **JavaScript vanilla** (módulos IIFE)
- **CSS customizado** com variáveis CSS
- **Fonte:** JetBrains Mono

## Design

A extensão possui uma estética inspirada em terminais CRT antigos com:

- Efeito de scanlines sobre toda a interface
- Paleta de cores roxa phosphor (`#a855f7`, `#7c3aed`, `#581c87`)
- Brilho neon em elementos interativos
- Fonte monoespaçada JetBrains Mono
- Fundo escuro com gradientes radiais roxos

## Licença

[MIT](https://opensource.org/licenses/MIT)
