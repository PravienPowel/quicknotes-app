// ---------- 1. Select the elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

// The name we use to save notes in localStorage
const STORAGE_KEY = "quicknotes";

// ---------- 2. Load saved notes (or start with an empty array) ----------
let notes = loadNotes();

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// ---------- 3. Draw the notes on the page ----------
function render() {
  list.innerHTML = ""; // clear the old list

  // Work out which notes to show, based on the search box
  const searchText = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText)
  );

  // If a search finds nothing, show a message in the list
  if (visibleNotes.length === 0 && searchText !== "") {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    list.appendChild(message);
  }

  visibleNotes.forEach((note) => {
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

    // Delete button: it remembers the id of its own note
    const del = document.createElement("button");
    del.classList.add("delete-btn");
    del.textContent = "Delete";
    del.addEventListener("click", () => deleteNote(note.id));

    // Put everything inside the card, then add the card to the list
    li.appendChild(text);
    li.appendChild(category);
    li.appendChild(date);
    li.appendChild(document.createElement("br"));
    li.appendChild(del);
    list.appendChild(li);
  });

  updateCount();
}

// ---------- 4. The count message ----------
function updateCount() {
  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${notes.length} notes.`;
  }
}

// ---------- 5. Add and delete ----------
function addNote(text, category) {
  const newNote = {
    id: Date.now(),                         // simple unique id
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(), // readable date and time
  };
  notes.push(newNote);
  saveNotes(); // save after every change
  render();
}

function deleteNote(id) {
  // keep every note except the one with this id
  notes = notes.filter((note) => note.id !== id);
  saveNotes(); // save after every change
  render();
}

// ---------- 6. When the form is submitted ----------
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page reload
  const text = input.value.trim();

  // Validation
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Valid note: clear the error and add it
  errorMessage.textContent = "";
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

// ---------- 7. Search: redraw the list on every keystroke ----------
searchInput.addEventListener("input", render);

// ---------- 8. Draw once when the page loads ----------
render();
