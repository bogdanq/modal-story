import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { propTypes } from '../options/props-config'

const BaseComponent = () => {
  return null
}

BaseComponent.__docgenInfo = {
  props: {
    ...propTypes,
    customAnimation: {
      type: {
        name:
          'FlattenInterpolation<ThemedStyledProps<{ isAnimated?: boolean }, any>>',
      },
      required: false,
      description: `your custom animation style.`,
    },
  },
}

storiesOf('Modals', module).add(
  'modal with custom animations',
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
        import { css, keyframes } from 'styled-components'
        import { ModalContext, Modal } from 'context-react-modal'

        const zoomIn = keyframes\`
          from {
            opacity: 0;
            transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
          }
          60% {
            opacity: 1;
            transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);
            animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
          }
        \`

        const scaleOut = keyframes\`
          0% {
            opacity: 1;
            transform: scale(1)
          }
          100% {
            opacity: 0.5;
            transform: scale(0.5)
          }
        \`

        const rollinIn = keyframes\`
          from {
            opacity: 0;
            transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        \`

        const animationCustomStyle = {
          rollin: css\`
            border: 1px solid red;
            animation-name: \${({ isAnimated }) =>
              isAnimated ? zoomIn : scaleOut}\;
          \`,
          zoom: css\`
            border: 1px solid red;
            animation-name: \${({ isAnimated }) =>
              isAnimated ? rollinIn : scaleOut}\;
          \`,
        }

        const ModalForCustomAnimate = ({ customAnimationName, ...props }) => {
          return (
            <>
              <Modal
                customAnimation={animationCustomStyle[customAnimationName]}
                {...props}
              >
                {({ closeModal }) => (
                  <div>
                    <h1>Modal with custom animation</h1>
                    <button onClick={closeModal}>Close</button>
                  </div>
                )}
              </Modal>
            </>
          )
        }

        const BaseComponent = () => {
          const { showModal } = React.useContext(ModalContext)
        
          return (
            <>
              <button onClick={() => showModal(props => <ModalWrapper {...props} />)}>
                open modal 1
              </button>
            </>
          )
        }
        ~~~
        `,
    },
  },
)
