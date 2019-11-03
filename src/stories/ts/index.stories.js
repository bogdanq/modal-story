import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { CommonTemplate } from '../../templates/common-modal'
import Highlight from 'react-highlight'

const Params = `
  type Animation =
    | 'scale'
    | 'translate'
    | 'rotate'
    | 'jackIn'
    | 'rubber'
    | 'swing'
    | 'rollin'

  type ModalType = {
    danger: FlattenInterpolation<any>
    success: FlattenInterpolation<any>
    primary: FlattenInterpolation<any>
  }

  type Params = {
    id: number
    condition?: () => boolean
    cookie?: {
      name: string
      maxAge?: number
    }
    type?: keyof ModalType
    animationName?: Animation
    customAnimationName?: string
    closeTimeout?: number
  }
`
const ContextModalType = `
  type RenderNodeModal = (props: { id: number }) => React.ReactNode

  type ShowModal = <T extends RenderNodeModal | Array<RenderNodeModal>>(
    renderNodeModal: T,
  ) => void

  type CurrentModal = {
    id: number
    node: (props: { id: number; key: number }) => React.ReactNode
  }

  type ContextModalType = {
    showModal: ShowModal
    hideModal: (id: number) => void
    nodeList: Array<CurrentModal>
    currentNodeId: number | null
    setCurrentNodeId: React.Dispatch<any>
    setCloseTimeout: React.Dispatch<any>
  }
`

const CustomLabelProps = `
  type CustomLabelProps = {
    toogleCookie:
      | ((event: React.ChangeEvent<HTMLInputElement>) => void)
      | undefined
    id: string
    name: string
    htmlFor: string
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-around;
`

const BaseComponent = () => {
  return (
    <CommonTemplate>
      <h1>All available types:</h1>
      <Row>
        <Highlight>{Params}</Highlight>
        <Highlight>{ContextModalType}</Highlight>
        <Highlight>{CustomLabelProps}</Highlight>
      </Row>
    </CommonTemplate>
  )
}

storiesOf('Usage with typescript', module).add(
  'ts modal',
  withInfo({
    inline: true,
  })(() => <BaseComponent />),
  {
    info: {
      source: false,
      propTables: null,
      text: `
        ## - Examples
        ~~~jsx
        import React from 'react'
        import { 
          ModalContext, 
          Modal, 
          ContextModalType, 
          Params, 
          CustomLabelProps,
        } from 'context-react-modal'

        /*you can inherit the type Params*/
        interface Props extends Params {}
                
        const Label = ({ htmlFor, toogleCookie, ...props }: CustomLabelProps) => {
          return (
            <div>
              <input {...props} onChange={toogleCookie} type='checkbox' />
              <label htmlFor={htmlFor}>do not show (custom component)</label>
            </div>
          )
        }

        const BaseComponent = ({}: Props) => {
          const { showModal } = React.useContext<ContextModalType>(ModalContext)
        
          return (
            <Button
              onClick={() =>
                showModal(props => (
                  <Modal {...props}>
                    {({ closeModal }) => (
                      <>
                        <h1>Some modal</h1>
                        <Button onClick={closeModal}>Close modal</Button>
                      </>
                    )}
                  </Modal>
                ))
              }
            >
              open modal
            </Button>
          )
        }
        ~~~
        `,
    },
  },
)
