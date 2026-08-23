/* ============================================
   YKS HTML — Storage Module
   ============================================ */

const Storage = (() => {
  const AUTOSAVE_KEY = 'yks-html-autosave';
  const SAVES_KEY = 'yks-html-saves';
  const AUTOSAVE_INTERVAL = 5000;
  
  let autoSaveTimer = null;
  let lastSavedCode = '';

  async function get(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key] || null);
      });
    });
  }

  async function set(key, value) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, resolve);
    });
  }

  async function remove(key) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(key, resolve);
    });
  }

  async function autoSave(code) {
    if (code === lastSavedCode) return;
    
    await set(AUTOSAVE_KEY, {
      code: code,
      timestamp: Date.now()
    });
    lastSavedCode = code;
  }

  async function loadAutoSave() {
    const data = await get(AUTOSAVE_KEY);
    return data ? data.code : '';
  }

  function startAutoSave(getCodeFn) {
    stopAutoSave();
    autoSaveTimer = setInterval(() => {
      const code = getCodeFn();
      if (code && code.trim() !== '') {
        autoSave(code);
      }
    }, AUTOSAVE_INTERVAL);
  }

  function stopAutoSave() {
    if (autoSaveTimer) {
      clearInterval(autoSaveTimer);
      autoSaveTimer = null;
    }
  }

  async function saveSnippet(name, code) {
    const saves = await get(SAVES_KEY) || [];
    
    const newSave = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      name: name,
      code: code,
      created: Date.now(),
      updated: Date.now()
    };
    
    saves.unshift(newSave);
    
    if (saves.length > 50) {
      saves.pop();
    }
    
    await set(SAVES_KEY, saves);
    return newSave;
  }

  async function loadSnippets() {
    return await get(SAVES_KEY) || [];
  }

  async function loadSnippet(id) {
    const saves = await get(SAVES_KEY) || [];
    return saves.find(s => s.id === id) || null;
  }

  async function deleteSnippet(id) {
    const saves = await get(SAVES_KEY) || [];
    const filtered = saves.filter(s => s.id !== id);
    await set(SAVES_KEY, filtered);
  }

  async function updateSnippet(id, updates) {
    const saves = await get(SAVES_KEY) || [];
    const index = saves.findIndex(s => s.id === id);
    
    if (index !== -1) {
      saves[index] = {
        ...saves[index],
        ...updates,
        updated: Date.now()
      };
      await set(SAVES_KEY, saves);
      return saves[index];
    }
    
    return null;
  }

  async function getSnippetCount() {
    const saves = await get(SAVES_KEY) || [];
    return saves.length;
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'agora';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m atrás`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  }

  return {
    get,
    set,
    remove,
    autoSave,
    loadAutoSave,
    startAutoSave,
    stopAutoSave,
    saveSnippet,
    loadSnippets,
    loadSnippet,
    deleteSnippet,
    updateSnippet,
    getSnippetCount,
    formatDate
  };
})();