import { css } from 'lit-element';

const menuButtonWidth = css`42px`;
const sliderWidth = css`var(--menuWidth, 320px)`;
const transitionTiming = css`var(--animationTiming, 200ms)`;

export default css`

  .main {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .menu {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${sliderWidth};
    padding: .5rem .5rem 0 0;
    box-sizing: border-box;
    font-size: 1.4rem;
    color: var(--primaryTextColor);
    background: var(--menuSliderBg);
    transform: translateX(calc(${sliderWidth} * -1));
    transition: transform ${transitionTiming} ease-out;
  }
  .menu:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: ${menuButtonWidth};
    content: "";
    background: var(--menuSliderBg);
  }

  .menu > button.close {
    right: 0.7rem;
  }

  button {
    outline: none;
    cursor: pointer;
  }

  header {
    margin: 0 0 .5rem 0;
  }

  header * {
    margin: 0;
    display: inline-block;
  }
  header button {
    outline: none;
    cursor: pointer;
  }

  header.with-secondary-action .details {
    width: 80%;
  }

  header .details {
    font-weight: bold;
    width: 88%;
  }

  header .custom-action > *,
  button.close {
    padding: 0;
    background-color: transparent;
    border: 0;
    --iconWidth: var(--menuSliderHeaderIconWidth);
    --iconHeight: var(--menuSliderHeaderIconHeight);
  }

  header .custom-action,
  button.close {
    position: absolute;
  }
  button.close {
    right: .5rem;
  }

  button.close * {
    float: right;
  }

  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: ${menuButtonWidth};
    z-index: 1;
    transform: translateX(calc(${sliderWidth} * -1));
    transition: transform ${transitionTiming} ease-out;
    background: var(--activeButtonBg);
    border-right: .2rem solid;
    border-color: var(--subpanelRightBorderColor);
    padding: .5rem 0 0 .5rem;
  }

  .open {
    transform: translateX(0);
  }

  .menu-list {
    padding: 0;
    margin: 0;
    list-style: none;
    background: var(--menuSliderBg);
  }
  .menu-list li {
    margin-bottom: .2rem;
  }

  .content section {
    height: 96%;
    position: relative;
    width: 100%;
    padding-bottom: 4%;
  }

  .content .selected-menu {
    overflow: auto;
    position: absolute;
    top: 0;
    width: 100%;
    padding-bottom: 2rem;
    height: inherit;
  }

  .content .selected-menu > * {
    display: block;
    padding-bottom: 3rem;
  }
`;
