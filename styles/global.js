import Theme from "./theme";
import { css } from "styled-components";

const styles = `
  #revealer {
    position: fixed;
    z-index: 101;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 19px;
    background-color: #1D1D1B;
    transition: opacity 0.8s ease;
    will-change: opacity;
  }
  #bordered {
    width: calc(100% - 40px);
    height: calc(100% - 42px);
    max-width: 1500px;
    margin: 0 auto;
    position: fixed;
    pointer-events: none;
    left: 20px;
    top: 20px;
    right: 20px;
    bottom: 20px;
    border-width: 17px;
    transform: scale(0.12);
    transition: transform 0.4s ease-out, border-width 0.3s ease-out;
    will-change: transform;
    overflow: hidden;
  }
  #bordered::before {
    content: " ";
    background-color: #44639E;
    width: 300%;
    height: 50px;
    position: absolute;
    transform: translateX(-50%);
    animation: shine 2s infinite ease-in-out;
    transition: opacity 0.1s ease;
    bottom:0;
  }
  .hidden::before {
    opacity: 0;
  }
  #logo {
    width: 40px;
    height: 35px;
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    transition: opacity 0.2s ease;
  }
  #logo circle{
    animation: look 3s infinite ease-in-out;
  }

  @keyframes look {
    0% {
      transform: translateX(0%);
    }
    30% {
      transform: translateX(-10%);
    }
    80% {
      transform: translateX(10%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  @keyframes shine {
    0% {
      transform: translateX(-100%);
    }
    30% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .page-transition-enter {
    opacity: 0;
  }
  .page-transition-enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in;
  }
  .page-transition-exit {
    opacity: 1;
  }
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity 200ms ease-out;
  }

  /* normalize */
  figure {
    margin: 0;
  }
  a {
    background-color: transparent;
  }
  img {
    border-style: none;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  button,
  input {
    overflow: visible;
  }
  button,
  select {
    text-transform: none;
  }
  [type="button"],
  [type="reset"],
  [type="submit"],
  button {
    -webkit-appearance: button;
  }
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner,
  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring,
  button:-moz-focusring {
    outline: 1px dotted ButtonText;
  }  

  html {
    font-size: 62.5%;
    height: 100vh;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-style: normal;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    color: ${Theme.colors.foreground};
    font-size: 1.8rem;
    background-color: ${Theme.colors.background};
    font-family: inherit;
    font-weight: inherit;
    min-height: 100vh;
    width: 100%;
    letter-spacing: 0.02px;
    overflow-x:hidden;
  }
  @media (max-width: 1000px), (max-height: 450px) {
    body {
      font-size: 1.7rem;
    }
  }

  #__next {
    height: 100%;
    width: 100%;
  }
  main {
    z-index: 0;
  }
  h1 {
    margin: 0;
    font-weight: inherit;
    font-size: 5rem;
    font-weight: 300;
  }
  h2 {
    margin: 0;
    font-weight: inherit;
    font-size: 4.65rem;
    font-weight: 400;    
  }
  h3 {
    font-size: 4.65rem;
    margin: 0px;
    font-weight: inherit;
  }
  p {
    margin: 0;
    line-height: 135%;
  }
  h4 {
    font-weight: inherit;
    margin: 0;
  }
  a {
    color: inherit;
  }
  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style:none;
  }
  button{
    padding: 14px 0%;
    margin: 4px 0;
    text-align: center;
    border: 0;
    font-size: 1.8rem;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s ease all;
  }
  b{
    font-weight:500;
  }
`;

function renderStyles() {
  return {
    __html: styles
      .replace(/(\r\n|\n|\r)/gm, "") // removes all new lines
      .replace(/ +(?= )/g, ""), // removes all multiple spaces (indenting)
    // .replace(/.}/g, "}\n") // adds new line after every } charracter
  };
}

export default () => <style dangerouslySetInnerHTML={renderStyles()} />;
