// Q7: Mouse tracking + red dot on double-click

const box = document.getElementById('box');
const coords = document.getElementById('coords');

// Live clientX / clientY while moving inside the box
box.addEventListener('mousemove', (event) => {
  coords.textContent = `clientX: ${event.clientX}, clientY: ${event.clientY}`;
});

box.addEventListener('mouseleave', () => {
  coords.textContent = 'Move the mouse inside the box';
});

// Double-click: drop a dot exactly where the click happened
box.addEventListener('dblclick', (event) => {
  const boxRect = box.getBoundingClientRect();
  const dot = document.createElement('div');
  dot.className = 'dot';
  // Convert page-based clientX/Y to coordinates relative to the box
  dot.style.left = `${event.clientX - boxRect.left}px`;
  dot.style.top = `${event.clientY - boxRect.top}px`;
  box.appendChild(dot);
});
