let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlide() {
  slides.forEach(slide => slide.style.display = "none");
  index = (index + 1) % slides.length;
  slides[index].style.display = "block";
}

setInterval(showSlide, 3000);
showSlide();


const form = document.getElementById("entryForm");
const list = document.getElementById("entriesList");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

function renderEntries() {
  list.innerHTML = "";
  entries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${entry.date}</strong><br>
      ${entry.emotion}<br>
      <button onclick="editEntry(${index})">Editar</button>
      <button onclick="deleteEntry(${index})">Eliminar</button>
    `;
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = document.getElementById("date").value;
  const emotion = document.getElementById("emotion").value;
  entries.push({ date, emotion });
  localStorage.setItem("entries", JSON.stringify(entries));
  renderEntries();
  form.reset();
});

function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  renderEntries();
}

function editEntry(index) {
  const entry = entries[index];
  document.getElementById("date").value = entry.date;
  document.getElementById("emotion").value = entry.emotion;
  entries.splice(index, 1); // Remove to re-add on save
  localStorage.setItem("entries", JSON.stringify(entries));
  renderEntries();
}

renderEntries();
