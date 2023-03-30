class NoteApp {
  constructor() {
    this.btnEl = document.getElementById("btn");
    this.appEl = document.getElementById("app");
    this.btnEl.addEventListener("click", () => this.addNote());
    this.loadNotes();
  }

  loadNotes() {
    this.getNotes().forEach((note) => {
      const noteEl = this.createNoteEl(note.id, note.content);
      this.appEl.insertBefore(noteEl, this.btnEl);
    });
  }

  createNoteEl(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty Note";
    element.value = content;

    element.addEventListener("dblclick", () => {
      const warning = confirm("Do you want to delete this note?");
      if (warning) {
        this.deleteNote(id, element);
      }
    });

    element.addEventListener("input", () => {
      this.updateNote(id, element.value);
    });

    return element;
  }

  deleteNote(id, element) {
    const notes = this.getNotes().filter((note) => note.id !== id);
    this.saveNotes(notes);
    this.appEl.removeChild(element);
  }

  updateNote(id, content) {
    const notes = this.getNotes();
    const target = notes.find((note) => note.id === id);
    target.content = content;
    this.saveNotes(notes);
  }

  addNote() {
    const notes = this.getNotes();
    const noteObj = {
      id: Math.floor(Math.random() * 100000),
      content: "",
    };
    const noteEl = this.createNoteEl(noteObj.id, noteObj.content);
    this.appEl.insertBefore(noteEl, this.btnEl);

    notes.push(noteObj);
    this.saveNotes(notes);
  }

  saveNotes(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes));
  }

  getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");
  }
}

const noteApp = new NoteApp();
