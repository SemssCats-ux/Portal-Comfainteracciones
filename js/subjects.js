// Datos de ejemplo para las materias y sus tareas
const subjectData = {
    lengua: {
        name: "Lengua",
        icon: "icon-book",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        area: "humanidades",
        pendingTasks: 3,
        completedTasks: 8,
        tasks: [
            {
                id: 1,
                title: "Ensayo sobre literatura contemporánea",
                description: "Escribir un ensayo de 500 palabras sobre un autor contemporáneo",
                dueDate: "2025-07-05",
                status: "pending",
                type: "essay"
            },
            {
                id: 2,
                title: "Análisis de poema",
                description: "Analizar la métrica y figuras retóricas de un poema seleccionado",
                dueDate: "2025-07-10",
                status: "pending",
                type: "analysis"
            },
            {
                id: 3,
                title: "Lectura dirigida",
                description: "Leer capítulos 1-5 del libro asignado y completar el cuestionario",
                dueDate: "2025-06-30",
                status: "completed",
                type: "reading"
            }
        ],
        works: [
            {
                id: 1,
                title: "Proyecto de escritura creativa",
                description: "Crear un cuento corto de al menos 1000 palabras",
                dueDate: "2025-07-15",
                status: "in_progress"
            }
        ]
    },
    loc: {
        name: "LOC",
        icon: "icon-location",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        area: "humanidades",
        pendingTasks: 2,
        completedTasks: 5,
        tasks: [
            {
                id: 1,
                title: "Mapa conceptual de la región",
                description: "Crear un mapa conceptual sobre las características geográficas locales",
                dueDate: "2025-07-08",
                status: "pending",
                type: "map"
            },
            {
                id: 2,
                title: "Investigación cultural local",
                description: "Investigar sobre las tradiciones y costumbres de la región",
                dueDate: "2025-07-12",
                status: "pending",
                type: "research"
            }
        ],
        works: []
    },
    matematicas: {
        name: "Matemáticas",
        icon: "icon-calculator",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        area: "ciencias",
        pendingTasks: 1,
        completedTasks: 12,
        tasks: [
            {
                id: 1,
                title: "Ejercicios de álgebra",
                description: "Resolver la serie de ejercicios 15-30 del capítulo 8",
                dueDate: "2025-07-03",
                status: "pending",
                type: "exercises"
            }
        ],
        works: []
    },
    estadistica: {
        name: "Estadística",
        icon: "icon-bar-chart",
        color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        area: "ciencias",
        pendingTasks: 4,
        completedTasks: 6,
        tasks: [
            {
                id: 1,
                title: "Análisis de datos",
                description: "Analizar el conjunto de datos proporcionado y crear gráficos",
                dueDate: "2025-07-06",
                status: "pending",
                type: "analysis"
            }
        ],
        works: []
    },
    geometria: {
        name: "Geometría",
        icon: "icon-triangle",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        area: "ciencias",
        pendingTasks: 2,
        completedTasks: 9,
        tasks: [],
        works: []
    },
    fisica: {
        name: "Física",
        icon: "icon-flash",
        color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        area: "ciencias",
        pendingTasks: 1,
        completedTasks: 7,
        tasks: [],
        works: []
    },
    quimica: {
        name: "Química",
        icon: "icon-beaker",
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        area: "ciencias",
        pendingTasks: 3,
        completedTasks: 10,
        tasks: [],
        works: []
    },
    biologia: {
        name: "Biología",
        icon: "icon-leaf",
        color: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        area: "ciencias",
        pendingTasks: 2,
        completedTasks: 11,
        tasks: [],
        works: []
    },
    ingles: {
        name: "Inglés",
        icon: "icon-globe",
        color: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        area: "humanidades",
        pendingTasks: 1,
        completedTasks: 15,
        tasks: [],
        works: []
    },
    informatica: {
        name: "Informática",
        icon: "icon-desktop",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        area: "tecnologia",
        pendingTasks: 2,
        completedTasks: 8,
        tasks: [],
        works: []
    },
    tecnica: {
        name: "Técnica",
        icon: "icon-cog",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        area: "tecnologia",
        pendingTasks: 1,
        completedTasks: 6,
        tasks: [],
        works: []
    },
    musica: {
        name: "Música",
        icon: "icon-music",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        area: "artes",
        pendingTasks: 0,
        completedTasks: 4,
        tasks: [],
        works: []
    },
    artistica: {
        name: "Artística",
        icon: "icon-palette",
        color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        area: "artes",
        pendingTasks: 1,
        completedTasks: 5,
        tasks: [],
        works: []
    },
    edfisica: {
        name: "Ed. Física",
        icon: "icon-trophy",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        area: "deportes",
        pendingTasks: 1,
        completedTasks: 3,
        tasks: [],
        works: []
    },
    sociales: {
        name: "Sociales",
        icon: "icon-users",
        color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        area: "humanidades",
        pendingTasks: 2,
        completedTasks: 9,
        tasks: [],
        works: []
    },
    catedrapaz: {
        name: "Cátedra de la Paz",
        icon: "icon-heart",
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        area: "humanidades",
        pendingTasks: 1,
        completedTasks: 4,
        tasks: [],
        works: []
    },
    economia: {
        name: "Economía y C. Políticas",
        icon: "icon-stats-bars",
        color: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        area: "humanidades",
        pendingTasks: 3,
        completedTasks: 7,
        tasks: [],
        works: []
    },
    filosofia: {
        name: "Filosofía",
        icon: "icon-lightbulb",
        color: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        area: "humanidades",
        pendingTasks: 2,
        completedTasks: 6,
        tasks: [],
        works: []
    },
    religion: {
        name: "Religión",
        icon: "icon-church",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        area: "humanidades",
        pendingTasks: 1,
        completedTasks: 5,
        tasks: [],
        works: []
    },
    etica: {
        name: "Ética",
        icon: "icon-balance-scale",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        area: "humanidades",
        pendingTasks: 1,
        completedTasks: 4,
        tasks: [],
        works: []
    }
};

