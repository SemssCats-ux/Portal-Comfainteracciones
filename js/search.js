/**
 * Sistema de Búsqueda Global
 * Portal Estudiantil Comfainteracciones
 */

class GlobalSearch {
    constructor() {
        this.searchData = [];
        this.searchHistory = [];
        this.currentQuery = '';
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createSearchInterface();
        this.loadSearchData();
        this.loadSearchHistory();
        this.bindEvents();
    }

    createSearchInterface() {
        // Crear botón de búsqueda en el header
        const header = document.querySelector('.fh5co-nav .top .fh5co-social');
        if (header) {
            const searchBtn = document.createElement('li');
            searchBtn.innerHTML = `
                <a href="#" id="global-search-toggle" class="global-search-toggle">
                    <i class="icon-search"></i>
                </a>
            `;
            header.appendChild(searchBtn);
        }

        // Crear modal de búsqueda
        const searchModal = document.createElement('div');
        searchModal.id = 'global-search-modal';
        searchModal.className = 'global-search-modal';
        searchModal.innerHTML = `
            <div class="search-overlay"></div>
            <div class="search-container">
                <div class="search-header">
                    <div class="search-input-wrapper">
                        <i class="icon-search search-icon"></i>
                        <input type="text" id="global-search-input" placeholder="Buscar en todo el portal..." autocomplete="off">
                        <button id="search-close" class="search-close">
                            <i class="icon-close"></i>
                        </button>
                    </div>
                </div>
                <div class="search-content">
                    <div class="search-results" id="search-results"></div>
                    <div class="search-history" id="search-history"></div>
                    <div class="search-suggestions" id="search-suggestions"></div>
                </div>
            </div>
        `;

        document.body.appendChild(searchModal);
    }

