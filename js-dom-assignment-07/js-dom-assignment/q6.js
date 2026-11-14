// Q6: Real-time table filter using the input event

const searchBox = document.getElementById('searchBox');
const studentRows = document.querySelectorAll('#studentBody tr:not(#noResults)');
const noResultsRow = document.getElementById('noResults');

searchBox.addEventListener('input', () => {
  const query = searchBox.value.trim().toLowerCase(); // case-insensitive
  let visibleCount = 0;

  studentRows.forEach((row) => {
    const matches = row.textContent.toLowerCase().includes(query);
    row.style.display = matches ? '' : 'none';
    if (matches) visibleCount++;
  });

  // Show the message only when nothing matched
  noResultsRow.style.display = visibleCount === 0 ? 'table-row' : 'none';
});
