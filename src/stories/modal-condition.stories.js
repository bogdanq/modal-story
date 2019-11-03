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
    <CommonTemplate title='Demo'>
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
          showModal(props => (
            <Modal {...props} condition={getNumber}>
              {({ closeModal }) => (
                <>
                  <h1>You number: {currentNumber}</h1>
                  <Button onClick={closeModal}>Close modal</Button>
                </>
              )}
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
  'modal with condition',
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
            <>
              <p>
                You can pass a function with any condition, but function must return
                bool
              </p>
        
              <input
                value={currentNumber}
                onChange={e => setNumber(e.target.value)}
                placeholder='number must be greater than 18'
              />
        
              <button
                onClick={() =>
                  showModal(props => (
                    <Modal {...props} condition={getNumber}>
                      {({ closeModal }) => (
                        <>
                          <h1>You number: {currentNumber}</h1>
                          <button onClick={closeModal}>Close modal</button>
                        </>
                      )}
                    </Modal>
                  ))
                }
              >
                open modal
              </button>
            </>
          )
        }
        ~~~
        `,
    },
  },
)
