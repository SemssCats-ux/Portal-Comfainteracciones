/**
 * Sistema de Breadcrumbs Inteligentes
 * Portal Estudiantil Comfainteracciones
 */

class BreadcrumbSystem {
    constructor() {
        this.breadcrumbs = [];
        this.currentPage = '';
        this.init();
    }

    init() {
        this.detectCurrentPage();
        this.generateBreadcrumbs();
        this.createBreadcrumbInterface();
        this.bindEvents();
    }

    detectCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        this.currentPage = filename;
    }

    generateBreadcrumbs() {
        this.breadcrumbs = [];
        
        // Página principal siempre está disponible
        this.breadcrumbs.push({
            title: 'Inicio',
            url: 'index.html',
            icon: 'icon-home'
        });

        // Generar breadcrumbs basados en la página actual
        switch (this.currentPage) {
            case 'cursos.html':
                this.breadcrumbs.push({
                    title: 'Cursos',
                    url: 'cursos.html',
                    icon: 'icon-book',
                    current: true
                });
                break;

            case 'calificaciones.html':
                this.breadcrumbs.push({
                    title: 'Calificaciones',
                    url: 'calificaciones.html',
                    icon: 'icon-chart',
                    current: true
                });
                break;

            case 'blog.html':
                this.breadcrumbs.push({
                    title: 'Blog',
                    url: 'blog.html',
                    icon: 'icon-edit',
                    current: true
                });
                break;

            case 'contacto.html':
                this.breadcrumbs.push({
                    title: 'Contacto',
                    url: 'contacto.html',
                    icon: 'icon-mail',
                    current: true
                });
                break;

            case 'index.html':
            default:
                // En la página principal, solo mostrar "Inicio"
                this.breadcrumbs[0].current = true;
                break;
        }

        // Detectar subpáginas o secciones específicas
        this.detectSubPages();
    }

    detectSubPages() {
        const hash = window.location.hash;
        if (hash) {
            const section = this.getSectionFromHash(hash);
            if (section) {
                this.breadcrumbs.push({
                    title: section.title,
                    url: `${this.currentPage}${hash}`,
                    icon: section.icon,
                    current: true
                });
                // Marcar la página anterior como no actual
                if (this.breadcrumbs.length > 1) {
                    this.breadcrumbs[this.breadcrumbs.length - 2].current = false;
                }
            }
        }
    }

    getSectionFromHash(hash) {
        const sections = {
            '#matematicas': { title: 'Matemáticas', icon: 'icon-calculator' },
            '#quimica': { title: 'Química', icon: 'icon-beaker' },
            '#fisica': { title: 'Física', icon: 'icon-flash' },
            '#biologia': { title: 'Biología', icon: 'icon-leaf' },
            '#lengua': { title: 'Lengua', icon: 'icon-book' },
            '#ingles': { title: 'Inglés', icon: 'icon-globe' },
            '#tareas-pendientes': { title: 'Tareas Pendientes', icon: 'icon-task' },
            '#entregas-pendientes': { title: 'Entregas Pendientes', icon: 'icon-clock' },
            '#apuntes': { title: 'Mis Apuntes', icon: 'icon-edit' },
            '#noticias': { title: 'Noticias', icon: 'icon-newspaper' },
            '#calendario': { title: 'Calendario', icon: 'icon-calendar' }
        };

        return sections[hash] || null;
    }

    createBreadcrumbInterface() {
        // Buscar el contenedor principal para insertar breadcrumbs
        const mainContainer = document.querySelector('#page') || document.querySelector('main') || document.body;
        
        if (mainContainer) {
            const breadcrumbContainer = document.createElement('nav');
            breadcrumbContainer.className = 'breadcrumb-navigation';
            breadcrumbContainer.setAttribute('aria-label', 'Navegación de migas de pan');
            
            breadcrumbContainer.innerHTML = this.generateBreadcrumbHTML();
            
            // Insertar después del header o al inicio del contenido principal
            const header = document.querySelector('.fh5co-nav');
            if (header && header.nextSibling) {
                mainContainer.insertBefore(breadcrumbContainer, header.nextSibling);
            } else {
                mainContainer.insertBefore(breadcrumbContainer, mainContainer.firstChild);
            }
        }
    }

    generateBreadcrumbHTML() {
        return `
            <div class="breadcrumb-container">
                <div class="container">
                    <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
                        ${this.breadcrumbs.map((crumb, index) => `
                            <li class="breadcrumb-item ${crumb.current ? 'active' : ''}" 
                                itemprop="itemListElement" 
                                itemscope 
                                itemtype="https://schema.org/ListItem">
                                
                                ${crumb.current ? `
                                    <span class="breadcrumb-current" itemprop="name">
                                        <i class="${crumb.icon}"></i>
                                        ${crumb.title}
                                    </span>
                                ` : `
                                    <a href="${crumb.url}" class="breadcrumb-link" itemprop="item">
                                        <i class="${crumb.icon}"></i>
                                        <span itemprop="name">${crumb.title}</span>
                                    </a>
                                `}
                                
                                <meta itemprop="position" content="${index + 1}" />
                            </li>
                        `).join('')}
                    </ol>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Escuchar cambios en el hash para actualizar breadcrumbs dinámicamente
        window.addEventListener('hashchange', () => {
            this.updateBreadcrumbs();
        });

        // Escuchar navegación del navegador (botones atrás/adelante)
        window.addEventListener('popstate', () => {
            this.updateBreadcrumbs();
        });
    }

    updateBreadcrumbs() {
        this.detectCurrentPage();
        this.generateBreadcrumbs();
        
        const breadcrumbContainer = document.querySelector('.breadcrumb-navigation');
        if (breadcrumbContainer) {
            breadcrumbContainer.innerHTML = this.generateBreadcrumbHTML();
        }
    }

    // Método para agregar breadcrumbs personalizados
    addCustomBreadcrumb(title, url, icon = 'icon-file') {
        // Remover el breadcrumb actual si existe
        if (this.breadcrumbs.length > 1) {
            this.breadcrumbs[this.breadcrumbs.length - 1].current = false;
        }

        // Agregar el nuevo breadcrumb
        this.breadcrumbs.push({
            title,
            url,
            icon,
            current: true
        });

        this.updateBreadcrumbInterface();
    }

    // Método para actualizar la interfaz
    updateBreadcrumbInterface() {
        const breadcrumbContainer = document.querySelector('.breadcrumb-navigation');
        if (breadcrumbContainer) {
            breadcrumbContainer.innerHTML = this.generateBreadcrumbHTML();
        }
    }

    // Método para obtener la ruta actual como texto
    getCurrentPath() {
        return this.breadcrumbs.map(crumb => crumb.title).join(' > ');
    }

    // Método para navegar a un breadcrumb específico
    navigateToBreadcrumb(index) {
        if (index >= 0 && index < this.breadcrumbs.length) {
            const crumb = this.breadcrumbs[index];
            if (crumb.url && !crumb.current) {
                window.location.href = crumb.url;
            }
        }
    }

    // Método para mostrar breadcrumbs en consola (debug)
    debugBreadcrumbs() {
        console.log('Breadcrumbs actuales:', this.breadcrumbs);
        console.log('Ruta actual:', this.getCurrentPath());
    }
}

// Inicializar el sistema de breadcrumbs
const breadcrumbSystem = new BreadcrumbSystem();

// Función global para agregar breadcrumbs personalizados
function addBreadcrumb(title, url, icon) {
    breadcrumbSystem.addCustomBreadcrumb(title, url, icon);
}

// Función global para obtener la ruta actual
function getCurrentPath() {
    return breadcrumbSystem.getCurrentPath();
}
