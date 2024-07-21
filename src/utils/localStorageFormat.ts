export function setLocalStorage(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    const item = window.localStorage.getItem(key);
    if (!item) return undefined;
    return item;
  }
}

export function removeItemLocalStorage(key: string) {
  return window.localStorage.removeItem(key);
}
export function clearLocalStorage() {
  return window.localStorage.clear();
}
