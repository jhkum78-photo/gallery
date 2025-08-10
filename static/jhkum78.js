document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.thumbnail-container');
    const jsonPath = 'images/jhkum78/jhkum78.json?t=' + new Date().getTime();

    if (container) {
        fetch(jsonPath)
            .then(response => {
                if (!response.ok) {
                    console.warn(`JSON file not found or error: ${jsonPath}`);
                    return []; // Return empty array to trigger "No images found"
                }
                return response.json();
            })
            .then(imageFiles => {
                // Ensure imageFiles is an array, even if JSON is empty or malformed
                if (!Array.isArray(imageFiles)) {
                    console.error(`Invalid JSON format in ${jsonPath}. Expected an array.`);
                    imageFiles = [];
                }

                // Reverse the order of images
                imageFiles.reverse();
                
                console.log('Loaded image files:', imageFiles);

                if (imageFiles.length === 0) {
                    container.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">No images found.</p>';
                } else {
                    imageFiles.forEach(fileName => {
                        const imgSrc = `images/jhkum78/${fileName}`;

                        const thumbDiv = document.createElement('div');
                        thumbDiv.className = 'thumbnail';

                        const img = document.createElement('img');
                        img.src = imgSrc;
                        img.alt = fileName;

                        thumbDiv.appendChild(img);

                        container.appendChild(thumbDiv);
                    });
                    // Call initLightbox after thumbnails are added
                    if (window.initLightbox) {
                        window.initLightbox();
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching or parsing image list JSON:', error);
                container.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">Error loading images.</p>';
            });
    }
});
