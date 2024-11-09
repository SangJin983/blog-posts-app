export class EventEmitter {
  #listeners = {};

  getListeners(type) {
    return this.#listeners[type];
  }

  on(type, listener) {
    if (this.#listeners[type] == null) {
      this.#listeners[type] = [];
    }
    this.#listeners[type].push(listener);
  }

  off(type, listener) {
    if (this.#listeners[type] == null) {
      return;
    }
    if (listener == null) {
      delete this.#listeners[type];
      return;
    }
    this.#listeners[type] = this.#listeners[type].filter(
      (fn) => fn !== listener
    );
  }

  emit(type, ...args) {
    if (this.#listeners[type] == null) {
      return;
    }
    this.#listeners[type].forEach((fn) => fn(...args));
  }
}
