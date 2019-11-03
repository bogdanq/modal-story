import React from 'react'
import { Button } from '@storybook/react/demo'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { ModalContext, Modal } from 'context-react-modal'
import { propTypes } from '../options/props-config'
import { CommonTemplate } from '../templates/common-modal'

const ModalWrapper = ({ closeTimeout, ...props }) => {
  return (
    <Modal closeTimeout={closeTimeout} {...props}>
      {({ closeModal }) => {
        return (
          <>
            <h1>Close timeout modal</h1>
            <Button onClick={closeModal}>Close</Button>
          </>
        )
      }}
    </Modal>
  )
}

const BaseComponent = () => {
  const { showModal } = React.useContext(ModalContext)
  const timers = [400, 1000, 1500, 2000]

  return (
    <CommonTemplate title='Demo'>
      {timers.map(time => (
        <Button
          key={time}
          onClick={() =>
            showModal(props => <ModalWrapper closeTimeout={time} {...props} />)
          }
        >
          Open {time}ms
        </Button>
      ))}
    </CommonTemplate>
  )
}

BaseComponent.__docgenInfo = {
  props: {
    ...propTypes,
    closeTimeout: {
      type: {
        name: 'closeTimeout?: number',
      },
      required: false,
      description: 'time to remove a component (ms)',
      defaultValue: {
        value: 400,
      },
    },
  },
}

storiesOf('Modals', module).add(
  'closest timeout',
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

        const ModalWrapper = ({ closeTimeout, ...props }) => {
          return (
            <Modal closeTimeout={closeTimeout} {...props}>
              {({ closeModal }) => {
                return (
                  <>
                    <h1>Close timeout modal</h1>
                    <button onClick={closeModal}>Close</button>
                  </>
                )
              }}
            </Modal>
          )
        }
        
        const BaseComponent = () => {
          const { showModal } = React.useContext(ModalContext)
        
          return (
            <button
              onClick={() =>
                showModal(props => <ModalWrapper closeTimeout={2000} {...props} />)
              }
            >
              Open
            </button>
          )
        }
        ~~~
        `,
    },
  },
)
