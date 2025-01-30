const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const error = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImages(imagesArray) {
  // Clear previous content
  output.innerHTML = '';
  error.textContent = '';

  // Create image containers with spinners
  const containers = imagesArray.map(() => {
    const container = document.createElement("div");
    container.className = "image-container";
    
    const spinner = document.createElement("div");
    spinner.className = "loading-spinner";
    
    container.appendChild(spinner);
    return container;
  });

  // Add containers to DOM
  containers.forEach(container => output.appendChild(container));

  // Create array of promises
  const promises = imagesArray.map((image, index) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Hide spinner and show image when loaded
        containers[index].querySelector('.loading-spinner').remove();
        img.style.display = 'block';
        resolve();
      };
      img.onerror = () => {
        reject(new Error(`Failed to load image's URL: ${image.url}`));
      };
      img.src = image.url;
      containers[index].appendChild(img);
    });
  });

  // Handle all promises
  Promise.all(promises)
    .catch(err => {
      error.textContent = err.message;
      output.innerHTML = ''; // Remove all containers if any image fails
    });
}

btn.addEventListener('click', () => downloadImages(images));