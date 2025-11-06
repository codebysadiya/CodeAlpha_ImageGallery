// ==========================
// Image Data
// ==========================
const albums = {
  nature: [
    "https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg",
    "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg",
    "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg",
    "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg",
    "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg",
    "https://images.pexels.com/photos/1743165/pexels-photo-1743165.jpeg",
    "https://images.pexels.com/photos/269138/pexels-photo-269138.jpeg",
    "https://images.pexels.com/photos/51548/pexels-photo-51548.jpeg",
    "https://images.pexels.com/photos/53435/tree-oak-landscape-view-53435.jpeg",
    "https://images.pexels.com/photos/46164/field-of-rapeseeds-oilseed-rape-blutenmeer-yellow-46164.jpeg"
  ],
  city: [
    "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg",
    "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg",
    "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg",
    "https://images.pexels.com/photos/219692/pexels-photo-219692.jpeg",
    "https://images.pexels.com/photos/421927/pexels-photo-421927.jpeg",
    "https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg",
    "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
    "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg",
    "https://images.pexels.com/photos/169677/pexels-photo-169677.jpeg",
    "https://images.pexels.com/photos/409127/pexels-photo-409127.jpeg"
  ],
  people: [
    "https://images.pexels.com/photos/1245055/pexels-photo-1245055.jpeg",
    "https://images.pexels.com/photos/889545/pexels-photo-889545.jpeg",
    "https://images.pexels.com/photos/1087735/pexels-photo-1087735.jpeg",
    "https://images.pexels.com/photos/109919/pexels-photo-109919.jpeg",
    "https://images.pexels.com/photos/2064826/pexels-photo-2064826.jpeg",
    "https://images.pexels.com/photos/433452/pexels-photo-433452.jpeg",
    "https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg",
    "https://images.pexels.com/photos/794212/pexels-photo-794212.jpeg",
    "https://images.pexels.com/photos/2346289/pexels-photo-2346289.jpeg",
    "https://images.pexels.com/photos/757432/pexels-photo-757432.jpeg"
  ]
};

// ==========================
// Gallery Setup
// ==========================
const params = new URLSearchParams(window.location.search);
const album = params.get("album");
const gallery = document.getElementById("gallery");
const albumTitle = document.getElementById("album-title");

if (albumTitle && album) {
  albumTitle.textContent = album.charAt(0).toUpperCase() + album.slice(1);
}

if (gallery && album && albums[album]) {
  albums[album].forEach((url) => {
    const item = document.createElement("div");
    item.classList.add("gallery-item");
    item.innerHTML = `<img src="${url}" alt="${album} image" loading="lazy">`;
    gallery.appendChild(item);
  });
}

// ==========================
// Lightbox & Filters
// ==========================
const lightbox = document.getElementById("lightbox");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Filter controls container (added dynamically)
let filterControls;

// Lightbox state
let currentIndex = 0;
let currentImages = [];

function openLightbox(index) {
  lightbox.style.display = "flex";
  currentIndex = index;
  showImage();
  addFilterControls();
}

function closeLightbox() {
  lightbox.style.display = "none";
  removeFilterControls();
}

function showImage() {
  lightboxImg.src = currentImages[currentIndex];
  lightboxImg.style.filter = "none";
}

// Next with 3D rotate + depth
function nextImage() {
  lightboxImg.style.transform = "rotateY(-90deg) translateZ(-150px)";
  lightboxImg.style.opacity = "0";

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage();
    lightboxImg.style.transform = "rotateY(0deg) translateZ(0)";
    lightboxImg.style.opacity = "1";
  }, 300);
}

// Previous with 3D rotate + depth
function prevImage() {
  lightboxImg.style.transform = "rotateY(90deg) translateZ(-150px)";
  lightboxImg.style.opacity = "0";

  setTimeout(() => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage();
    lightboxImg.style.transform = "rotateY(0deg) translateZ(0)";
    lightboxImg.style.opacity = "1";
  }, 300);
}

// ==========================
// Event Listeners
// ==========================
if (gallery) {
  gallery.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      currentImages = Array.from(gallery.querySelectorAll("img")).map((img) => img.src);
      openLightbox(currentImages.indexOf(e.target.src));
    }
  });
}

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (nextBtn) nextBtn.addEventListener("click", nextImage);
if (prevBtn) prevBtn.addEventListener("click", prevImage);

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
  }
});

// ===== Lightbox Menu Toggle =====
const menuIcon = document.querySelector('.menu-icon');
const menuDropdown = document.querySelector('.menu-dropdown');

menuIcon.addEventListener('click', () => {
  menuDropdown.classList.toggle('show');
});

// Hide menu when clicking outside
document.addEventListener('click', (e) => {
  if (!menuIcon.contains(e.target) && !menuDropdown.contains(e.target)) {
    menuDropdown.classList.remove('show');
  }
});

// ===== FILTER TOOLBAR LOGIC =====
const filterToolbar = document.getElementById('filter-toolbar');
const openFiltersBtn = document.getElementById('open-filters');
const applyFiltersBtn = document.getElementById('apply-filters');
const resetFiltersBtn = document.getElementById('reset-filters');
const lightboxImg = document.querySelector('.lightbox-img');

const sliders = {
  brightness: document.getElementById('brightness'),
  contrast: document.getElementById('contrast'),
  saturate: document.getElementById('saturate'),
  grayscale: document.getElementById('grayscale'),
  blur: document.getElementById('blur'),
};

let currentFilters = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  grayscale: 0,
  blur: 0,
};

function applyFilterStyles() {
  lightboxImg.style.filter = `
    brightness(${currentFilters.brightness}%)
    contrast(${currentFilters.contrast}%)
    saturate(${currentFilters.saturate}%)
    grayscale(${currentFilters.grayscale}%)
    blur(${currentFilters.blur}px)
  `;
}

// Open filter toolbar
openFiltersBtn.addEventListener('click', () => {
  filterToolbar.classList.toggle('show');
  menuDropdown.classList.remove('show');
});

// Live update filters
Object.keys(sliders).forEach(key => {
  sliders[key].addEventListener('input', e => {
    currentFilters[key] = e.target.value;
    applyFilterStyles();
  });
});

// Apply button (just closes the toolbar)
applyFiltersBtn.addEventListener('click', () => {
  filterToolbar.classList.remove('show');
});

// Reset filters
resetFiltersBtn.addEventListener('click', () => {
  Object.keys(sliders).forEach(key => {
    sliders[key].value = key === 'grayscale' || key === 'blur' ? 0 : 100;
    currentFilters[key] = sliders[key].value;
  });
  applyFilterStyles();
});

// ===== Close Filter Toolbar =====
const filterClose = document.querySelector('.filter-close');
filterClose.addEventListener('click', () => {
  filterToolbar.classList.remove('show');
});