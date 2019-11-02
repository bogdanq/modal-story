import React from 'react'
import { Button } from '@storybook/react/demo'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { ModalContext, Modal } from 'context-react-modal'
import { propTypes } from '../options/props-config'

const ModalWrapper = ({ closeTimeout, ...params }) => {
  return (
    <Modal closeTimeout={closeTimeout} {...params}>
      {() => {
        return <h1>Close timeout modal</h1>
      }}
    </Modal>
  )
}

const BaseComponent = () => {
  const { showModal } = React.useContext(ModalContext)
  const timers = [400, 1000, 1500, 2000]

  return timers.map(time => (
    <Button
      onClick={() =>
        showModal(params => <ModalWrapper closeTimeout={time} {...params} />)
      }
    >
      Open {time}ms
    </Button>
  ))
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
        #### - Usage
        ~~~jsx
        import React from 'react'
        import { ModalContext, Modal } from 'context-react-modal'

        const ModalWrapper = ({ closeTimeout, ...params }) => {
          return (
            <Modal closeTimeout={closeTimeout} {...params}>
              {() => {
                return <h1>Modal number</h1>
              }}
            </Modal>
          )
        }
        
        const BaseComponent = () => {
          const { showModal } = React.useContext(ModalContext)
        
          return (
            <Button
              onClick={() =>
                showModal(params => <ModalWrapper closeTimeout={2000} {...params} />)
              }
            >
              Open
            </Button>
          )
        }
        ~~~
        `,
    },
  },
)
