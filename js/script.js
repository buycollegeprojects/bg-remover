// Global variables
const API_KEY = 'YOUR_DUMMY_API_KEY';  // replace youractual api key 
let originalImage = null;
let processedImage = null;

// DOM elements
document.addEventListener('DOMContentLoaded', () => {
    // Upload and display elements
    const uploadBtn = document.getElementById('upload-btn');
    const sampleBtn = document.getElementById('sample-btn');
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const uploadProgress = document.getElementById('upload-progress');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    // Result section elements
    const resultSection = document.getElementById('result-section');
    const originalImageEl = document.getElementById('original-image');
    const processedImageEl = document.getElementById('processed-image');
    const downloadPng = document.getElementById('download-png');
    const downloadJpg = document.getElementById('download-jpg');
    const tryAnotherBtn = document.getElementById('try-another');
    
    // FAQ elements
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Sample modal elements
    const sampleModal = document.getElementById('sample-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Event listeners
    uploadBtn.addEventListener('click', () => {
        document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    sampleBtn.addEventListener('click', showSampleModal);
    closeModal.addEventListener('click', closeSampleModal);
    
    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    
    // Drag and drop events
    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('dragleave', handleDragLeave);
    dropArea.addEventListener('drop', handleDrop);
    
    // Download buttons
    downloadPng.addEventListener('click', () => downloadImage('png'));
    downloadJpg.addEventListener('click', () => downloadImage('jpg'));
    
    // Try another image button
    tryAnotherBtn.addEventListener('click', resetUpload);
    
    // FAQ toggle
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Handle drag over event
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('drop-area').classList.add('drag-highlight');
}

// Handle drag leave event
function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('drop-area').classList.remove('drag-highlight');
}

// Handle file drop event
function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    document.getElementById('drop-area').classList.remove('drag-highlight');
    
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length) {
        handleFiles(files);
    }
}

// Handle file upload from input
function handleFileUpload(e) {
    const files = e.target.files;
    if (files.length) {
        handleFiles(files);
    }
}

// Process the uploaded files
function handleFiles(files) {
    const file = files[0];
    
    // Check file type
    if (!file.type.match('image.*')) {
        showError('Please upload an image file (JPG, PNG, or WEBP).');
        return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showError('File size exceeds the 5MB limit. Please upload a smaller image.');
        return;
    }
    
    // Read and display the original image
    const reader = new FileReader();
    reader.onload = function(e) {
        originalImage = e.target.result;
        
        // Show upload progress
        document.getElementById('upload-progress').style.display = 'block';
        document.getElementById('progress-fill').style.width = '10%';
        document.getElementById('progress-text').textContent = 'Preparing image...';
        
        // Make the API call immediately
        removeBackground(file);
    };
    reader.readAsDataURL(file);
}

// Call to remove.bg API
function removeBackground(file) {
    const formData = new FormData();
    formData.append('image_file', file);
    
    // Additional parameters for the API (optional)
    formData.append('size', 'auto');  // Output image size
    formData.append('format', 'auto'); // Output image format
    
    // Update progress
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    progressFill.style.width = '30%';
    progressText.textContent = 'Contacting API...';
    
    // Make the actual API call
    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': API_KEY
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            // Handle API errors based on status code
            if (response.status === 402) {
                throw new Error("API credit limit reached. Please check your remove.bg account.");
            } else {
                throw new Error("API error: " + response.status);
            }
        }
        
        progressFill.style.width = '70%';
        progressText.textContent = 'Processing image...';
        
        return response.blob();
    })
    .then(blob => {
        // Update progress to complete
        progressFill.style.width = '100%';
        progressText.textContent = 'Processing: 100%';
        
        // Create URL for the processed image
        const url = URL.createObjectURL(blob);
        processedImage = url;
        
        // Show results
        showResults();
    })
    .catch(error => {
        console.error('Error:', error);
        showError('Error: ' + error.message);
        
        // Reset progress or show error state
        progressFill.style.width = '0%';
        document.getElementById('upload-progress').style.display = 'none';
    });
}

// Show the processing results
function showResults() {
    // Hide upload section and show results
    document.getElementById('upload-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');
    
    // Set the original and processed images
    document.getElementById('original-image').src = originalImage;
    document.getElementById('processed-image').src = processedImage;
    
    // Scroll to results section
    document.getElementById('result-section').scrollIntoView({ behavior: 'smooth' });
}

// Reset to upload another image
function resetUpload() {
    // Clear previous image data
    originalImage = null;
    processedImage = null;
    
    // Reset progress bar
    document.getElementById('progress-fill').style.width = '0%';
    document.getElementById('progress-text').textContent = 'Processing: 0%';
    document.getElementById('upload-progress').style.display = 'none';
    
    // Reset file input
    document.getElementById('file-input').value = '';
    
    // Show upload section and hide results
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('upload-section').classList.remove('hidden');
    
    // Scroll to upload section
    document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' });
}

// Download the processed image
function downloadImage(format) {
    // Create a download link for the processed image
    const link = document.createElement('a');
    
    if (format === 'png') {
        // PNG format has transparency
        link.href = processedImage;
        link.download = 'background-removed.png';
    } else {
        // For JPG, we'd need to convert but for now just use the processed image
        link.href = processedImage;
        link.download = 'background-removed.jpg';
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Show error message
function showError(message) {
    alert(message); // In production, you'd use a nicer error UI
}

// Sample modal functions
function showSampleModal() {
    document.getElementById('sample-modal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
}

function closeSampleModal() {
    document.getElementById('sample-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Handle contact form
function handleContactForm(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a production app, you'd send this data to your server
    // For this demo, we'll just show a success message
    alert(`Thank you ${name}! Your message has been received. We'll get back to you at ${email} as soon as possible.`);
    
    // Reset form
    e.target.reset();
}

// Window click event to close modal
window.addEventListener('click', (e) => {
    const modal = document.getElementById('sample-modal');
    if (e.target === modal) {
        closeSampleModal();
    }
});

// Add a simple dark mode toggle functionality
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // You could save this preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Check for saved dark mode preference on load
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}