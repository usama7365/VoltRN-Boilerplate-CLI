/**
 * Mock for react-native-mmkv
 * Provides an in-memory Map-backed implementation for testing
 */
const createMMKV = (_config) => {
  const store = new Map();

  return {
    set: (key, value) => store.set(key, value),
    getString: (key) => store.get(key),
    getNumber: (key) => store.get(key),
    getBoolean: (key) => store.get(key),
    delete: (key) => store.delete(key),
    clearAll: () => store.clear(),
    getAllKeys: () => [...store.keys()],
    contains: (key) => store.has(key),
    // Exposed for test assertions
    _store: store,
  };
};

module.exports = { createMMKV };
