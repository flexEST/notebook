document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('notebook-content');
    const fontSelect = document.getElementById('font-select');
    const penColor = document.getElementById('pen-color');
    const penSize = document.getElementById('pen-size');
    const clearBtn = document.getElementById('clear-btn');
    const printBtn = document.getElementById('print-btn');

    // Load saved content if available
    if (localStorage.getItem('notebookContent')) {
        content.innerHTML = localStorage.getItem('notebookContent');
    }

    // Font selection
    fontSelect.addEventListener('change', function() {
        content.style.fontFamily = this.value;
        saveContent();
    });

    // Pen color
    penColor.addEventListener('input', function() {
        content.style.color = this.value;
        document.documentElement.style.setProperty('--pen-color', this.value);
        saveContent();
    });

    // Pen size (font size)
    penSize.addEventListener('input', function() {
        content.style.fontSize = `${this.value}px`;
        content.style.lineHeight = `${parseInt(this.value) + 10}px`;
        saveContent();
    });

    // Clear button
    clearBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear the page?')) {
            content.innerHTML = '';
            saveContent();
        }
    });

    // Print button
    printBtn.addEventListener('click', function() {
        window.print();
    });

    // Auto-save content
    content.addEventListener('input', saveContent);

    function saveContent() {
        localStorage.setItem('notebookContent', content.innerHTML);
    }

    // Set initial values from localStorage
    if (localStorage.getItem('fontFamily')) {
        content.style.fontFamily = localStorage.getItem('fontFamily');
        fontSelect.value = localStorage.getItem('fontFamily');
    }
    
    if (localStorage.getItem('penColor')) {
        content.style.color = localStorage.getItem('penColor');
        penColor.value = localStorage.getItem('penColor');
        document.documentElement.style.setProperty('--pen-color', localStorage.getItem('penColor'));
    }
    
    if (localStorage.getItem('fontSize')) {
        const size = localStorage.getItem('fontSize');
        content.style.fontSize = size;
        content.style.lineHeight = `${parseInt(size) + 10}px`;
        penSize.value = parseInt(size);
    }
});
