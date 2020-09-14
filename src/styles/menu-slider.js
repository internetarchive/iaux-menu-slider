import { css } from 'lit-element';

const menuButtonWidth = css`42px`;

export default css`
  .menu {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--menuWidth);
    padding: .5rem;
    box-sizing: border-box;
    font-size: 1.4rem;
    color: var(--primaryTextColor);
    background: var(--menuSliderBg);
    transform: translateX(calc(var(--menuWidth) * -1));
    transition: transform var(--animationTiming) ease-in-out;
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

  header: {
    display: flex;
  }
  header * {
    margin: 0;
    display: inline-block;
  }

  header .details {
    width: 80%;
  }

  header .custom-action > *,
  header .close {
    padding: 0;
    background-color: transparent;
    border: 0;
    width: var(--iconWidth);
    height: var(--iconHeight);
  }

  header .custom-action,
  header .close {
    position: absolute;
  }
  header .close {
    right: 5px;
    margin: 0 2px 0 10px;
  }

  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: ${menuButtonWidth};
    z-index: 1;
    transform: translateX(calc(var(--menuWidth) * -1));
    transition: transform var(--animationTiming) ease-in-out;
    background: var(--activeButtonBg);
    border-right: 2px solid;
    border-color: var(--accentColor);
  }

  .open {
    transform: translateX(0);
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    background: var(--menuSliderBg);
  }
`;
