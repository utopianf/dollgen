import { useContext } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'

import { styled } from '../../core/stitches'
import ParameterContext from '../parameter/ParameterProvider'
import { Slider } from '../slider/Slider'
import { SliderDouble } from '../slider/SliderDouble'
import { Tree } from '../tree/Tree'


export const MakeoverTab = () => {
  const { parameters } = useContext(ParameterContext)
  const makeover_parameters = parameters.filter((param) => param.tab === 'makeover')

  // get unique group names
  const uniqueGroups = [...new Set(makeover_parameters.map((param) => param.group))]
  return (
    <ScrollAreaRoot>
      <ScrollAreaViewport>
        <Flex>
          {uniqueGroups.map((group) => {
            const parameters = makeover_parameters.filter((param) => param.group === group)
            return (
              <Tree label={group}>
                {parameters.map((p) => {
                  if (p.type === "slider") {
                    return (
                      <Slider name={p.name} label={p.label} defaultValue={p.value ?? 0} />
                    )
                  } else if (p.type === "slider_double") {
                    return (
                      <SliderDouble name={p.name} label={p.label} defaultValue={p.values ?? [0, 0]} />
                    )
                  }
                })}
              </Tree>
            )
          }
          )}
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
