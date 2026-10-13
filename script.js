// ---------- 1. Select the elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");

// ---------- 2. Our data: an array of note objects ----------
let notes = [];

// ---------- 3. Draw the notes on the page ----------
function render() {
  list.innerHTML = ""; // clear the old list

  notes.forEach((note) => {
    // The card
    const li = document.createElement("li");
    li.classList.add("note");
    li.classList.add("category-" + note.category);

    // The note text (textContent is safe for user text)
    const text = document.createElement("p");
    text.textContent = note.text;

    // Category label and date
    const category = document.createElement("span");
    category.classList.add("note-category");
    category.textContent = note.category;

    const date = document.createElement("span");
    date.classList.add("note-date");
    date.textContent = " - " + note.createdAt;

    // Delete button (we make it work in Task 4)
    const del = document.createElement("button");
    del.classList.add("delete-btn");
    del.textContent = "Delete";

    // Put everything inside the card, then add the card to the list
    li.appendChild(text);
    li.appendChild(category);
    li.appendChild(date);
    li.appendChild(document.createElement("br"));
    li.appendChild(del);
    list.appendChild(li);
  });
}

// ---------- 4. Add a note ----------
function addNote(text, category) {
  const newNote = {
    id: Date.now(),                         // simple unique id
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(), // readable date and time
  };
  notes.push(newNote);
  render();
}

// ---------- 5. When the form is submitted ----------
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page reload
  const text = input.value.trim();
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

// ---------- 6. Draw once when the page loads ----------
render();