// Variables globales
let currentFilter = 'all';
let currentArea = 'all';
let searchTerm = '';

// Función para renderizar las tarjetas de materias
function renderSubjects() {
    const grid = document.getElementById('subjectsGrid');
    const subjects = Object.entries(subjectData);
    
    let filteredSubjects = subjects.filter(([key, subject]) => {
        // Filtrar por área
        if (currentArea !== 'all' && subject.area !== currentArea) {
            return false;
        }
        
        // Filtrar por estado
        if (currentFilter === 'pending' && subject.pendingTasks === 0) {
            return false;
        }
        if (currentFilter === 'completed' && subject.pendingTasks > 0) {
            return false;
        }
        
        // Filtrar por término de búsqueda
        if (searchTerm && !subject.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        
        return true;
    });
    
    grid.innerHTML = filteredSubjects.map(([key, subject]) => `
        <div class="col-md-4 col-sm-6 animate-box subject-item" data-area="${subject.area}">
            <div class="subject-card">
                <div class="subject-header ${key}">
                    <i class="${subject.icon}"></i>
                    <h3>${subject.name}</h3>
                    ${subject.pendingTasks > 0 ? `<div class="notification-badge">${subject.pendingTasks}</div>` : ''}
                </div>
                <div class="subject-content">
                    <div class="task-summary">
                        ${subject.pendingTasks > 0 ? 
                            `<span class="pending-tasks">${subject.pendingTasks} tarea${subject.pendingTasks > 1 ? 's' : ''} pendiente${subject.pendingTasks > 1 ? 's' : ''}</span>` 
                            : '<span class="completed-tasks">¡Sin tareas pendientes!</span>'
                        }
                        <span class="completed-tasks">${subject.completedTasks} completadas</span>
                    </div>
                    <div class="subject-actions">
                        <a href="#" class="btn-action" onclick="showSubjectDetails('${key}')">Ver Tareas</a>
                        <a href="#" class="btn-action" onclick="showSubjectWork('${key}')">Trabajos</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Reiniualizar animaciones
    initializeAnimations();
}

// Función para mostrar detalles de una materia
function showSubjectDetails(subjectKey) {
    const subject = subjectData[subjectKey];
    if (!subject) {
        console.error('Materia no encontrada:', subjectKey);
        return;
    }

    const modal = document.getElementById('subjectModal');
    const modalContent = document.getElementById('modalContent');
    
    let tasksHTML = '';
    if (subject.tasks && subject.tasks.length > 0) {
        tasksHTML = subject.tasks.map(task => `
            <div class="task-item">
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <div class="task-meta">
                    <span class="task-status ${task.status === 'completed' ? 'status-completed' : 'status-pending'}">
                        ${task.status === 'completed' ? 'Completada' : 'Pendiente'}
                    </span>
                    <span class="task-date">Entrega: ${formatDate(task.dueDate)}</span>
                </div>
            </div>
        `).join('');
    } else {
        tasksHTML = '<p class="text-center text-muted">No hay tareas registradas para esta materia.</p>';
    }

    modalContent.innerHTML = `
        <div class="modal-header" style="background: ${subject.color}">
            <h2><i class="${subject.icon}"></i> ${subject.name} - Tareas</h2>
        </div>
        <div class="modal-body">
            <h3>Tareas Asignadas</h3>
            ${tasksHTML}
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para mostrar trabajos de una materia
function showSubjectWork(subjectKey) {
    const subject = subjectData[subjectKey];
    if (!subject) {
        console.error('Materia no encontrada:', subjectKey);
        return;
    }

    const modal = document.getElementById('subjectModal');
    const modalContent = document.getElementById('modalContent');
    
    let worksHTML = '';
    if (subject.works && subject.works.length > 0) {
        worksHTML = subject.works.map(work => `
            <div class="task-item">
                <h4>${work.title}</h4>
                <p>${work.description}</p>
                <div class="task-meta">
                    <span class="task-status ${getWorkStatusClass(work.status)}">
                        ${getWorkStatusText(work.status)}
                    </span>
                    <span class="task-date">Entrega: ${formatDate(work.dueDate)}</span>
                </div>
            </div>
        `).join('');
    } else {
        worksHTML = '<p class="text-center text-muted">No hay trabajos registrados para esta materia.</p>';
    }

    modalContent.innerHTML = `
        <div class="modal-header" style="background: ${subject.color}">
            <h2><i class="${subject.icon}"></i> ${subject.name} - Trabajos</h2>
        </div>
        <div class="modal-body">
            <h3>Trabajos y Proyectos</h3>
            ${worksHTML}
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('subjectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Función para formatear fechas
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
}

// Función para obtener la clase CSS del estado del trabajo
function getWorkStatusClass(status) {
    switch(status) {
        case 'completed': return 'status-completed';
        case 'in_progress': return 'status-pending';
        case 'planning': return 'status-pending';
        default: return 'status-pending';
    }
}

// Función para obtener el texto del estado del trabajo
function getWorkStatusText(status) {
    switch(status) {
        case 'completed': return 'Completado';
        case 'in_progress': return 'En progreso';
        case 'planning': return 'Planificando';
        default: return 'Pendiente';
    }
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('subjectModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Inicializar animaciones cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
    // NO renderizar materias inicialmente para mantener el HTML estático
    // renderSubjects();
    
    // Configurar eventos de filtros
    setupFilterEvents();
    
    // Configurar búsqueda
    setupSearchEvents();
});

// Configurar eventos de filtros
function setupFilterEvents() {
    // Filtro por estado
    const statusFilter = document.getElementById('filterStatus');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            currentFilter = this.value;
            renderSubjects();
        });
    }
    
    // Filtros por área
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remover clase activa de todos los pills
            filterPills.forEach(p => p.classList.remove('active'));
            // Agregar clase activa al pill seleccionado
            this.classList.add('active');
            
            currentArea = this.getAttribute('data-area');
            renderSubjects();
        });
    });
}

// Configurar eventos de búsqueda
function setupSearchEvents() {
    const searchInput = document.getElementById('searchSubjects');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchTerm = this.value;
            renderSubjects();
        });
    }
}

// Función para inicializar animaciones
function initializeAnimations() {
    const cards = document.querySelectorAll('.subject-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.animationDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Agregar efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Función para actualizar contadores de tareas (simulación)
function updateTaskCounters() {
    // Esta función podría conectarse a una API real para obtener datos actualizados
    console.log('Actualizando contadores de tareas...');
    
    // Simular actualización de datos
    Object.keys(subjectData).forEach(key => {
        const subject = subjectData[key];
        // Simular cambios aleatorios en contadores
        if (Math.random() > 0.8) {
            subject.pendingTasks = Math.max(0, subject.pendingTasks + (Math.random() > 0.5 ? 1 : -1));
        }
    });
    
    renderSubjects();
}

// Actualizar contadores cada 5 minutos
setInterval(updateTaskCounters, 300000);
