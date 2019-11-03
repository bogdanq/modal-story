import React from 'react'
import { Button } from '@storybook/react/demo'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { ModalContext, Modal } from 'context-react-modal'
import { propTypes } from '../options/props-config'
import { CommonTemplate } from '../templates/common-modal'

const ModalWithAnimation = ({ animationName, ...props }) => {
  return (
    <Modal animationName={animationName} {...props}>
      {({ closeModal }) => (
        <div>
          <h1>Modal with animation - {animationName}</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.
          <Button onClick={closeModal}>×</Button>
        </div>
      )}
    </Modal>
  )
}

const modalNames = [
  'scale',
  'translate',
  'rotate',
  'jackIn',
  'rubber',
  'swing',
  'rollin',
]

const BaseComponent = () => {
  const { showModal } = React.useContext(ModalContext)

  return (
    <CommonTemplate title='Demo'>
      {modalNames.map(animation => (
        <Button
          onClick={() =>
            showModal(props => (
              <ModalWithAnimation {...props} animationName={animation} />
            ))
          }
        >
          open modal ({animation})
        </Button>
      ))}
    </CommonTemplate>
  )
}

BaseComponent.__docgenInfo = {
  props: {
    ...propTypes,
    animationName: {
      type: {
        name: `animationName?: ${modalNames.map(name => ` ${name}`)}`,
      },
      required: false,
      description: 'animation name',
      defaultValue: {
        value: 'translate',
      },
    },
  },
}

storiesOf('Modals', module).add(
  'modal with animation',
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
        import { ModalContext, Modal } from 'context-react-modal'

        const ModalWithAnimation = ({ animationName, ...props }) => {
          return (
            <Modal animationName={animationName} {...props}>
              {({ closeModal }) => (
                <>
                  <h1>Modal with animation - rotate</h1>
                  <button onClick={closeModal}>Close</button>
                </>
              )}
            </Modal>
          )
        }

        const BaseComponent = () => {
          const { showModal } = React.useContext(ModalContext)
          return (
            <button
              onClick={() =>
                showModal(props => (
                  <ModalWithAnimation {...props} animationName="rotate" />
                ))
              }
            >
              open modal (rotate)
            </button>
          )
        }       
        ~~~
        `,
    },
  },
)
