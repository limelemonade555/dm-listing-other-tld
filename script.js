const domainData = {
    "club": [
        { "domain": "k11.club", "price": "$299 MXN" },
        { "domain": "9k.club", "price": "$349 MXN" },
        { "domain": "s99.club", "price": "$349 MXN" },
        { "domain": "xoc.club", "price": "$349 MXN" },
        { "domain": "tic.club", "price": "$349 MXN" },
        { "domain": "loc.club", "price": "$349 MXN" },
        { "domain": "v66.club", "price": "$399 MXN" },
        { "domain": "m5.club", "price": "$299 MXN" },
        { "domain": "mon.club", "price": "$279 MXN" }
    ],
    "bet": [
        { "domain": "gon.bet", "price": "$499 MXN" },
        { "domain": "kit.bet", "price": "$449 MXN" },
        { "domain": "bam.bet", "price": "$599 MXN" },
        { "domain": "hue.bet", "price": "$599 MXN" },
        { "domain": "nem.bet", "price": "$599 MXN" },
        { "domain": "lip.bet", "price": "$599 MXN" },
        { "domain": "sok.bet", "price": "$599 MXN" },
        { "domain": "hue.bet", "price": "$599 MXN" },
        { "domain": "nem.bet", "price": "$599 MXN" },
        { "domain": "lip.bet", "price": "$599 MXN" },
        { "domain": "vna.bet", "price": "$599 MXN" },
        { "domain": "gao.bet", "price": "$549 MXN" }
    ],
    "Other": [
        { "domain": "hot.vip", "price": "$799 MXN" },
        { "domain": "lex.win", "price": "$899 MXN" },
        { "domain": "hit.mobi", "price": "$899 MXN" },
        { "domain": "bet69.win", "price": "$899 MXN" },
        { "domain": "vbet.top", "price": "$699 MXN" },
        { "domain": "99bet.win", "price": "$999 MXN" }
    ],
};

class DomainManager {
    constructor() {
        this.domains = domainData;
        this.filteredDomains = { ...domainData };
        this.init();
    }

    init() {
        this.renderTLDFilters();
        this.renderDomains();
        this.setupEventListeners();
    }

    renderTLDFilters() {
        const tldFilter = document.getElementById('tldFilter');
        const tlds = Object.keys(this.domains);
        
        tlds.forEach(tld => {
            const option = document.createElement('option');
            option.value = tld;
            option.textContent = `.${tld}`;
            tldFilter.appendChild(option);
        });
    }

    renderDomains() {
        const domainList = document.getElementById('domainList');
        domainList.innerHTML = '';

        Object.keys(this.filteredDomains).forEach(tld => {
            const tldSection = this.createTLDSection(tld, this.filteredDomains[tld]);
            domainList.appendChild(tldSection);
        });
    }

    createTLDSection(tld, domains) {
        const section = document.createElement('div');
        section.className = 'tld-section';
        
        const header = document.createElement('div');
        header.className = 'tld-header';
        
        const tldName = document.createElement('div');
        tldName.className = 'tld-name';
        tldName.textContent = `.${tld}`;
        
        const count = document.createElement('div');
        count.className = 'domain-count';
        count.textContent = `${domains.length} dominios`;
        
        header.appendChild(tldName);
        header.appendChild(count);
        
        const domainList = document.createElement('div');
        domainList.className = 'domain-list';
        
        domains.forEach(domain => {
            const domainItem = this.createDomainItem(domain);
            domainList.appendChild(domainItem);
        });
        
        section.appendChild(header);
        section.appendChild(domainList);
        
        return section;
    }

    createDomainItem(domain) {
        const item = document.createElement('div');
        item.className = 'domain-item';
        
        const name = document.createElement('div');
        name.className = 'domain-name';
        name.textContent = domain.domain;
        
        const price = document.createElement('div');
        price.className = 'domain-price';
        price.textContent = domain.price;
        
        item.appendChild(name);
        item.appendChild(price);
        
        return item;
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const tldFilter = document.getElementById('tldFilter');

        searchInput.addEventListener('input', (e) => {
            this.filterDomains(e.target.value, tldFilter.value);
        });

        tldFilter.addEventListener('change', (e) => {
            this.filterDomains(searchInput.value, e.target.value);
        });
    }

    filterDomains(searchTerm = '', tldFilter = '') {
        this.filteredDomains = {};
        
        Object.keys(this.domains).forEach(tld => {
            if (tldFilter && tld !== tldFilter) {
                return;
            }

            const filtered = this.domains[tld].filter(domain => 
                domain.domain.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (filtered.length > 0) {
                this.filteredDomains[tld] = filtered;
            }
        });
        
        this.renderDomains();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DomainManager();
});