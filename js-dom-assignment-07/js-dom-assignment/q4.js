// Q4: Theme switcher using setAttribute() only (class + data-theme)

const themeLabel = document.getElementById('themeLabel');

function applyTheme(themeName) {
  // Set the class via setAttribute (replaces any previous theme class)
  document.body.setAttribute('class', `theme-${themeName}`);
  // Save current theme in a custom attribute
  document.body.setAttribute('data-theme', themeName);
  themeLabel.textContent = document.body.getAttribute('data-theme');
}

// One listener per button
document.querySelectorAll('[data-theme-btn]').forEach((button) => {
  button.addEventListener('click', () => applyTheme(button.getAttribute('data-theme-btn')));
});
