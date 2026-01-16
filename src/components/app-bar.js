class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: var(--surface-color);
          color: var(--text-color);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--box-shadow);
        }
        .app-bar {
          padding: 20px;
          text-align: center;
        }
        h1 {
          margin: 0;
          font-family: var(--font-family);
          font-size: 1.5rem;
        }
      </style>
      <div class="app-bar">
        <h1>Notes App</h1>
      </div>
    `;
  }
}

customElements.define("app-bar", AppBar);
