// Q3: Multi-step form with validation

const steps = document.querySelectorAll('.step');
const inputs = [
  document.getElementById('nameInput'),
  document.getElementById('emailInput'),
  document.getElementById('passwordInput'),
];
const errorMsg = document.getElementById('errorMsg');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const formArea = document.getElementById('formArea');
const summary = document.getElementById('summary');

let currentStep = 0;

// One validator per step: returns an error string, or '' if valid
const validators = [
  (v) => (v.trim().length >= 2 ? '' : 'Name must be at least 2 characters.'),
  (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email.'),
  (v) => (v.length >= 6 ? '' : 'Password must be at least 6 characters.'),
];

function showStep(index) {
  steps.forEach((step, i) => step.classList.toggle('active', i === index));
  backBtn.disabled = index === 0;
  nextBtn.textContent = index === steps.length - 1 ? 'Finish' : 'Next';
  errorMsg.textContent = '';
  inputs[index].focus();
}

function showSummary() {
  formArea.style.display = 'none';
  summary.style.display = 'block';
  summary.innerHTML = '<h2>Summary</h2>';
  const list = document.createElement('p');
  // textContent keeps user input safe from HTML injection
  list.textContent = `Name: ${inputs[0].value.trim()} | Email: ${inputs[1].value.trim()} | Password: ${'•'.repeat(inputs[2].value.length)}`;
  summary.appendChild(list);
}

nextBtn.addEventListener('click', () => {
  const error = validators[currentStep](inputs[currentStep].value);
  if (error) { errorMsg.textContent = error; return; } // stay on this step
  if (currentStep === steps.length - 1) return showSummary();
  currentStep++;
  showStep(currentStep);
});

backBtn.addEventListener('click', () => {
  if (currentStep > 0) { currentStep--; showStep(currentStep); }
});

showStep(0);
