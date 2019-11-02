import React from 'react'
import { Button } from '@storybook/react/demo'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { ModalContext, Modal } from 'context-react-modal'
import { propTypes } from '../options/props-config'
import { CommonTemplate } from '../templates/common-modal'

const BaseComponent = () => {
  const { showModal } = React.useContext(ModalContext)
  const [currentNumber, setNumber] = React.useState(null)

  const getNumber = React.useCallback(() => {
    if (currentNumber > 18) {
      return true
    }
    return false
  }, [currentNumber])

  return (
    <CommonTemplate>
      <p>
        You can pass a function with any condition, but function must return
        bool
      </p>
      <input
        value={currentNumber}
        onChange={e => setNumber(e.target.value)}
        placeholder='number must be greater than 18'
      />
      <Button
        onClick={() =>
          showModal(params => (
            <Modal {...params} condition={getNumber}>
              {() => <div>You number: {currentNumber}</div>}
            </Modal>
          ))
        }
      >
        open modal
      </Button>
    </CommonTemplate>
  )
}

BaseComponent.__docgenInfo = {
  props: {
    ...propTypes,
    condition: {
      type: {
        name: 'condition?: () => boolean',
      },
      required: false,
      description:
        'You can pass a function with any condition, but function must return bool',
    },
  },
}

storiesOf('Modals', module).add(
  'modal condition',
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
          const [currentNumber, setNumber] = React.useState(null)
        
          const getNumber = React.useCallback(() => {
            if (currentNumber > 18) {
              return true
            }
            return false
          }, [currentNumber])
        
          return (
            <CommonTemplate>
              <input
                value={currentNumber}
                onChange={e => setNumber(e.target.value)}
              />
              <Button
                onClick={() =>
                  showModal(params => (
                    <Modal {...params} condition={getNumber}>
                      {() => <div>You number: {currentNumber}</div>}
                    </Modal>
                  ))
                }
              >
                open modal
              </Button>
            </CommonTemplate>
          )
        }
        ~~~
        `,
    },
  },
)
