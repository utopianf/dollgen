import { useContext } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import { styled } from '../../core/stitches'

import { ColorPicker } from '../colorpicker/ColorPicker'
import ParameterContext from '../parameter/ParameterProvider'
import { Slider } from '../slider/Slider'
import { Tree } from '../tree/Tree'

export const EyesTab = () => {
  const { parameters } = useContext(ParameterContext)
  const eyes_parameters = parameters.filter((param) => param.tab === 'eyes')
  const trees = [
    {
      name: 'Eye',
      parameters: eyes_parameters.filter((param) => param.group === 'eye'),
    },
    {
      name: "Eye Rush",
      parameters: eyes_parameters.filter((param) => param.group === 'eyerush'),
    },
    {
      name: 'Other',
      parameters: eyes_parameters.filter((param) => param.group !== 'eye'),
    },
  ]
  return (
    <ScrollAreaRoot>
      <ScrollAreaViewport>
        <Flex>
          {trees.map((tree) => (
            <Tree label={tree.name}>
              {tree.parameters.map((p) => {
                if (p.type === "slider") {
                  return (
                    <Slider name={p.name} label={p.label} defaultValue={0} />
                  )
                } else if (p.type === "color") {
                  return (
                    <ColorPicker name={p.name} label={p.label} />
                  )
                }
              })}
            </Tree>
          ))}
        </Flex>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  )
}

const Flex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

const ScrollAreaRoot = styled(ScrollArea.Root, {
  // width: 200,
  // height: '100%',
  overflow: 'hidden',
})

const ScrollAreaViewport = styled(ScrollArea.Viewport, {
  width: '100%',
  height: 'calc(100vh - 285px)',
  borderRadius: 'inherit',
});

const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  transition: 'background 160ms ease-out',
  '&:hover': { background: '$basicblack' },
  '&[data-orientation="vertical"]': { width: 10 },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: 10,
  },
})

const ScrollAreaThumb = styled(ScrollArea.Thumb, {
  flex: 1,
  background: '$darkgray',
  borderRadius: 10,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
})

const ScrollAreaCorner = styled(ScrollArea.Corner, {
  background: '$darkgray',
})
