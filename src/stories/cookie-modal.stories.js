import React from 'react'
import { Button } from '@storybook/react/demo'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { ModalContext, Modal } from 'context-react-modal'
import { propTypes } from '../options/props-config'
import { CommonTemplate } from '../templates/common-modal'

const BaseComponent = () => {
  const { showModal } = React.useContext(ModalContext)

  return (
    <CommonTemplate>
      <Button
        onClick={() =>
          showModal(params => (
            <Modal
              {...params}
              labelText='do not show'
              cookie={{ name: 'modal_1' }}
            >
              {() => <h1>Some modal 1</h1>}
            </Modal>
          ))
        }
      >
        open modal_1
      </Button>
      <Button
        onClick={() =>
          showModal(params => (
            <Modal
              {...params}
              labelComponent={Label}
              cookie={{ name: 'modal_2' }}
            >
              {() => <h1>Some modal 2</h1>}
            </Modal>
          ))
        }
      >
        open modal with custom label
      </Button>
    </CommonTemplate>
  )
}

const Label = ({ htmlFor, toogleCookie, ...params }) => {
  return (
    <div>
      <input {...params} onChange={toogleCookie} type='checkbox' />
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
        #### - Usage
        ~~~jsx
        import React from 'react'
        import { ModalContext, Modal } from 'context-react-modal'

        const BaseComponent = () => {
          const { showModal } = React.useContext(ModalContext)
        
          return (
            <>
              <Button
                onClick={() =>
                  showModal(params => (
                    <Modal
                      {...params}
                      labelText='do not show'
                      cookie={{ name: 'modal_1' }}
                    >
                      {() => <h1>Some modal 1</h1>}
                    </Modal>
                  ))
                }
              >
                open modal 1
              </Button>
            </>
          )
        }
        ~~~
        #### - Usage with custom label
        ~~~jsx
        import React from 'react'
        import { ModalContext, Modal } from 'context-react-modal'

        const BaseComponent = () => {
          const { showModal } = React.useContext(ModalContext)
        
          return (
            <Button
              onClick={() =>
                showModal(params => (
                  <Modal
                    {...params}
                    labelComponent={Label}
                    cookie={{ name: 'modal_2' }}
                  >
                    {() => <h1>Some modal 2</h1>}
                  </Modal>
                ))
              }
            >
              open modal with custom label
            </Button>
          )
        }
        
        const Label = ({ htmlFor, toogleCookie, ...params }) => {
          return (
            <div>
              <input {...params} onChange={toogleCookie} type='checkbox' />
              <label htmlFor={htmlFor}>do not show (custom component)</label>
            </div>
          )
        }
        
        ~~~
        `,
    },
  },
)
