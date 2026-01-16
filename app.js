import "./src/components/app-bar.js";
import "./src/components/note-input.js";
import "./src/components/note-item.js";
import notesData from "./notes.js";

const notesListElement = document.getElementById("notes-list");
const STORAGE_KEY = "NOTES_APP_CUSTOM";
let customNotes = [];
let allNotes = [];

function init() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    customNotes = JSON.parse(storedData);
  }

  updateAllNotes();
}

function updateAllNotes() {
  allNotes = [...customNotes, ...notesData];
  renderNotes(allNotes);
}

function saveCustomNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customNotes));
}

function renderNotes(notes) {
  notesListElement.innerHTML = "";
  notes.forEach((note) => {
    const noteElement = document.createElement("note-item");
    noteElement.setAttribute("id", note.id);
    noteElement.setAttribute("title", note.title);
    noteElement.setAttribute("body", note.body);
    noteElement.setAttribute("date", note.createdAt);
    notesListElement.appendChild(noteElement);
  });
}

document.addEventListener("note-submitted", (event) => {
  const newNote = event.detail;
  customNotes.unshift(newNote);
  saveCustomNotes();
  updateAllNotes();
});

document.addEventListener("delete-note", (event) => {
  const noteId = event.detail.id;

  const customIndex = customNotes.findIndex((n) => n.id === noteId);
  if (customIndex !== -1) {
    customNotes.splice(customIndex, 1);
    saveCustomNotes();
  }

  const defaultIndex = notesData.findIndex((n) => n.id === noteId);
  if (defaultIndex !== -1) {
    notesData.splice(defaultIndex, 1);
  }

  updateAllNotes();
});

init();
