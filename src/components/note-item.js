class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["id", "title", "body", "date"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        this.dispatchEvent(
          new CustomEvent("delete-note", {
            detail: { id: this.getAttribute("id") },
            bubbles: true,
            composed: true,
          })
        );
      }
    });
  }

  formatDate(dateString) {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  render() {
    const title = this.getAttribute("title") || "No Title";
    const body = this.getAttribute("body") || "No Content";
    const date = this.formatDate(this.getAttribute("date"));

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          height: auto; 
          min-height: 120px;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        :host(:hover) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        .note-content {
          padding: 20px;
          padding-bottom: 40px; 
          flex-grow: 1;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
          padding-right: 24px; 
        }
        h3 {
          margin: 0;
          color: var(--text-color);
          font-family: var(--font-family);
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.4;
        }
        .date {
          font-size: 0.75rem;
          color: var(--text-secondary);
          position: absolute;
          bottom: 12px;
          right: 20px;
          font-weight: 500;
        }
        p {
          color: var(--text-secondary);
          line-height: 1.6;
          font-family: var(--font-family);
          font-size: 0.9rem;
          margin: 0;
        }
        .delete-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          color: var(--error-color);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0 5px;
          line-height: 1;
          opacity: 0.6;
          transition: opacity 0.2s;
        }
        .delete-btn:hover {
          opacity: 1;
        }
      </style>
      <div class="note-content">
        <button class="delete-btn" title="Delete Note">&times;</button>
        <div class="header">
          <h3>${title}</h3>
        </div>
        <p>${body}</p>
        <span class="date">${date}</span>
      </div>
    `;
  }
}
customElements.define("note-item", NoteItem);
