class StorageService {
  get(key) {
    const item = localStorage.getItem(key);
    if (item) {
      const itemWrap = JSON.parse(item);
      return itemWrap.type === "object"
        ? JSON.parse(itemWrap.item)
        : itemWrap.item;
    }
    return null;
  }

  set(key, item) {
    localStorage.setItem(key, JSON.stringify(this.createItemWrap(item)));
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  createItemWrap(item) {
    const itemType = typeof item;
    const itemString = itemType === "object" ? JSON.stringify(item) : item;

    return {
      item: itemString,
      type: itemType,
    };
  }
}

export const storageService = new StorageService();
