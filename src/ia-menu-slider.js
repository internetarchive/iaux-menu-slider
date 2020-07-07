import { LitElement, html } from 'lit-element';
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
      selected: { type: String },
    };
  }

  constructor() {
    super();

    this.menus = [];
    this.open = false;
    this.selected = '';
  }

  setSelectedMenu({ detail }) {
    const { id } = detail;
    this.selected = this.selected === id ? '' : id;
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
            .selected=${menu.id === this.selected}
            .followable=${menu.followable}
            .href=${menu.href}
          ></menu-button>
        </li>
      `
    ));
  }

  get selectedMenu() {
    const menuItem = this.menus.find(menu => menu.id === this.selected);
    return menuItem && menuItem.component ? menuItem.component : html``;
  }

  get sliderDetailsClass() {
    return this.open ? 'open' : 'closed';
  }

  get selectedMenuClass() {
    return this.selected ? 'open' : 'closed';
  }

  render() {
    return html`
      <div class="menu ${this.sliderDetailsClass}">
        <ul>
          ${this.menuItems}
        </ul>
        <div class="content ${this.selectedMenuClass}">
          ${this.selectedMenu}
        </div>
      </div>
    `;
  }
}
