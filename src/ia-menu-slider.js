import { nothing } from 'lit/html.js';
import { LitElement, html } from 'lit';
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
      manuallyHandleClose: { type: Boolean },
      selectedMenu: { type: String },
      selectedMenuAction: { type: Object },
      animateMenuOpen: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.menus = [];
    this.open = false;
    this.selectedMenu = '';
    this.selectedMenuAction = nothing;
    this.animateMenuOpen = false;
    this.manuallyHandleClose = false;
  }

  updated() {
    const { actionButton } = this.selectedMenuDetails || {};
    const actionButtonHasChanged = actionButton !== this.selectedMenuAction;
    if (actionButtonHasChanged) {
      this.selectedMenuAction = actionButton || nothing;
    }
  }

  /**
   * Event handler, captures state of selected menu
   * @param { CustomEvent } event
   */
  setSelectedMenu({ detail }) {
    const { id } = detail;
    this.selectedMenu = this.selectedMenu === id ? '' : id;
    const { actionButton } = this.selectedMenuDetails || {};
    this.selectedMenuAction = actionButton || nothing;
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
    const selectedMenu = this.menus.find(menu => menu.id === this.selectedMenu);
    return selectedMenu;
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
    const { label = '', menuDetails = '' } = this.selectedMenuDetails || {};
    const headerClass = this.selectedMenuAction ? 'with-secondary-action' : '';
    const actionBlock = this.selectedMenuAction
      ? html`<span class="custom-action">${this.selectedMenuAction}</span>`
      : nothing;
    return html`
      <header class="${headerClass}">
        <div class="details">
          <h3>${label}</h3>
          <span class="extra-details">${menuDetails}</span>
        </div>
        ${actionBlock}
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

window.customElements.define('ia-menu-slider', IAMenuSlider);
