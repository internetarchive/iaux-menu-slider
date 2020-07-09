import { html, fixture, expect } from '@open-wc/testing';
import { IAMenuSlider } from '../src/ia-menu-slider.js';

customElements.define('ia-menu-slider', IAMenuSlider);

const container = (menus = []) => (
  html`<ia-menu-slider .menus=${menus}></ia-menu-slider>`
);

const menus = [{
  icon: html`<span id="icon-1"></span>`,
  label: 'Icon 1',
  id: 'menu-1',
  component: html`
    <h1>Menu 1</h1>
  `,
}, {
  icon: html`<b></b>`,
  label: 'Icon 2',
  id: 'menu-2',
  component: html`
    <h1>Menu 2</h1>
  `,
}, {
  icon: html`<i></i>`,
  label: 'Regular link',
  id: 'regular-link',
  followable: true,
  href: '#',
}];

describe('<ia-menu-slider>', () => {
  it('sets default properties', async () => {
    const el = await fixture(container(menus));

    expect(el.menus).to.equal(menus);
    expect(el.open).to.be.false;
    expect(el.selectedMenu).to.equal('');
  });

  it('sets the selected menu', async () => {
    const el = await fixture(container(menus));

    el.setSelectedMenu({ detail: { id: menus[0].id } });
    await el.updateComplete;

    expect(el.selectedMenu).to.equal(menus[0].id);
  });

  it('unsets the selected menu when existing selected menu toggled', async () => {
    const el = await fixture(container(menus));

    el.setSelectedMenu({ detail: { id: menus[0].id } });
    await el.updateComplete;

    el.setSelectedMenu({ detail: { id: menus[0].id } });
    await el.updateComplete;

    expect(el.selectedMenu).to.equal('');
  });

  it('returns open CSS class when menu is open', async () => {
    const el = await fixture(container(menus));

    el.open = true;
    await el.updateComplete;

    expect(el.sliderDetailsClass).to.equal('open');
  });

  it('returns open CSS class when menu is open', async () => {
    const el = await fixture(container(menus));

    el.selectedMenu = menus[0].id;
    await el.updateComplete;

    expect(el.selectedMenuClass).to.equal('open');
  });

  it('dispatches a "menuTypeSelected" event when a menu item clicked', async () => {
    const el = await fixture(container(menus));

    el
      .shadowRoot
      .querySelector('menu-button')
      .shadowRoot
      .querySelector('a')
      .click();

    await el.updateComplete;

    expect(el.selectedMenu).to.equal(menus[0].id);
  });

  it('renders menu item icons', async () => {
    const el = await fixture(container(menus));

    const icons = el
      .shadowRoot
      .querySelectorAll('menu-button');
    const icon1 = icons[0].shadowRoot.querySelector('#icon-1');
    const icon2 = icons[1].shadowRoot.querySelector('b');

    expect(icons).to.not.be.undefined;
    expect(icon1).to.not.be.undefined;
    expect(icon2).to.not.be.undefined;
  });

  it('renders the menu component when menu button clicked', async () => {
    const el = await fixture(container(menus));
    const h1 = await fixture(menus[0].component);

    el
      .shadowRoot
      .querySelector('menu-button')
      .shadowRoot
      .querySelector('a')
      .click();
    await el.updateComplete;
    const menuComponent = el
      .shadowRoot
      .querySelector('.content h1');

    expect(menuComponent).to.not.be.undefined;
    expect(menuComponent.innerText).to.equal(h1.innerText);
  });

  it('does not capture click events on menu items marked followable', async () => {
    const el = await fixture(container(menus));

    el
      .shadowRoot
      .querySelectorAll('menu-button')[2]
      .shadowRoot
      .querySelector('a')
      .click();
    await el.updateComplete;

    expect(el.selectedMenu).to.not.equal(menus[2].id);
  });
});