    bindEvents() {
        // Toggle de búsqueda
        document.addEventListener('click', (e) => {
            if (e.target.closest('#global-search-toggle')) {
                e.preventDefault();
                this.toggleSearch();
            }
            
            if (e.target.closest('#search-close') || e.target.closest('.search-overlay')) {
                this.closeSearch();
            }
        });

        // Input de búsqueda
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentQuery = e.target.value.trim();
                this.handleSearch();
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                } else if (e.key === 'Escape') {
                    this.closeSearch();
                }
            });

            searchInput.addEventListener('focus', () => {
                this.showSuggestions();
            });
        }

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeSearch();
            }
        });
    }

    toggleSearch() {
        if (this.isOpen) {
            this.closeSearch();
        } else {
            this.openSearch();
        }
    }

    openSearch() {
        this.isOpen = true;
        document.getElementById('global-search-modal').classList.add('show');
        document.getElementById('global-search-input').focus();
        document.body.style.overflow = 'hidden';
        
        // Mostrar historial y sugerencias
        this.showSuggestions();
    }

    closeSearch() {
        this.isOpen = false;
        document.getElementById('global-search-modal').classList.remove('show');
        document.body.style.overflow = '';
        this.currentQuery = '';
        this.clearResults();
    }

    handleSearch() {
        if (this.currentQuery.length === 0) {
            this.showSuggestions();
            return;
        }

        if (this.currentQuery.length < 2) {
            return;
        }

        // Búsqueda en tiempo real
        this.performSearch();
    }

    performSearch() {
        if (this.currentQuery.length < 2) return;

        const results = this.searchInData(this.currentQuery);
        this.displayResults(results);
        this.addToHistory(this.currentQuery);
    }

    searchInData(query) {
        const results = [];
        const searchTerm = query.toLowerCase();

        // Búsqueda en diferentes tipos de contenido
        this.searchData.forEach(item => {
            let score = 0;
            let matches = [];

            // Búsqueda en título
            if (item.title && item.title.toLowerCase().includes(searchTerm)) {
                score += 10;
                matches.push('title');
            }

            // Búsqueda en contenido
            if (item.content && item.content.toLowerCase().includes(searchTerm)) {
                score += 5;
                matches.push('content');
            }

            // Búsqueda en categoría
            if (item.category && item.category.toLowerCase().includes(searchTerm)) {
                score += 8;
                matches.push('category');
            }

            // Búsqueda en etiquetas
            if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
                score += 6;
                matches.push('tags');
            }

            if (score > 0) {
                results.push({
                    ...item,
                    score,
                    matches,
                    highlightedTitle: this.highlightText(item.title, searchTerm),
                    highlightedContent: this.highlightText(item.content, searchTerm)
                });
            }
        });

        // Ordenar por relevancia
        return results.sort((a, b) => b.score - a.score);
    }

    highlightText(text, query) {
        if (!text) return '';
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('search-results');
        const historyContainer = document.getElementById('search-history');
        const suggestionsContainer = document.getElementById('search-suggestions');

        // Ocultar historial y sugerencias
        historyContainer.style.display = 'none';
        suggestionsContainer.style.display = 'none';

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="icon-search"></i>
                    <h3>No se encontraron resultados</h3>
                    <p>Intenta con otras palabras o revisa la ortografía</p>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = `
                <div class="search-results-header">
                    <h3>Resultados (${results.length})</h3>
                </div>
                <div class="search-results-list">
                    ${results.map(result => this.createResultItem(result)).join('')}
                </div>
            `;
        }

        resultsContainer.style.display = 'block';
    }

    createResultItem(result) {
        return `
            <div class="search-result-item" data-url="${result.url}">
                <div class="result-icon">
                    <i class="${this.getIconForType(result.type)}"></i>
                </div>
                <div class="result-content">
                    <h4 class="result-title">${result.highlightedTitle}</h4>
                    <p class="result-excerpt">${result.highlightedContent ? result.highlightedContent.substring(0, 150) + '...' : ''}</p>
                    <div class="result-meta">
                        <span class="result-category">${result.category}</span>
                        <span class="result-type">${this.getTypeLabel(result.type)}</span>
                    </div>
                </div>
                <div class="result-actions">
                    <button class="btn-view" onclick="globalSearch.viewResult('${result.url}')">
                        <i class="icon-eye"></i>
                    </button>
                </div>
            </div>
        `;
    }

    getIconForType(type) {
        const icons = {
            'course': 'icon-book',
            'grade': 'icon-chart',
            'task': 'icon-task',
            'blog': 'icon-edit',
            'contact': 'icon-mail',
            'page': 'icon-file'
        };
        return icons[type] || 'icon-file';
    }

    getTypeLabel(type) {
        const labels = {
            'course': 'Curso',
            'grade': 'Calificación',
            'task': 'Tarea',
            'blog': 'Blog',
            'contact': 'Contacto',
            'page': 'Página'
        };
        return labels[type] || 'Página';
    }

    showSuggestions() {
        const resultsContainer = document.getElementById('search-results');
        const historyContainer = document.getElementById('search-history');
        const suggestionsContainer = document.getElementById('search-suggestions');

        resultsContainer.style.display = 'none';

        // Mostrar historial
        this.displayHistory();

        // Mostrar sugerencias
        this.displaySuggestions();
    }

    displayHistory() {
        const historyContainer = document.getElementById('search-history');
        if (this.searchHistory.length === 0) {
            historyContainer.style.display = 'none';
            return;
        }

        historyContainer.innerHTML = `
            <div class="search-section-header">
                <h3>Búsquedas recientes</h3>
                <button onclick="globalSearch.clearHistory()" class="clear-history">Limpiar</button>
            </div>
            <div class="search-history-list">
                ${this.searchHistory.slice(0, 5).map(query => `
                    <div class="history-item" onclick="globalSearch.searchFromHistory('${query}')">
                        <i class="icon-clock"></i>
                        <span>${query}</span>
                    </div>
                `).join('')}
            </div>
        `;

        historyContainer.style.display = 'block';
    }

    displaySuggestions() {
        const suggestionsContainer = document.getElementById('search-suggestions');
        const suggestions = this.getSuggestions();

        suggestionsContainer.innerHTML = `
            <div class="search-section-header">
                <h3>Sugerencias</h3>
            </div>
            <div class="search-suggestions-list">
                ${suggestions.map(suggestion => `
                    <div class="suggestion-item" onclick="globalSearch.searchFromHistory('${suggestion}')">
                        <i class="icon-lightbulb"></i>
                        <span>${suggestion}</span>
                    </div>
                `).join('')}
            </div>
        `;

        suggestionsContainer.style.display = 'block';
    }

    getSuggestions() {
        return [
            'Matemáticas',
            'Calificaciones',
            'Tareas pendientes',
            'Blog estudiantil',
            'Contacto',
            'Cursos disponibles'
        ];
    }

    searchFromHistory(query) {
        document.getElementById('global-search-input').value = query;
        this.currentQuery = query;
        this.performSearch();
    }

    addToHistory(query) {
        if (!this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            this.searchHistory = this.searchHistory.slice(0, 10); // Mantener solo 10
            this.saveSearchHistory();
        }
    }

    clearHistory() {
        this.searchHistory = [];
        this.saveSearchHistory();
        this.displayHistory();
    }

    clearResults() {
        document.getElementById('search-results').innerHTML = '';
        document.getElementById('search-results').style.display = 'none';
    }

    viewResult(url) {
        if (url.startsWith('http')) {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
        this.closeSearch();
    }

    loadSearchData() {
        // Datos de ejemplo - en producción esto vendría del servidor
        this.searchData = [
            {
                title: 'Matemáticas - Cálculo Integral',
                content: 'Curso de matemáticas avanzadas que cubre los fundamentos del cálculo integral y sus aplicaciones.',
                category: 'Matemáticas',
                type: 'course',
                url: 'cursos.html#matematicas',
                tags: ['matemáticas', 'cálculo', 'integral', 'avanzado']
            },
            {
                title: 'Calificaciones del Primer Período',
                content: 'Revisa tus calificaciones del primer período académico y tu progreso general.',
                category: 'Calificaciones',
                type: 'grade',
                url: 'calificaciones.html',
                tags: ['calificaciones', 'período', 'progreso', 'académico']
            },
            {
                title: 'Tarea de Química - Laboratorio',
                content: 'Entrega del laboratorio de reacciones químicas. Fecha límite: 12 de Julio.',
                category: 'Química',
                type: 'task',
                url: 'cursos.html#quimica',
                tags: ['química', 'laboratorio', 'tarea', 'reacciones']
            },
            {
                title: 'Blog - Noticias Estudiantiles',
                content: 'Mantente informado sobre las últimas noticias y eventos del colegio.',
                category: 'Blog',
                type: 'blog',
                url: 'blog.html',
                tags: ['blog', 'noticias', 'eventos', 'estudiantil']
            },
            {
                title: 'Contacto - Información de Contacto',
                content: 'Información de contacto del colegio y formulario para consultas.',
                category: 'Contacto',
                type: 'contact',
                url: 'contacto.html',
                tags: ['contacto', 'información', 'consulta', 'colegio']
            }
        ];
    }

    loadSearchHistory() {
        const saved = localStorage.getItem('comfainteracciones-search-history');
        if (saved) {
            this.searchHistory = JSON.parse(saved);
        }
    }

    saveSearchHistory() {
        localStorage.setItem('comfainteracciones-search-history', JSON.stringify(this.searchHistory));
    }
}

// Inicializar búsqueda global
const globalSearch = new GlobalSearch();
