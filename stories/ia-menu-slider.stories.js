import {
  html,
  storiesOf,
  withKnobs,
  color,
  text,
  withClassPropertiesKnobs,
} from '@open-wc/demoing-storybook';

import { IAMenuSlider } from '../index.js';

customElements.define('ia-menu-slider', IAMenuSlider);

storiesOf('<ia-menu-slider>', module)
  .addDecorator(withKnobs)
  .add('Options', () => withClassPropertiesKnobs(IAMenuSlider))
  .add('Styling', () => (
    html`
      <style>
        ia-menu-slider {
          --menuSliderBg: ${color('Menu background', '#151515')};
          --primaryTextColor: ${color('Text color', '#fff')};
          --menuWidth: ${text('Menu width', 320)}px;
          --animationTiming: ${text('Animation duration', 0.25)}s;
          --iconFillColor: ${color('Icon fill color', '#fff')};
          --iconStrokeColor: ${color('Icon stroke color', '#fff')};
          --activeButtonBg: ${color('Active button BG', '#282828')};
        }

        html {
          font: normal 10px "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        body {
          margin: 0;
        }
      </style>
      <ia-menu-slider></ia-menu-slider>
    `
  ));
