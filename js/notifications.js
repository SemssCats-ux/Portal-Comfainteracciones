/**
 * Sistema de Notificaciones para Portal Estudiantil
 * Comfainteracciones
 */

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.init();
    }

    init() {
        this.createNotificationContainer();
        this.loadNotifications();
        this.startAutoCheck();
        }

    createNotificationContainer() {
        // Crear contenedor de notificaciones
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.className = 'notification-container';
        
        // Agregar al body
        document.body.appendChild(this.container);
        
        // Crear botón de notificaciones en el header
        this.createNotificationButton();
    }

        createNotificationButton() {
        const header = document.querySelector('.fh5co-nav .top .fh5co-social');
        if (header) {
            const notificationBtn = document.createElement('li');
            notificationBtn.innerHTML = `
                <a href="#" id="notification-toggle" class="notification-toggle">
                    <i class="icon-bell"></i>
                    <span class="notification-badge" id="notification-badge">0</span>
                </a>
            `;
            
            header.appendChild(notificationBtn);
            
            // Event listener para mostrar/ocultar notificaciones
            document.getElementById('notification-toggle').addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleNotifications();
            });
        }
    }

    addNotification(type, title, message, priority = 'normal', duration = 5000) {
        const notification = {
            id: Date.now(),
            type: type, // 'success', 'warning', 'error', 'info'
            title: title,
            message: message,
            priority: priority, // 'low', 'normal', 'high', 'urgent'
            timestamp: new Date(),
            read: false
        };

        this.notifications.unshift(notification);
        this.updateNotificationBadge();
        this.showNotification(notification);
        this.saveNotifications();
        
        // Auto-hide después del tiempo especificado
        if (duration > 0) {
            setTimeout(() => {
                this.hideNotification(notification.id);
            }, duration);
        }

        return notification;
    }

    showNotification(notification) {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification-item notification-${notification.type} notification-${notification.priority}`;
        notificationElement.id = `notification-${notification.id}`;
        
        notificationElement.innerHTML = `
            <div class="notification-header">
                <span class="notification-title">${notification.title}</span>
                <button class="notification-close" onclick="notificationSystem.hideNotification(${notification.id})">
                    <i class="icon-close"></i>
                </button>
            </div>
            <div class="notification-message">${notification.message}</div>
            <div class="notification-time">${this.formatTime(notification.timestamp)}</div>
        `;

        this.container.appendChild(notificationElement);
        
        // Animación de entrada
        setTimeout(() => {
            notificationElement.classList.add('show');
        }, 100);
    }

    hideNotification(id) {
        const notification = document.getElementById(`notification-${id}`);
        if (notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }

    toggleNotifications() {
        this.container.classList.toggle('show');
    }

    updateNotificationBadge() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const badge = document.getElementById('notification-badge');
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }

    formatTime(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        
        if (diff < 60000) return 'Ahora mismo';
        if (diff < 3600000) return `Hace ${Math.floor(diff / 60000)} min`;
        if (diff < 86400000) return `Hace ${Math.floor(diff / 3600000)} horas`;
        return timestamp.toLocaleDateString();
    }

    loadNotifications() {
        const saved = localStorage.getItem('comfainteracciones-notifications');
        if (saved) {
            this.notifications = JSON.parse(saved);
            this.updateNotificationBadge();
        }
    }

    saveNotifications() {
        localStorage.setItem('comfainteracciones-notifications', JSON.stringify(this.notifications));
    }

    startAutoCheck() {
        // Verificar notificaciones cada 30 segundos
        setInterval(() => {
            this.checkForNewNotifications();
        }, 30000);
    }

    checkForNewNotifications() {
        // Simular nuevas notificaciones (en producción esto vendría del servidor)
        const random = Math.random();
        if (random < 0.1) { // 10% de probabilidad
            this.addNotification(
                'info',
                'Recordatorio',
                'Tienes tareas pendientes que vencen pronto',
                'normal',
                8000
            );
        }
    }

    // Métodos de conveniencia para diferentes tipos de notificaciones
    success(title, message, priority = 'normal') {
        return this.addNotification('success', title, message, priority);
    }

    warning(title, message, priority = 'normal') {
        return this.addNotification('warning', title, message, priority);
    }

    error(title, message, priority = 'high') {
        return this.addNotification('error', title, message, priority);
    }

    info(title, message, priority = 'normal') {
        return this.addNotification('info', title, message, priority);
    }
}

// Inicializar el sistema de notificaciones
const notificationSystem = new NotificationSystem();

// Ejemplos de uso
// notificationSystem.success('¡Bienvenido!', 'Has iniciado sesión correctamente');
// notificationSystem.warning('Tarea próxima', 'La tarea de Matemáticas vence mañana');
// notificationSystem.error('Error', 'No se pudo cargar la página');
// notificationSystem.info('Actualización', 'Nuevas calificaciones disponibles');
