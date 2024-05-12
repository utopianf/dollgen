import { useContext } from 'react'

import { Label } from '@radix-ui/react-label'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { styled } from '../../core/stitches'
import { BaseCheckbox } from '../checkbox/Checkbox'
import ParameterContext, { CheckboxParameter, Parameter } from '../parameter/ParameterProvider'
import { BaseHeadSelect } from '../select/BaseHeadSelect'
import { Select } from '../select/BaseSelect'
import { Slider } from '../slider/Slider'
import { SliderDouble } from '../slider/SliderDouble'
import { Tree } from '../tree/Tree'

export const HeadTab = () => {
  const tabName = "head"
  const { parameters, updateCheckboxParameterValue } = useContext(ParameterContext)
  const headParameters = parameters.filter((param) => param.tab === tabName)
  const headGroups = [...new Set(headParameters.map((param) => param.group))]

  const isCheckbox = (param: Parameter): param is CheckboxParameter => param.type === "checkbox"

  return (
    <ScrollAreaRoot>
      <ScrollAreaViewport>
        <Flex>
          <Tree label="全体">
            <BaseHeadSelect />
            <>
              <CheckboxLabel htmlFor="head">目は開ける？</CheckboxLabel>
              <FlexRow>
                <BaseCheckbox label="右目" checked={parameters.filter(isCheckbox).find(p => p.name === "EyeRight.Open").checked} setChecked={(checked) => updateCheckboxParameterValue("EyeRight.Open", checked)} />
                <BaseCheckbox label="左目" checked={parameters.filter(isCheckbox).find(p => p.name === "EyeLeft.Open").checked} setChecked={(checked) => updateCheckboxParameterValue("EyeLeft.Open", checked)} />
              </FlexRow>
            </>
            <>
              <CheckboxLabel htmlFor="head">耳はあり？</CheckboxLabel>
              <FlexRow>
                <BaseCheckbox label="はい" checked={parameters.filter(isCheckbox).find(p => p.name === "Ear.Visible").checked} setChecked={(checked) => updateCheckboxParameterValue("Ear.Visible", checked)} />
              </FlexRow>
            </>
            <>
              <CheckboxLabel htmlFor="head">開口する？</CheckboxLabel>
              <FlexRow>
                <BaseCheckbox label="はい" checked={parameters.filter(isCheckbox).find(p => p.name === "Mouse.Open").checked} setChecked={(checked) => updateCheckboxParameterValue("Mouse.Open", checked)} />
              </FlexRow>
            </>
            <>
              <CheckboxLabel htmlFor="head">歯はあり？</CheckboxLabel>
              <FlexRow>
                <BaseCheckbox label="上歯はあり？" checked={parameters.filter(isCheckbox).find(p => p.name === "TeethUpperMain.Visible").checked} setChecked={(checked) => updateCheckboxParameterValue("TeethUpperMain.Visible", checked)} />
                <BaseCheckbox label="下歯はあり？" checked={parameters.filter(isCheckbox).find(p => p.name === "TeethLowerMain.Visible").checked} setChecked={(checked) => updateCheckboxParameterValue("TeethLowerMain.Visible", checked)} />
              </FlexRow>
            </>
            <>
              <CheckboxLabel htmlFor="head">舌はあり？</CheckboxLabel>
              <FlexRow>
                <BaseCheckbox label="はい" checked={parameters.filter(isCheckbox).find(p => p.name === "Tongue.Visible").checked} setChecked={(checked) => updateCheckboxParameterValue("Tongue.Visible", checked)} />
              </FlexRow>
            </>
            <>
              <CheckboxLabel htmlFor="head">角はあり？</CheckboxLabel>
              <FlexRow>
                <BaseCheckbox label="はい" checked={parameters.filter(isCheckbox).find(p => p.name === "Tsuno.Visible").checked} setChecked={(checked) => updateCheckboxParameterValue("Tsuno.Visible", checked)} />
              </FlexRow>
            </>
          </Tree>
          {headGroups.map((group) =>
            <Tree label={group}>
              {headParameters.filter((param) => param.group === group).map((param) => {
                switch (param.type) {
                  case "dropdown":
                    return <Select name={param.name} />
                  case "slider":
                    return <Slider key={param.name} name={param.name} label={param.label} min={param.min} max={param.max} defaultValue={param.defaultValue} />
                  // case "checkbox":
                  //   return <Checkbox key={param.name} name={param.name} />
                  case "slider_double":
                    return <SliderDouble key={param.name} name={param.name} label={param.label} mins={param.mins} maxs={param.maxs} defaultValues={param.defaultValues} />
                  default:
                    return null
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
