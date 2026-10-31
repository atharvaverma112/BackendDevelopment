
// Get notes from localStorage
function getNotes() {
    const data = localStorage.getItem("notes");
    return data ? JSON.parse(data) : [];
}

// Save notes in localStorage
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to add a new note
function addNote() {
    let noteInput = document.getElementById("noteInput");
    let noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please enter a note!");
        return;
    }

    let notes = getNotes();

    let note = {
        id: Date.now(),
        text: noteText,
        createdAt: new Date().toISOString(),
        updatedAt: null
    };

    notes.push(note);
    saveNotes(notes);
    displayNotes();

    noteInput.value = "";
}

// Function to display notes
function displayNotes() {
    let notesList = document.getElementById("notesList");
    let notes = getNotes();

    notesList.innerHTML = "";

    notes.forEach(function(note) {
        let noteElement = document.createElement("div");

        noteElement.style.backgroundColor = "#e9ecef";
        noteElement.style.padding = "10px";
        noteElement.style.marginTop = "10px";
        noteElement.style.borderRadius = "5px";

        // Display note text
        let noteText = document.createElement("p");
        noteText.textContent = note.text;

        // Display creation and update dates
        let dateInfo = document.createElement("small");

        dateInfo.textContent =
            "Created: " + new Date(note.createdAt).toLocaleString() +
            " | Updated: " +
            (note.updatedAt
                ? new Date(note.updatedAt).toLocaleString()
                : "Not edited");

        // Create Edit button
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.onclick = function() {
            editNote(note.id);
        };

        // Create Delete button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {
            deleteNote(note.id);
        };

        noteElement.appendChild(noteText);
        noteElement.appendChild(dateInfo);
        noteElement.appendChild(document.createElement("br"));
        noteElement.appendChild(editButton);
        noteElement.appendChild(deleteButton);

        notesList.appendChild(noteElement);
    });
}

// Function to edit a note
function editNote(id) {
    let notes = getNotes();

    let note = notes.find(function(item) {
        return item.id === id;
    });

    if (note) {
        let newText = prompt("Edit your note:", note.text);

        if (newText !== null && newText.trim() !== "") {
            note.text = newText.trim();
            note.updatedAt = new Date().toISOString();

            saveNotes(notes);
            displayNotes();
        }
    }
}

// Function to delete a note
function deleteNote(id) {
    let notes = getNotes();

    notes = notes.filter(function(note) {
        return note.id !== id;
    });

    saveNotes(notes);
    displayNotes();
}

// Display saved notes when page loads
window.onload = displayNotes;
