import { useContext, useState } from 'react'

import { Label } from '@radix-ui/react-label'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { styled } from '../../core/stitches'
import { Checkbox } from '../checkbox/Checkbox'
import { Select } from '../select/BaseSelect'
import { Slider } from '../slider/Slider'
import { Tree } from '../tree/Tree'
import ParameterContext from '../parameter/ParameterProvider'

export const MakeoverTab = () => {
  const tabName = "makeover"
  const { parameters } = useContext(ParameterContext)
  const headParameters = parameters.filter((param) => param.tab === tabName)
  const headGroups = [...new Set(headParameters.map((param) => param.group))]

  return (
    <ScrollAreaRoot>
      <ScrollAreaViewport>
        <Flex>
          {headGroups.map((group) =>
            <Tree label={group}>
              {headParameters.filter((param) => param.group === group).map((param) => {
                switch (param.type) {
                  case "dropdown":
                    return <Select name={param.name} />
                  case "slider":
                    return <Slider key={param.name} name={param.name} label={param.label} min={param.min} max={param.max} defaultValue={param.defaultValue} />
                  case "checkbox":
                    return <Checkbox key={param.name} name={param.name} />
                  default:
                    return <></>
                }
              })}
            </Tree>
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

const CheckboxLabel = styled(Label, {
  fontSize: 13,
  lineHeight: 1,
  fontWeight: 500,
  marginBottom: 5,
  display: 'block',
})

const Flex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

const FlexRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: 25
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
