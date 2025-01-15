const axios = require('axios');

class MitreService {
    constructor() {
        this.attackBaseUrl = 'https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json';
        this.atlasBaseUrl = 'https://raw.githubusercontent.com/mitre-atlas/atlas-data/main/dist/data.json';
    }

    async fetchAttackData() {
        try {
            const response = await axios.get(this.attackBaseUrl);
            return response.data.objects;
        } catch (error) {
            throw new Error('Error fetching ATT&CK data: ' + error.message);
        }
    }

    async fetchAtlasData() {
        try {
            const response = await axios.get(this.atlasBaseUrl);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching ATLAS data: ' + error.message);
        }
    }

    async searchTechniques(query) {
        const attackData = await this.fetchAttackData();
        return attackData.filter(obj => 
            obj.type === 'attack-pattern' && 
            (obj.name?.toLowerCase().includes(query.toLowerCase()) || 
             obj.description?.toLowerCase().includes(query.toLowerCase()))
        );
    }
}

module.exports = new MitreService();