import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { ModalContext, Modal } from 'context-react-modal'
import { propTypes } from '../options/props-config'

const ModalWrapper = ({ ...params }) => {
  return (
    <Modal {...params}>
      {() => {
        return <h1>Modal number: {params.id}</h1>
      }}
    </Modal>
  )
}

const BaseComponent = () => {
  const { showModal } = React.useContext(ModalContext)
  React.useEffect(() => {
    showModal([
      params => <ModalWrapper {...params} />,
      params => <ModalWrapper {...params} />,
    ])
  }, [showModal])

  return <>You base component. Show modals in componentDidMount methoods</>
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
        #### - Usage
        ~~~jsx
        import React from 'react'
        import { ModalContext, Modal } from 'context-react-modal'

        const ModalWrapper = ({ ...params }) => {
          return (
            <Modal {...params}>
              {() => {
                return <h1>Modal number: {params.id}</h1>
              }}
            </Modal>
          )
        }

        const BaseComponent = () => {
          const { showModal } = React.useContext(ModalContext)
          React.useEffect(() => {
            showModal([
              params => <ModalWrapper {...params} />,
              params => <ModalWrapper {...params} />,
            ])
          }, [showModal])
          return <>You can pass an array of components to a showModal function</>
        }
        ~~~
        `,
    },
  },
)
