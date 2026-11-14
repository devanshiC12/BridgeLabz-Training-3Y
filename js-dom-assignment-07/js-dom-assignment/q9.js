// Q9: Form submit blocker with live error clearing

const form = document.getElementById('signupForm');
const successMsg = document.getElementById('successMsg');

// Each field: its input, its error <div>, and a validator returning '' when valid
const fields = [
  { input: document.getElementById('name'),     error: document.getElementById('nameError'),
    validate: (v) => (v.trim() ? '' : 'Name is required.') },
  { input: document.getElementById('email'),    error: document.getElementById('emailError'),
    validate: (v) => (!v.trim() ? 'Email is required.' : !v.includes('@') ? 'Email must contain @.' : '') },
  { input: document.getElementById('password'), error: document.getElementById('passwordError'),
    validate: (v) => (v.length >= 6 ? '' : 'Password must be at least 6 characters.') },
];

// Validate one field and show/clear its error. Returns true if valid.
function checkField({ input, error, validate }) {
  const message = validate(input.value);
  error.textContent = message;
  return message === '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); // always stop the real page-reload submission
  successMsg.textContent = '';

  // Check every field (map, not every, so ALL errors show at once)
  const allValid = fields.map(checkField).every(Boolean);

  if (allValid) {
    successMsg.textContent = 'Form Submitted Successfully';
    form.reset();
  }
});

// Live feedback: once a field has an error, re-check it while the user types
fields.forEach((field) => {
  field.input.addEventListener('input', () => {
    if (field.error.textContent) checkField(field); // error disappears when fixed
  });
});
