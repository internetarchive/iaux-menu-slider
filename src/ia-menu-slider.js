import { nothing } from 'lit-html';
import { LitElement, html } from 'lit-element';
import menuSliderCSS from './styles/menu-slider.js';
import '@internetarchive/icon-collapse-sidebar/icon-collapse-sidebar.js';
import './menu-button.js';

const sliderEvents = {
  closeDrawer: 'ItemNavMenuClosed',
};
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

  /**
   * Event handler, captures state of selected menu
   * @param { CustomEvent } event
   */
  setSelectedMenu({ detail }) {
    const { id } = detail;
    this.selectedMenu = this.selectedMenu === id ? '' : id;
  }

  /**
   * closes menu drawer
   */
  closeMenu() {
    this.open = false;
    const { closeDrawer } = sliderEvents;
    const drawerClosed = new CustomEvent(closeDrawer, {
      detail: this.selectedMenuDetails,
    });
    this.dispatchEvent(drawerClosed);
  }

  get selectedMenuDetails() {
    return this.menus.find(menu => menu.id === this.selectedMenu);
  }

  get selectedMenuComponent() {
    const menuItem = this.selectedMenuDetails;
    return menuItem && menuItem.component ? menuItem.component : html``;
  }

  /* render */

  get sliderDetailsClass() {
    return this.open ? 'open' : 'closed';
  }

  get selectedMenuClass() {
    return this.selectedMenu ? 'open' : 'closed';
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

  get renderMenuHeader() {
    const { title = '', menuDetails = '', actionButton } = this.selectedMenuDetails || {};
    const actionSection = actionButton
      ? html`<div class="custom-action">${actionButton}</div>`
      : nothing;

    return html`
      <header>
        <div class="details">
          <h3>${title}</h3>
          <span class="extra-details">${menuDetails}</span>
        </div>
        ${actionSection}
        <button class="close" aria-label="Close this menu" @click=${this.closeMenu}>
          <ia-icon-collapse-sidebar
            style="--iconWidth: var(--closeIconWidth); --iconHeight: var(--closeIconHeight);"
          ></ia-icon-collapse-sidebar>
        </button>
      </header>
    `;
  }

  /** @inheritdoc */
  render() {
    return html`
      <div class="menu ${this.sliderDetailsClass}">
        <ul>
          ${this.menuItems}
        </ul>
        <div class="content ${this.selectedMenuClass}" @menuTypeSelected=${this.setSelectedMenu}>
          ${this.renderMenuHeader}
          ${this.selectedMenuComponent}
        </div>
      </div>
    `;
  }
}
