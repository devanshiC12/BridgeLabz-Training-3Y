// Q8: Custom dropdown, closes on outside click via the CAPTURING phase

const dropdown = document.getElementById('dropdown');
const dropdownBtn = document.getElementById('dropdownBtn');
const optionList = document.getElementById('optionList');

// Button toggles the list
dropdownBtn.addEventListener('click', () => optionList.classList.toggle('open'));

// Clicking an option updates the button text and closes the list
optionList.addEventListener('click', (event) => {
  if (event.target.tagName !== 'LI') return;
  dropdownBtn.textContent = `${event.target.textContent} ▾`;
  optionList.classList.remove('open');
});

// Third argument `true` = capturing phase.
// This runs BEFORE any bubbling handler, so it still works even if another
// element calls stopPropagation().
document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target)) {
    optionList.classList.remove('open');
  }
}, true);
