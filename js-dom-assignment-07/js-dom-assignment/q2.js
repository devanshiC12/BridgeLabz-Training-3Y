// Q2: Character counter with warning (<=20 left) and block (0 left)

const MAX_CHARS = 100;
const WARNING_AT = 20;

const textBox = document.getElementById('textBox');
const counter = document.getElementById('counter');
const resetBtn = document.getElementById('resetBtn');

function updateCounter() {
  const remaining = MAX_CHARS - textBox.value.length;
  counter.textContent = `${remaining} characters left`;
  counter.classList.toggle('warning', remaining <= WARNING_AT && remaining > 0);
  counter.classList.toggle('danger', remaining <= 0);
}

// Block typing once the limit is reached.
// Navigation / delete keys and shortcuts (Ctrl+A etc.) are still allowed.
textBox.addEventListener('keydown', (event) => {
  const isPrintableKey = event.key.length === 1 && !event.ctrlKey && !event.metaKey;
  const hasSelection = textBox.selectionStart !== textBox.selectionEnd; // typing replaces selection
  if (textBox.value.length >= MAX_CHARS && isPrintableKey && !hasSelection) {
    event.preventDefault();
  }
});

// Safety net: pasted text could still exceed the limit, so trim it
textBox.addEventListener('input', () => {
  if (textBox.value.length > MAX_CHARS) {
    textBox.value = textBox.value.slice(0, MAX_CHARS);
  }
  updateCounter();
});

resetBtn.addEventListener('click', () => {
  textBox.value = '';
  updateCounter();
  textBox.focus();
});

updateCounter();
