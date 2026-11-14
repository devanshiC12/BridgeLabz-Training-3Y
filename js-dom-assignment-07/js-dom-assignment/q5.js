// Q5: Image gallery + modal preview (needs internet for picsum.photos images)

const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalImage = document.getElementById('modalImage');

// Build 6 thumbnails; data-full holds the bigger image URL
for (let i = 1; i <= 6; i++) {
  const img = document.createElement('img');
  img.src = `https://picsum.photos/seed/gallery${i}/300/200`;
  img.dataset.full = `https://picsum.photos/seed/gallery${i}/900/600`;
  img.alt = `Gallery image ${i}`;
  gallery.appendChild(img);
}

// Delegation: one click listener for all thumbnails
gallery.addEventListener('click', (event) => {
  if (event.target.tagName !== 'IMG') return;
  modalImage.src = event.target.dataset.full;
  modal.classList.add('open');
});

// Click on the dark backdrop closes the modal
modal.addEventListener('click', () => modal.classList.remove('open'));

// Click inside the modal box must NOT bubble up to the backdrop
modalContent.addEventListener('click', (event) => event.stopPropagation());

// Bonus: Escape key closes it too
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.classList.remove('open'); });
