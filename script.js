const domainData = {
    "club": [
        { "domain": "k11.club", "price": "$2000 USD" },
        { "domain": "9k.club", "price": "$2500 USD" },
        { "domain": "s99.club", "price": "$1800 USD" },
        { "domain": "xoc.club", "price": "$5300 USD" },
        { "domain": "tic.club", "price": "$10600 USD" },
        { "domain": "loc.club", "price": "$5100 USD" },
        { "domain": "v66.club", "price": "$1400 USD" },
        { "domain": "kun.club", "price": "$3200 USD" },
        { "domain": "bar.club", "price": "$4200 USD" },
        { "domain": "mon.club", "price": "$5000 USD" }
    ],
    "bet": [
        { "domain": "gon.bet", "price": "$1500 USD" },
        { "domain": "kit.bet", "price": "$2400 USD" },
        { "domain": "bam.bet", "price": "$4100 USD" },
        { "domain": "lip.bet", "price": "$2400 USD" },
        { "domain": "gao.bet", "price": "$4000 USD" },
        { "domain": "sok.bet", "price": "$5300 USD" },
        { "domain": "jun.bet", "price": "$10400 USD" },
        { "domain": "suk.bet", "price": "$5700 USD" },
        { "domain": "som.bet", "price": "$12800 USD" },
        { "domain": "sum.bet", "price": "$20800 USD" },
        { "domain": "xoc.bet", "price": "$5800 USD" },
        { "domain": "rice.bet", "price": "$2800 USD" },
        { "domain": "vna.bet", "price": "$2600 USD" }
    ],
    "Other": [
        { "domain": "hot.vip", "price": "$50500 USD" },
        { "domain": "lex.win", "price": "$5700 USD" },
        { "domain": "hit.mobi", "price": "$3000 USD" },
        { "domain": "bet69.win", "price": "$1400 USD" },
        { "domain": "vbet.top", "price": "$10400 USD" },
        { "domain": "99bet.win", "price": "$9600 USD" }
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





