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
            <Modal {...params}>{() => <>Some modal</>}</Modal>
          ))
        }
      >
        open modal
      </Button>
    </CommonTemplate>
  )
}

BaseComponent.__docgenInfo = {
  props: propTypes,
}

storiesOf('Modals', module).add(
  'default modal',
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
          const { showModal } = React.useContext(ModalContext);
        
          return (
            <Button
              onClick={() =>
                showModal(params => <Modal {...params}>{() => <>Some modal</>}</Modal>)
              }
            >
              open modal
            </Button>
          );
        };
        ~~~
        `,
    },
  },
)
