
const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");

// Get notes from localStorage
function getNotes() {
    const data = localStorage.getItem("notes");
    return data ? JSON.parse(data) : [];
}

// Save notes to localStorage
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Display all notes
function renderNotes() {
    const notes = getNotes();
    notesList.innerHTML = "";

    notes.forEach(function(note) {
        const card = document.createElement("div");
        card.className = "note-card";

        const text = document.createElement("p");
        text.textContent = note.text;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", function() {
            const newText = prompt("Edit your note:", note.text);

            if (newText !== null && newText.trim() !== "") {
                const updatedNotes = getNotes();
                const index = updatedNotes.findIndex(
                    item => item.id === note.id
                );

                if (index !== -1) {
                    updatedNotes[index].text = newText.trim();
                    updatedNotes[index].updatedAt =
                        new Date().toISOString();

                    saveNotes(updatedNotes);
                    renderNotes();
                }
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function() {
            if (confirm("Are you sure you want to delete this note?")) {
                const updatedNotes = getNotes().filter(
                    item => item.id !== note.id
                );

                saveNotes(updatedNotes);
                renderNotes();
            }
        });

        card.appendChild(text);
        card.appendChild(editBtn);
        card.appendChild(deleteBtn);
        notesList.appendChild(card);
    });
}

// Add a new note
function addNote() {
    const text = noteInput.value.trim();

    if (text === "") {
        alert("Please enter a note!");
        return;
    }

    const notes = getNotes();

    const newNote = {
        id: Date.now(),
        text: text,
        createdAt: new Date().toISOString(),
        updatedAt: null
    };

    notes.push(newNote);
    saveNotes(notes);

    noteInput.value = "";
    renderNotes();
}

// Add button click event
addBtn.addEventListener("click", addNote);

// Allow Enter key to add a note
noteInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addNote();
    }
});

// Display saved notes when the page loads
renderNotes();
