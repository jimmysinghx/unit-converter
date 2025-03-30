const imageInput = document.getElementById('imageInput');
const compressButton = document.getElementById('compressButton');
const result = document.getElementById('result');

const imageCompression = window.imageCompression;

compressButton.addEventListener('click', async () => {
    const file = imageInput.files[0];
    if (file) {
        const options = {
            maxSizeMB: 1, // Adjust as needed
            maxWidthOrHeight: 1920, // Adjust as needed
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(file, options);
            const compressedBlob = new Blob([compressedFile], { type: compressedFile.type });
            const originalSize = file.size;
            const compressedSize = compressedBlob.size;
            const reduction = ((originalSize - compressedSize) / originalSize) * 100;

            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(compressedBlob);
            downloadLink.download = 'compressed.' + file.name.split('.').pop();
            result.innerHTML = `
                <p>Original Size: ${(originalSize / 1024).toFixed(2)} KB</p>
                <p>Compressed Size: ${(compressedSize / 1024).toFixed(2)} KB</p>
                <p>Reduction: ${reduction.toFixed(2)}%</p>
            `;
            result.appendChild(downloadLink);
            downloadLink.textContent = 'Download Compressed Image';
        } catch (error) {
            result.textContent = 'Compression failed: ' + error.message;
        }
    }
});
