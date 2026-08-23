/* ============================================
   YKS HTML — Editor Module
   ============================================ */

const Editor = (() => {
  let textarea;
  let lineNumbers;
  let lineCount;
  let onChangeCallback = null;

  function init() {
    textarea = document.getElementById('codeEditor');
    lineNumbers = document.getElementById('lineNumbers');
    lineCount = document.getElementById('lineCount');

    textarea.addEventListener('input', handleInput);
    textarea.addEventListener('scroll', syncScroll);
    textarea.addEventListener('keydown', handleKeydown);

    updateLineNumbers();
  }

  function handleInput() {
    updateLineNumbers();
    if (onChangeCallback) {
      onChangeCallback(getCode());
    }
  }

  function syncScroll() {
    lineNumbers.scrollTop = textarea.scrollTop;
  }

  function handleKeydown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      
      textarea.value = value.substring(0, start) + '  ' + value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;
      
      handleInput();
    }
  }

  function updateLineNumbers() {
    const lines = textarea.value.split('\n').length;
    const numbers = [];
    for (let i = 1; i <= lines; i++) {
      numbers.push(i);
    }
    lineNumbers.textContent = numbers.join('\n');
    lineCount.textContent = `${lines} line${lines !== 1 ? 's' : ''}`;
  }

  function getCode() {
    return textarea.value;
  }

  function setCode(code) {
    textarea.value = code;
    updateLineNumbers();
    if (onChangeCallback) {
      onChangeCallback(code);
    }
  }

  function clear() {
    textarea.value = '';
    updateLineNumbers();
    if (onChangeCallback) {
      onChangeCallback('');
    }
  }

  function focus() {
    textarea.focus();
  }

  function onChange(callback) {
    onChangeCallback = callback;
  }

  function getLineCount() {
    return textarea.value.split('\n').length;
  }

  function getCursorPos() {
    return {
      start: textarea.selectionStart,
      end: textarea.selectionEnd
    };
  }

  return {
    init,
    getCode,
    setCode,
    clear,
    focus,
    onChange,
    getLineCount,
    getCursorPos
  };
})();