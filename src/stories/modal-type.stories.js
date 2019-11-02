import React from 'react'
import { Button } from '@storybook/react/demo'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { ModalContext, Modal } from 'context-react-modal'
import { propTypes } from '../options/props-config'
import { CommonTemplate } from '../templates/common-modal'

const modalTypes = ['danger', 'success', 'primary']

const BaseComponent = () => {
  const { showModal } = React.useContext(ModalContext)

  return (
    <CommonTemplate>
      {modalTypes.map(type => (
        <Button
          onClick={() =>
            showModal(params => (
              <Modal {...params} type={type}>
                {() => <h1>Modal type: {type}</h1>}
              </Modal>
            ))
          }
        >
          open modal ({type})
        </Button>
      ))}
    </CommonTemplate>
  )
}

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
                    <Modal {...params} type={success}>
                      {() => <h1>Modal type: success</h1>}
                    </Modal>
                  ))
                }
              >
                open modal success
              </Button>
            </>
          )
        }
        ~~~
        `,
    },
  },
)
