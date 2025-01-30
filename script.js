const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const error = document.getElementById("error");
const loading = document.getElementById("loading");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImages(imagesArray) {
  const promises = imagesArray.map(image => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
      img.src = image.url;
    });
  });
  return Promise.all(promises);
}

btn.addEventListener('click', () => {
  loading.textContent = 'Loading...';
  error.textContent = '';
  output.innerHTML = '';

  downloadImages(images)
    .then(imgs => {
      imgs.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(err => {
      error.textContent = err.message;
    })
    .finally(() => {
      loading.textContent = '';
    });
});