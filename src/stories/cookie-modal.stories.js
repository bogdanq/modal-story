import React from 'react'
import { Button } from '@storybook/react/demo'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { ModalContext, Modal } from 'context-react-modal'
import { propTypes } from '../options/props-config'
import { CommonTemplate } from '../templates/common-modal'

const ModalWrapper = props => (
  <Modal {...props} labelText='do not show' cookie={{ name: 'modal_1' }}>
    {({ closeModal }) => (
      <>
        <h1>Some modal 1</h1>
        <Button onClick={closeModal}>Close modal</Button>
      </>
    )}
  </Modal>
)

const BaseComponent = () => {
  const { showModal } = React.useContext(ModalContext)

  return (
    <CommonTemplate title='Demo'>
      <Button onClick={() => showModal(props => <ModalWrapper {...props} />)}>
        open modal 1
      </Button>
      <Button
        onClick={() =>
          showModal(props => (
            <Modal
              {...props}
              labelComponent={Label}
              cookie={{ name: 'modal_2' }}
            >
              {({ closeModal }) => (
                <>
                  <h1>Some modal 2</h1>
                  <Button onClick={closeModal}>Close modal</Button>
                </>
              )}
            </Modal>
          ))
        }
      >
        open modal with custom label
      </Button>
    </CommonTemplate>
  )
}

const Label = ({ htmlFor, toogleCookie, ...props }) => {
  return (
    <div>
      <input {...props} onChange={toogleCookie} type='checkbox' />
      <label htmlFor={htmlFor}>do not show (custom component)</label>
    </div>
  )
}

const CustomLabelProps = `
  toogleCookie: (event: React.ChangeEvent<HTMLInputElement>) => void,
  id: string,
  name: string,
  htmlFor: string,
`

BaseComponent.__docgenInfo = {
  props: {
    ...propTypes,
    labelText: {
      type: {
        name: 'labelText?: string',
      },
      required: false,
      description: 'you label text',
      defaultValue: {
        value: 'Больше не показывать',
      },
    },
    cookie: {
      type: {
        name: 'cookie?: { name: string, maxAge?: number }',
      },
      required: false,
      description: 'the user has the option to hide modal (ms)',
    },
    labelComponent: {
      type: {
        name: `labelComponent?: (props: ${CustomLabelProps}) => React.ReactNode`,
      },
      required: false,
      description: 'You can pass your label component',
    },
    toogleCookie: {
      type: {
        name:
          'toogleCookie?: (cookie: { name: string, maxAge?: number}) => void',
      },
      required: false,
      description:
        'if you usage custom labelComponent, label will have props toogleCookie - function for label switching',
    },
  },
}

storiesOf('Modals', module).add(
  'cookie modal',
  withInfo({
    inline: true,
  })(() => <BaseComponent />),
  {
    info: {
      source: false,
      text: `
        ## - Usage
        ~~~jsx
        import React from 'react'
        import { ModalContext, Modal } from 'context-react-modal'

        const ModalWrapper = props => (
          <Modal {...props} labelText='do not show' cookie={{ name: 'modal_1' }}>
            {({ closeModal }) => (
              <>
                <h1>Some modal 1</h1>
                <button onClick={closeModal}>Close modal</button>
              </>
            )}
          </Modal>
        )

        const BaseComponent = () => {
          const { showModal } = React.useContext(ModalContext)
        
          return (
            <>
              <button onClick={() => showModal(props => <ModalWrapper {...props} />)}>
                open modal 1
              </button>
            </>
          )
        }
        ~~~
        ## - Usage with custom label
        ~~~jsx
        import React from 'react'
        import { ModalContext, Modal } from 'context-react-modal'

        const BaseComponent = () => {
          const { showModal } = React.useContext(ModalContext)
        
          return (
            <button
              onClick={() =>
                showModal(props => (
                  <Modal
                    {...props}
                    labelComponent={Label}
                    cookie={{ name: 'modal_2', maxAge: 100 * 60 * 60 }}
                  >
                    {({ closeModal }) => (
                      <>
                        <h1>Some modal 2</h1>
                        <button onClick={closeModal}>Close modal</button>
                      </>
                    )}
                  </Modal>
                ))
              }
            >
              open modal
            </button>
          )
        }
        
        const Label = ({ htmlFor, toogleCookie, ...props }) => {
          return (
            <div>
              <input {...props} onChange={toogleCookie} type='checkbox' />
              <label htmlFor={htmlFor}>do not show (custom component)</label>
            </div>
          )
        }
        
        ~~~
        `,
    },
  },
)
