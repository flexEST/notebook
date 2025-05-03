document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('notebook-content');
    const fontSelect = document.getElementById('font-select');
    const penColor = document.getElementById('pen-color');
    const penSize = document.getElementById('pen-size');
    const penSizeValue = document.getElementById('pen-size-value');
    const clearBtn = document.getElementById('clear-btn');
    const printBtn = document.getElementById('print-btn');
    const fontUpload = document.getElementById('font-upload');
    const uploadFontBtn = document.getElementById('upload-font-btn');

    // Load saved content if available
    if (localStorage.getItem('notebookContent')) {
        content.innerHTML = localStorage.getItem('notebookContent');
    }

    // Font selection
    fontSelect.addEventListener('change', function() {
        if (this.value === "'CustomFont', cursive") {
            uploadFontBtn.click();
        } else {
            content.style.fontFamily = this.value;
            saveContent();
        }
    });

    // Pen color
    penColor.addEventListener('input', function() {
        content.style.color = this.value;
        document.documentElement.style.setProperty('--pen-color', this.value);
        saveContent();
    });

    // Pen size (font size)
    penSize.addEventListener('input', function() {
        const size = this.value;
        content.style.fontSize = `${size}px`;
        content.style.lineHeight = `${parseInt(size) + 15}px`;
        penSizeValue.textContent = `${size}px`;
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

    // Font upload
    uploadFontBtn.addEventListener('click', function() {
        fontUpload.click();
    });

    fontUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const fontData = e.target.result;
            const fontName = 'CustomFont';
            
            // Create a new style element for the font-face
            const style = document.createElement('style');
            style.textContent = `
                @font-face {
                    font-family: '${fontName}';
                    src: url(${fontData});
                }
            `;
            document.head.appendChild(style);
            
            // Apply the font
            content.style.fontFamily = `'${fontName}', cursive`;
            fontSelect.value = `'${fontName}', cursive`;
            saveContent();
        };
        reader.readAsDataURL(file);
    });

    // Auto-save content
    content.addEventListener('input', saveContent);

    function saveContent() {
        localStorage.setItem('notebookContent', content.innerHTML);
        localStorage.setItem('fontFamily', content.style.fontFamily);
        localStorage.setItem('penColor', content.style.color);
        localStorage.setItem('fontSize', content.style.fontSize);
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
        content.style.lineHeight = `${parseInt(size) + 15}px`;
        penSize.value = parseInt(size);
        penSizeValue.textContent = size;
    }
});
