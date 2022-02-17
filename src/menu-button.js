import { html, LitElement } from 'lit';
import menuButtonCSS from './styles/menu-button.js';

class MenuButton extends LitElement {
  static get styles() {
    return menuButtonCSS;
  }

  static get properties() {
    return {
      icon: { type: String },
      href: { type: String },
      label: { type: String },
      menuDetails: { type: String },
      id: { type: String },
      selected: { type: Boolean },
      followable: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.icon = '';
    this.href = '';
    this.label = '';
    this.menuDetails = '';
    this.id = '';
    this.selected = false;
    this.followable = false;
  }

  onClick(e) {
    e.preventDefault();
    this.dispatchMenuTypeSelectedEvent();
  }

  dispatchMenuTypeSelectedEvent() {
    this.dispatchEvent(new CustomEvent('menuTypeSelected', {
      bubbles: true,
      composed: true,
      detail: {
        id: this.id,
      },
    }));
  }

  get buttonClass() {
    return this.selected ? 'selected' : '';
  }

  get iconClass() {
    return this.selected ? 'active' : '';
  }

  get menuItem() {
    return html`
      <span class="icon ${this.iconClass}">
        ${this.icon}
      </span>
      <span class="label">${this.label}</span>
      <span class="menu-details">${this.menuDetails}</span>
    `;
  }

  get linkButton() {
    return html`
      <a
        href="${this.href}"
        class="menu-item ${this.buttonClass}"
        @click=${this.followable ? undefined : this.onClick}
      >${this.menuItem}</a>
    `;
  }

  get clickButton() {
    return html`
      <button
        class="menu-item ${this.buttonClass}"
        @click=${this.onClick}
      >
        ${this.menuItem}
      </button>
  `;
  }

  render() {
    return this.href ? this.linkButton : this.clickButton;
  }
}

customElements.define('menu-button', MenuButton);
