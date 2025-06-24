// Funcionalidad para la sección de apuntes estudiantiles
document.addEventListener('DOMContentLoaded', function() {
    
    // Variables para manejar los apuntes
    let notes = JSON.parse(localStorage.getItem('studentNotes')) || [];
    let editingNoteId = null;
    
    // Elementos del DOM
    const noteTitle = document.querySelector('.note-title');
    const noteCategory = document.querySelector('.note-category');
    const noteContent = document.querySelector('.note-content');
    const saveBtn = document.querySelector('.save-note');
    const clearBtn = document.querySelector('.clear-note');
    const notesList = document.querySelector('.notes-list');
    const filterCategory = document.querySelector('.filter-category');
    const editorBtns = document.querySelectorAll('.btn-editor');
    
    // Inicializar la aplicación
    init();
    
    function init() {
        renderNotes();
        attachEventListeners();
        removeSampleNote();
    }
    
    function removeSampleNote() {
        const sampleNote = document.querySelector('.sample-note');
        if (sampleNote && notes.length > 0) {
            sampleNote.remove();
        }
    }
    
    function attachEventListeners() {
        // Botón guardar
        saveBtn.addEventListener('click', saveNote);
        
        // Botón limpiar
        clearBtn.addEventListener('click', clearForm);
        
        // Filtro por categoría
        filterCategory.addEventListener('change', filterNotes);
        
        // Botones del editor
        editorBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                formatText(this.dataset.action);
            });
        });
        
        // Auto-guardado cada 30 segundos si hay contenido
        setInterval(autoSave, 30000);
    }
    
    function saveNote() {
        const title = noteTitle.value.trim();
        const category = noteCategory.value;
        const content = noteContent.value.trim();
        
        if (!title || !content) {
            alert('Por favor, completa el título y el contenido del apunte.');
            return;
        }
        
        const note = {
            id: editingNoteId || Date.now(),
            title: title,
            category: category || 'otros',
            content: content,
            date: new Date().toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }),
            timestamp: Date.now()
        };
        
        if (editingNoteId) {
            // Actualizar nota existente
            const index = notes.findIndex(n => n.id === editingNoteId);
            if (index !== -1) {
                notes[index] = note;
            }
            editingNoteId = null;
            saveBtn.textContent = 'Guardar Apunte';
        } else {
            // Nueva nota
            notes.unshift(note);
        }
        
        localStorage.setItem('studentNotes', JSON.stringify(notes));
        renderNotes();
        clearForm();
        
        // Mostrar mensaje de éxito
        showMessage('Apunte guardado exitosamente', 'success');
    }
    
    function clearForm() {
        noteTitle.value = '';
        noteCategory.value = '';
        noteContent.value = '';
        editingNoteId = null;
        saveBtn.textContent = 'Guardar Apunte';
    }
    
    function autoSave() {
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        
        if (title && content && title.length > 3 && content.length > 10) {
            // Solo auto-guardar si no estamos editando una nota existente
            if (!editingNoteId) {
                const autoSaveNote = {
                    id: Date.now(),
                    title: title + ' (Auto-guardado)',
                    category: noteCategory.value || 'otros',
                    content: content,
                    date: new Date().toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    }),
                    timestamp: Date.now(),
                    autoSaved: true
                };
                
                notes.unshift(autoSaveNote);
                localStorage.setItem('studentNotes', JSON.stringify(notes));
                renderNotes();
                showMessage('Apunte auto-guardado', 'info');
            }
        }
    }
    
    function renderNotes() {
        const activeFilter = filterCategory.value;
        const filteredNotes = activeFilter ? 
            notes.filter(note => note.category === activeFilter) : notes;
        
        // Mantener la nota de ejemplo si no hay notas
        if (filteredNotes.length === 0 && notes.length === 0) {
            return;
        }
        
        // Limpiar la lista (excepto la nota de ejemplo si no hay notas reales)
        if (notes.length > 0) {
            notesList.innerHTML = '';
        }
        
        filteredNotes.forEach(note => {
            const noteElement = createNoteElement(note);
            notesList.appendChild(noteElement);
        });
    }
    
    function createNoteElement(note) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-item';
        noteDiv.innerHTML = `
            <div class="note-header">
                <h4>${note.title}</h4>
                <span class="note-category ${note.category}">${getCategoryName(note.category)}</span>
                <span class="note-date">${note.date}</span>
            </div>
            <div class="note-preview">
                <p>${note.content}</p>
            </div>
            <div class="note-actions">
                <button class="btn-edit" onclick="editNote(${note.id})">
                    <i class="icon-edit"></i> Editar
                </button>
                <button class="btn-delete" onclick="deleteNote(${note.id})">
                    <i class="icon-trash"></i> Eliminar
                </button>
            </div>
        `;
        
        return noteDiv;
    }
    
    function getCategoryName(category) {
        const categories = {
            'matematicas': 'Matemáticas',
            'ciencias': 'Ciencias',
            'historia': 'Historia',
            'idiomas': 'Idiomas',
            'otros': 'Otros'
        };
        return categories[category] || 'Otros';
    }
    
    function filterNotes() {
        renderNotes();
    }
    
    function formatText(action) {
        const textarea = noteContent;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        
        let formattedText = '';
        
        switch(action) {
            case 'bold':
                formattedText = `**${selectedText}**`;
                break;
            case 'italic':
                formattedText = `*${selectedText}*`;
                break;
            case 'underline':
                formattedText = `__${selectedText}__`;
                break;
            case 'heading':
                formattedText = `## ${selectedText}`;
                break;
            case 'list':
                formattedText = `• ${selectedText}`;
                break;
            default:
                formattedText = selectedText;
        }
        
        textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }
    
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert alert-${type} note-message`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            background: ${type === 'success' ? '#28a745' : type === 'info' ? '#17a2b8' : '#dc3545'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        // Animación de entrada
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 3000);
    }
    
    // Funciones globales para los botones de las notas
    window.editNote = function(noteId) {
        const note = notes.find(n => n.id === noteId);
        if (note) {
            noteTitle.value = note.title.replace(' (Auto-guardado)', '');
            noteCategory.value = note.category;
            noteContent.value = note.content;
            editingNoteId = noteId;
            saveBtn.textContent = 'Actualizar Apunte';
            
            // Scroll hacia el editor
            document.querySelector('.notes-container').scrollIntoView({
                behavior: 'smooth'
            });
        }
    };
    
    window.deleteNote = function(noteId) {
        if (confirm('¿Estás seguro de que quieres eliminar este apunte?')) {
            notes = notes.filter(n => n.id !== noteId);
            localStorage.setItem('studentNotes', JSON.stringify(notes));
            renderNotes();
            showMessage('Apunte eliminado', 'info');
        }
    };
    
    // Prevenir pérdida de datos
    window.addEventListener('beforeunload', function(e) {
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        
        if ((title || content) && (title.length > 0 || content.length > 0)) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
});
