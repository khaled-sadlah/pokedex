export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop(); // مهم جداً
    }
    add(key, val) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val,
        });
    }
    get(key) {
        const entry = this.#cache.get(key);
        if (!entry)
            return undefined;
        return entry.val;
    }
    #reap() {
        const now = Date.now();
        for (const [key, entry] of this.#cache.entries()) {
            if (now - entry.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }
    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}
