import { FC, PropsWithChildren, useState } from 'react'

import * as Collapsible from '@radix-ui/react-collapsible'

import { styled } from '../../core/stitches'
import { Slider } from '../slider/Slider'

interface TreeProps extends PropsWithChildren {
  label: string
  disabled?: boolean
  open?: boolean
  setOpen?: (open: boolean) => void
}

export const Tree: FC<TreeProps> = ({ children, label, disabled }) => {
  const [open, setOpen] = useState(false)
  return (
    <CollapsibleRoot open={open} onOpenChange={setOpen} disabled={disabled}>
      <Flex>
        <Collapsible.Trigger asChild>
          <IconButton>
            {open ? <MinusCircledIcon /> : <PlusCircledIcon />}
          </IconButton>
        </Collapsible.Trigger>
        <TreeTitle>{label}</TreeTitle>
      </Flex>
      <CollapsibleContent><FlexColumn>{children}</FlexColumn></CollapsibleContent>
    </CollapsibleRoot>
  )
}

const CollapsibleRoot = styled(Collapsible.Root, {
  width: '100%',
  height: '100%',
})

const CollapsibleContent = styled(Collapsible.Content, {
  [`& + ${Slider}`]: {
    backgroundColor: '$basicblack',
  },
  padding: "10px 0 0 25px"
})

const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 5,
})

const FlexColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 5,
})

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 18,
  width: 18,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fill: '$darkgray',
  // '&[data-state="closed"]': { backgroundColor: 'white' },
  // '&[data-state="open"]': { backgroundColor: violet.violet3 },
  // '&:hover': { backgroundColor: violet.violet3 },
  // '&:focus': { boxShadow: `0 0 0 2px black` },
})

const TreeTitle = styled('span', {
  color: '$darkgray',
  fontSize: '$md',
  lineHeight: '$md',
})

const PlusCircledIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="18"
    viewBox="0 0 18 18"
    width="18"
  >
    <rect opacity="0" width="18" height="18" />
    <path d="M9,1a8,8,0,1,0,8,8A8,8,0,0,0,9,1Zm5,8.5a.5.5,0,0,1-.5.5H10v3.5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5V10H4.5A.5.5,0,0,1,4,9.5v-1A.5.5,0,0,1,4.5,8H8V4.5A.5.5,0,0,1,8.5,4h1a.5.5,0,0,1,.5.5V8h3.5a.5.5,0,0,1,.5.5Z" />
  </svg>
)

const MinusCircledIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="18"
    viewBox="0 0 18 18"
    width="18"
  >
    <rect opacity="0" width="18" height="18" />
    <path d="M9,1a8,8,0,1,0,8,8A8,8,0,0,0,9,1Zm5,8.5a.5.5,0,0,1-.5.5h-9A.5.5,0,0,1,4,9.5v-1A.5.5,0,0,1,4.5,8h9a.5.5,0,0,1,.5.5Z" />
  </svg>
)
