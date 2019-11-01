import React from "react";
import styled from "styled-components";

export const CommonTemplate = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  border: 1px solid #e5e5e5;
  padding: 10px;
`;
