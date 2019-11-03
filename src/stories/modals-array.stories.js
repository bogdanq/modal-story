import React from 'react'
import { Button } from '@storybook/react/demo'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { ModalContext, Modal } from 'context-react-modal'
import { propTypes } from '../options/props-config'
import { CommonTemplate } from '../templates/common-modal'

const ModalWrapper = ({ ...props }) => {
  return (
    <Modal {...props}>
      {({ closeModal }) => (
        <>
          <h1>Modal number: {props.id}</h1>
          <Button onClick={closeModal}>Close</Button>
        </>
      )}
    </Modal>
  )
}

const BaseComponent = () => {
  const { showModal } = React.useContext(ModalContext)
  React.useEffect(() => {
    showModal([
      props => <ModalWrapper {...props} />,
      props => <ModalWrapper {...props} />,
    ])
  }, [showModal])

  return (
    <CommonTemplate>
      You can show modals in componentDidMount methood
    </CommonTemplate>
  )
}

BaseComponent.__docgenInfo = {
  props: propTypes,
}

storiesOf('Modals', module).add(
  'modal array',
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

        const ModalWrapper = ({ ...props }) => {
          return (
            <Modal {...props}>
              {({ closeModal }) => (
                <>
                  <h1>Modal number: {props.id}</h1>
                  <button onClick={closeModal}>Close</button>
                </>
              )}
            </Modal>
          )
        }

        const BaseComponent = () => {
          const { showModal } = React.useContext(ModalContext)
          React.useEffect(() => {
            showModal([
              props => <ModalWrapper {...props} />,
              props => <ModalWrapper {...props} />,
            ])
          }, [showModal])
        
          return <>You base component. Show modals in componentDidMount methoods</>
        }
        ~~~
        `,
    },
  },
)
