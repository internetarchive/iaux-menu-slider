[![Build Status](https://travis-ci.com/internetarchive/iaux-donation-form.svg?branch=master)](https://travis-ci.com/internetarchive/iaux-menu-slider)
[![codecov](https://codecov.io/gh/internetarchive/iaux-donation-form/branch/master/graph/badge.svg)](https://codecov.io/gh/internetarchive/iaux-menu-slider)

# \<ia-menu-slider>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i @internetarchive/ia-menu-slider
```
or
```bash
yarn add @internetarchive/ia-menu-slider
```

## Usage
```html
<script type="module">
  import '@internetarchive/ia-menu-slider/ia-menu-slider.js';
</script>

<ia-menu-slider></ia-menu-slider>
```

Supply the element with an array of objects representing the menu items and
their submenu components. Each menu item can have these properties:

```js
{
  icon: html``, // The LitHtml literal to render within the menu button
  label: 'Label', // Screen reader label
  id: 'label', // Unique identifier used to track which menu item is selected
  component: html``, // The LitHtml literal to render to the submenu content element. Not needed if followable is true.
  followable: true, // Whether to follow the URL supplied in the href property. Optional.
  href: '#' // If followable is true, URL followed when menu button clicked
}
```

To toggle the menu open or closed, set the `open` property on the component.

## Styling

```css
ia-menu-slider {
  --menuButtonLabelDisplay: none;
  --menuSliderBg: #151515;
  --primaryTextColor: #fff;
  --menuWidth: 320px;
  --animationTiming: .25s;
  --iconFillColor: #fff;
  --iconStrokeColor: #fff;
  --activeButtonBg: #282828;
}
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
yarn lint
```

## Testing with Karma
To run the suite of karma tests, run
```bash
yarn test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
yarn test:watch
```

## Demoing with Storybook
To run a local instance of Storybook for your component, run
```bash
yarn storybook
```

To build a production version of Storybook, run
```bash
yarn storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`
```bash
yarn start
```
To run a local development server that serves the basic demo located in `demo/index.html`
