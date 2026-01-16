class NoteInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.shadowRoot.querySelector("form");
    const titleInput = this.shadowRoot.querySelector("#title");
    const bodyInput = this.shadowRoot.querySelector("#body");

    const validateInput = (input, errorId) => {
      const errorElement = this.shadowRoot.querySelector(`#${errorId}`);
      if (input.validity.valueMissing) {
        errorElement.textContent = "This field is required.";
        input.classList.add("error");
      } else {
        errorElement.textContent = "";
        input.classList.remove("error");
      }
    };

    titleInput.addEventListener("input", () =>
      validateInput(titleInput, "title-error")
    );
    bodyInput.addEventListener("input", () =>
      validateInput(bodyInput, "body-error")
    );

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = titleInput.value;
      const body = bodyInput.value;

      if (!title || !body) {
        validateInput(titleInput, "title-error");
        validateInput(bodyInput, "body-error");
        return;
      }

      const note = {
        id: `note-${Date.now()}`,
        title: title,
        body: body,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      this.dispatchEvent(
        new CustomEvent("note-submitted", {
          detail: note,
          bubbles: true,
          composed: true,
        })
      );

      form.reset();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 600px;
          background: var(--surface-color);
          padding: 24px;
          border-radius: var(--border-radius);
        }
        h2 {
          margin-top: 0;
          margin-bottom: 20px;
          color: var(--text-color);
          text-align: center;
          font-family: var(--font-family);
        }
        .form-group {
          margin-bottom: 16px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--text-color);
          font-family: var(--font-family);
        }
        input, textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          font-family: var(--font-family);
          font-size: 1rem;
          color: var(--text-color);
          box-sizing: border-box; 
          resize: vertical;
        }
        input:focus, textarea:focus {
          border-color: var(--primary-color);
          outline: none;
        }
        .error-message {
          color: var(--error-color);
          font-size: 0.8rem;
          margin-top: 4px;
          height: 1.2em; 
        }
        input.error, textarea.error {
          border-color: var(--error-color);
        }
        button {
          width: 100%;
          padding: 12px;
          background-color: var(--surface-color);
          border: 1px solid var(--border-color);
          color: var(--text-color);
          border-radius: var(--border-radius);
          font-size: 1rem;
          cursor: pointer;
          font-family: var(--font-family);
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #f8f9fa;
        }
      </style>
      <h2>Add New Note</h2>
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" name="title" placeholder="Enter note title..." required>
          <div id="title-error" class="error-message"></div>
        </div>
        <div class="form-group">
          <label for="body">Description</label>
          <textarea id="body" name="body" rows="5" placeholder="Enter note description..." required></textarea>
          <div id="body-error" class="error-message"></div>
        </div>
        <button type="submit">Add Note</button>
      </form>
    `;
  }
}

customElements.define("note-input", NoteInput);
