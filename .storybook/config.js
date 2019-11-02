import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { ModalRootProvider } from 'context-react-modal'
import { withPropsTable } from 'storybook-addon-react-docgen'
import { GlobalStyle } from '../src/global-style'

const req = require.context('../src', true, /\.stories\.(js|mdx)$/)

addDecorator(withPropsTable)
addDecorator(storyFn => (
  <ModalRootProvider>
    {storyFn()}
    <GlobalStyle />
  </ModalRootProvider>
))

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
