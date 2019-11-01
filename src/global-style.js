import { css, createGlobalStyle } from "styled-components";

const GlobalStyled = css`
  h4 {
    color: #7f807c;
    padding: 10px 0 15px 15px !important;
    font-style: italic;
    position: relative;
  }
`;

export const GlobalStyle = createGlobalStyle`${GlobalStyled}`;
