import { nothing } from 'lit-html';
import { LitElement, html } from 'lit-element';
import '@internetarchive/ia-icons/ia-icon';
import menuSliderCSS from './styles/menu-slider.js';
import './menu-button.js';

export class IAMenuSlider extends LitElement {
  static get styles() {
    return menuSliderCSS;
  }

  static get properties() {
    return {
      menus: { type: Array },
      open: { type: Boolean },
      selectedMenu: { type: String },
    };
  }

  constructor() {
    super();

    this.menus = [];
    this.open = false;
    this.selectedMenu = '';
  }

  setSelectedMenu({ detail }) {
    const { id } = detail;
    this.selectedMenu = this.selectedMenu === id ? '' : id;
  }

  closeMenu() {
    this.selectedMenu = '';
    this.open = false;
  }

  handleCloseClick(e) {
    e.preventDefault();
    this.closeMenu();
    this.dispatchEvent(new CustomEvent('menuSliderClosed', {
      bubbles: true,
      composed: true,
    }));
  }

  get menuItems() {
    return this.menus.map(menu => (
      html`
        <li>
          <menu-button
            @menuTypeSelected=${this.setSelectedMenu}
            .icon=${menu.icon}
            .label=${menu.label}
            .id=${menu.id}
            .selected=${menu.id === this.selectedMenu}
            .followable=${menu.followable}
            .href=${menu.href}
          ></menu-button>
        </li>
      `
    ));
  }

  get selectedMenuComponent() {
    const menuItem = this.menus.find(menu => menu.id === this.selectedMenu);
    return menuItem && menuItem.component ? menuItem.component : html``;
  }

  get sliderDetailsClass() {
    return this.open ? 'open' : 'closed';
  }

  get selectedMenuClass() {
    return this.selectedMenu ? 'open' : 'closed';
  }

  get closeAction() {
    const menuItem = this.menus.find(menu => menu.id === this.selectedMenu);
    if (!menuItem) { return nothing; }
    return menuItem.renderCloseAction !== false
      ? html`<a
        class="close"
        href="#"
        @click=${this.handleCloseClick}
      >
        <ia-icon icon="collapseSidebar"></ia-icon>
      </a>`
      : nothing;
  }

  render() {
    return html`
      <div class="menu ${this.sliderDetailsClass}">
        <ul>
          ${this.menuItems}
        </ul>
        <div class="content ${this.selectedMenuClass}" @menuTypeSelected=${this.setSelectedMenu} @closeMenu=${this.closeMenu}>
          ${this.closeAction}
          <div class="submenu">
            ${this.selectedMenuComponent}
          </div>
        </div>
      </div>
    `;
  }
}
