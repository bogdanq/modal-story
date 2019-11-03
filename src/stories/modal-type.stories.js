import React from 'react'
import { Button } from '@storybook/react/demo'
import { storiesOf } from '@storybook/react'
import { css } from 'styled-components'
import { withInfo } from '@storybook/addon-info'
import { ModalContext, Modal } from 'context-react-modal'
import { propTypes } from '../options/props-config'
import { CommonTemplate } from '../templates/common-modal'

const modalTypes = ['danger', 'success', 'primary']

const BaseComponent = () => {
  const { showModal } = React.useContext(ModalContext)

  return (
    <CommonTemplate title='Demo'>
      {modalTypes.map(type => (
        <Button
          onClick={() =>
            showModal(props => (
              <Modal {...props} type={type}>
                {() => <h1>Modal type: {type}</h1>}
              </Modal>
            ))
          }
        >
          open modal ({type})
        </Button>
      ))}
      <h1>Custom style</h1>
      {modalTypes.map(type => (
        <Button
          onClick={() =>
            showModal(props => (
              <Modal {...props} customTypeStyles={customModalType} type={type}>
                {() => <h1>Modal custom style type: {type}</h1>}
              </Modal>
            ))
          }
        >
          open custom type modal ({type})
        </Button>
      ))}
    </CommonTemplate>
  )
}

const customModalType = {
  danger: css`
    background: #f37b7b;
  `,
  success: css`
    background: blueviolet;
  `,
  primary: css`
    background: orange;
  `,
}

const modalType = `
  danger: FlattenInterpolation |
  success: FlattenInterpolation |
  primary: FlattenInterpolation |
  ...
  and you type
`

BaseComponent.__docgenInfo = {
  props: {
    ...propTypes,
    type: {
      type: {
        name: `type?: ${modalTypes.map(name => ` ${name}`)}`,
      },
      required: false,
      description: 'modal type',
    },
    customTypeStyles: {
      type: {
        name: `customTypeStyles?: ${modalType}`,
      },
      required: false,
      description: 'you custom style for modal types',
    },
  },
}
storiesOf('Modals', module).add(
  'modal type',
  withInfo({
    inline: true,
    source: false,
  })(() => <BaseComponent />),
  {
    info: {
      text: `
        ## - Usage
        ~~~jsx
        import React from 'react'
        import { css } from 'styled-components'
        import { ModalContext, Modal } from 'context-react-modal'

        const BaseComponent = () => {
          const { showModal } = React.useContext(ModalContext)
        
          return (
            <>
              <button
                onClick={() =>
                  showModal(props => (
                    <Modal {...props} type="success">
                      {({ closeModal }) => (
                        <>
                          <h1>Modal type: success</h1>
                          <button onClick={closeModal}>Close modal</button>
                        </>
                      )}
                    </Modal>
                  ))
                }
              >
                open modal
              </button>

              <h1>Custom style</h1>
              <button
                onClick={() =>
                  showModal(props => (
                    <Modal {...props} customTypeStyles={customModalType} type="success">
                      {({ closeModal }) => (
                        <>
                          <h1>Modal type: success</h1>
                          <button onClick={closeModal}>Close modal</button>
                        </>
                      )}
                    </Modal>
                  ))
                }
              >
                open modal custom type
              </button>
            </>
          )
        }

        const customModalType = {
          danger: css\`
            background: #f37b7b;
          \`,
          success: css\`
            background: blueviolet;
          \`,
          primary: css\`
            background: orange;
          \`,
        }
        ~~~
        `,
    },
  },
)
