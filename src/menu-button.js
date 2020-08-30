import { ifDefined } from 'lit-html/directives/if-defined';
import { html, LitElement } from 'lit-element';
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
    `;
  }

  render() {
    return html`
      <a
        href="${ifDefined(this.href)}"
        class="menu-item ${this.buttonClass}"
        @click=${this.followable ? undefined : this.onClick}
      >
        ${this.menuItem}
      </a>
    `;
  }
}

customElements.define('menu-button', MenuButton);
