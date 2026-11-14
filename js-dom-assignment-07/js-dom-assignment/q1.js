// Q1: Product list with Add / Edit / Delete using event delegation

const productInput = document.getElementById('productInput');
const addBtn = document.getElementById('addBtn');
const productList = document.getElementById('productList');

let currentlyEditingItem = null; // the <li> in edit mode (only one at a time)

// Build one <li> for a product name
function createProductItem(name) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="name"></span>
    <button data-action="edit">Edit</button>
    <button data-action="delete">Delete</button>`;
  li.querySelector('.name').textContent = name; // textContent avoids HTML injection
  return li;
}

function addProduct() {
  const name = productInput.value.trim();
  if (!name) return;
  productList.appendChild(createProductItem(name));
  productInput.value = '';
  productInput.focus();
}

// Switch an item into inline-edit mode
function startEdit(li) {
  if (currentlyEditingItem) saveEdit(currentlyEditingItem); // save the previous one first
  const nameSpan = li.querySelector('.name');
  const editInput = document.createElement('input');
  editInput.className = 'edit-input';
  editInput.value = nameSpan.textContent;
  nameSpan.replaceWith(editInput);
  li.querySelector('[data-action="edit"]').textContent = 'Save';
  editInput.focus();
  currentlyEditingItem = li;
}

// Save the edited text back into a <span>
function saveEdit(li) {
  const editInput = li.querySelector('.edit-input');
  if (!editInput) return;
  const newName = editInput.value.trim() || 'Untitled product'; // never allow an empty name
  const nameSpan = document.createElement('span');
  nameSpan.className = 'name';
  nameSpan.textContent = newName;
  editInput.replaceWith(nameSpan);
  li.querySelector('[data-action="edit"]').textContent = 'Edit';
  currentlyEditingItem = null;
}

addBtn.addEventListener('click', addProduct);
productInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addProduct(); });

// EVENT DELEGATION: one listener on the <ul> handles every Edit/Delete button
productList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const li = button.closest('li');

  if (button.dataset.action === 'delete') {
    if (li === currentlyEditingItem) currentlyEditingItem = null;
    li.remove();
  } else if (button.dataset.action === 'edit') {
    li === currentlyEditingItem ? saveEdit(li) : startEdit(li); // Edit/Save toggle
  }
});

// Enter key saves while editing
productList.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.classList.contains('edit-input')) saveEdit(e.target.closest('li'));
});

// Click anywhere outside the edited item -> auto-save
document.addEventListener('click', (event) => {
  if (currentlyEditingItem && !currentlyEditingItem.contains(event.target)) {
    saveEdit(currentlyEditingItem);
  }
});
