import { css, createGlobalStyle } from 'styled-components'

const GlobalStyled = css`
  h4 {
    color: #7f807c;
    padding: 10px 0 15px 15px !important;
    font-style: italic;
    position: relative;
  }
  h2 {
    padding: 15px 0 !important;
  }
  .hljs-comment,
  .hljs-quote {
    color: #7e7887;
  }
  .hljs-variable,
  .hljs-template-variable,
  .hljs-attribute,
  .hljs-regexp,
  .hljs-link,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class {
    color: #be4678;
  }
  .hljs-number,
  .hljs-meta,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params {
    color: #aa573c;
  }
  .hljs-string,
  .hljs-symbol,
  .hljs-bullet {
    color: #2a9292;
  }
  .hljs-title,
  .hljs-section {
    color: #576ddb;
  }
  .hljs-keyword,
  .hljs-selector-tag {
    color: #955ae7;
  }
  .hljs-deletion,
  .hljs-addition {
    color: #19171c;
    display: inline-block;
    width: 100%;
  }
  .hljs-deletion {
    background-color: #be4678;
  }
  .hljs-addition {
    background-color: #2a9292;
  }
  .hljs {
    display: block;
    overflow-x: auto;
    color: #000;
    padding: 0.5em;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: bold;
  }
`

export const GlobalStyle = createGlobalStyle`${GlobalStyled}`
