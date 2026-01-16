class FooterBar extends HTMLElement {
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
          background-color: var(--surface-color, #ffffff);
          color: var(--text-color, #333333);
          border-top: 1px solid var(--border-color, #cccccc);
          margin-top: 2rem;
        }
        .footer {
          padding: 20px;
          text-align: center;
          font-family: var(--font-family, sans-serif);
          font-size: 0.9rem;
        }
      </style>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Notes App. All rights reserved.
      </div>
    `;
  }
}

customElements.define("footer-bar", FooterBar);
