import { nothing } from 'lit-html';
import { LitElement, html } from 'lit-element';
import menuSliderCSS from './styles/menu-slider.js';
import '@internetarchive/icon-collapse-sidebar/icon-collapse-sidebar.js';
import './menu-button.js';

const sliderEvents = {
  closeDrawer: 'menuSliderClosed',
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
      animateMenuOpen: { type: Boolean },
      manuallyHandleClose: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.menus = [];
    this.open = false;
    this.selectedMenu = '';
    this.animateMenuOpen = false;
    this.manuallyHandleClose = true;
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
    if (!this.manuallyHandleClose) {
      this.open = false;
    }
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
    const animate = this.animateMenuOpen ? 'animate' : '';
    const state = this.open ? 'open' : '';
    return `${animate} ${state}`;
  }

  get selectedMenuClass() {
    return this.selectedMenu ? 'open' : '';
  }

  get menuItems() {
    return this.menus.map(menu => (
      html`
        <li>
          <menu-button
            @menuTypeSelected=${this.setSelectedMenu}
            .icon=${menu.icon}
            .label=${menu.label}
            .menuDetails=${menu.menuDetails}
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
    const { label = '', menuDetails = '', actionButton } = this.selectedMenuDetails || {};
    const actionSection = actionButton
      ? html`<div class="custom-action">${actionButton}</div>`
      : nothing;
    const headerClass = actionButton ? 'with-secondary-action' : '';

    return html`
      <header class="${headerClass}">
        <div class="details">
          <h3>${label}</h3>
          <span class="extra-details">${menuDetails}</span>
        </div>
        ${actionSection}
        ${this.closeButton}
      </header>
    `;
  }

  get closeButton() {
    return html`
      <button class="close" aria-label="Close this menu" @click=${this.closeMenu}>
        <ia-icon-collapse-sidebar></ia-icon-collapse-sidebar>
      </button>
    `;
  }

  /** @inheritdoc */
  render() {
    return html`
      <div class="main">
      <div class="menu ${this.sliderDetailsClass}">
        ${this.closeButton}
        <ul class="menu-list">
          ${this.menuItems}
        </ul>
        <div class="content ${this.selectedMenuClass}" @menuTypeSelected=${this.setSelectedMenu}>
          ${this.renderMenuHeader}
          <section>
            <div class="selected-menu">
              ${this.selectedMenuComponent}
            </div>
          </section>
        </div>
      </div>
      </div>
    `;
  }
}
