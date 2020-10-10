import { css } from 'lit-element';

const menuButtonWidth = css`42px`;

export default css`

  @media (max-width: 500px) {
    .menu.open {
      width: 100%;
    }
  }
  .menu {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--menuWidth);
    padding: .5rem .5rem .5rem 0;
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

  header {
    margin: .2rem 0 .5rem 0;
  }

  header * {
    margin: 0;
    display: inline-block;
  }
  header button {
    outline: none;
    cursor: pointer;
  }

  .with-secondary-action header .details {
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
    width: var(--headerIconHeight);
    height: var(--headerIconHeight);
  }

  header .custom-action,
  button.close {
    position: absolute;
  }
  button.close {
    right: .5rem;
    --iconWidth: var(--headerIconWidth);
    --iconHeight: var(--headerIconHeight);
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
    transform: translateX(calc(100% * -1));
    transition: transform var(--animationTiming) ease-in-out;
    background: var(--activeButtonBg);
    border-right: .2rem solid;
    border-color: var(--subpanelRightBorderColor);
    padding: .5rem 0 .5rem .5rem;
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
    margin-bottom: 2px;
  }

  .content .selected-menu {
    margin: 0.8rem 0px 0px;
    padding-bottom: 3rem;
    overflow: auto;
    position: absolute;
    width: 98%;
    height: 90%;
  }
`;
