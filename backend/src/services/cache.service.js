class CacheService {
    constructor() {
        this.attackData = null;
        this.atlasData = null;
        this.lastUpdate = null;
    }

    setData(type, data) {
        if (type === 'attack') this.attackData = data;
        if (type === 'atlas') this.atlasData = data;
        this.lastUpdate = Date.now();
    }

    getData(type) {
        if (type === 'attack') return this.attackData;
        if (type === 'atlas') return this.atlasData;
    }

    needsUpdate() {
        const ONE_DAY = 24 * 60 * 60 * 1000;
        return !this.lastUpdate || (Date.now() - this.lastUpdate > ONE_DAY);
    }
}

module.exports = new CacheService();