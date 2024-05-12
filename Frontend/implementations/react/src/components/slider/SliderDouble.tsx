import React, { useContext } from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { styled } from '../../core/stitches'
import ParameterContext, { SliderDoubleParameter } from '../parameter/ParameterProvider'

interface SliderProps {
  name: string
  label: string
  defaultValues: number[]
  mins?: number[]
  maxs?: number[]
  maxLabel?: string
  minLabel?: string
  disabled?: boolean
  orientation?: "horizontal" | "vertical"
}

export const SliderDouble = (props: SliderProps) => {
  const { name, label, mins: _mins, maxs: _maxs, minLabel, maxLabel, orientation, disabled } = props
  const { parameters, updateSliderDoubleParameterValue } = useContext(ParameterContext)

  const mins = _mins ?? [0, 0]
  const maxs = _maxs ?? [100, 100]

  // 対応するパラメータを見つけ、その値を設定します。
  const parameter = parameters.find((param) => "name" in param && param.name === name && param.type === "slider")

  const defaultValues = props.defaultValues ?? [0, 0]
  const values = parameter ? (parameter as SliderDoubleParameter).values : defaultValues

  return (
    <SliderContainer>
      <SliderLabel htmlFor={name}>{label}</SliderLabel>
      {minLabel && <SliderMinLabel htmlFor={name}>{minLabel}</SliderMinLabel>}
      {maxLabel && <SliderMaxLabel htmlFor={name}>{maxLabel}</SliderMaxLabel>}
      <SliderRootUpper
        disabled={disabled}
        orientation={orientation}
        value={[values[0]]}
        defaultValue={[defaultValues[0]]}
        min={mins[0]}
        max={maxs[0]}
        step={(maxs[0] - mins[0]) / 100.0}
        aria-label="Volume"
        id={`slider-${name}`}
        onValueChange={(value) => {
          const _values = [value[0], values[1]]
          updateSliderDoubleParameterValue(name, _values)
        }}
      >
        <SliderTrack></SliderTrack>
        <SliderThumb />
      </SliderRootUpper>
      <SliderRootLower
        disabled={disabled}
        orientation={orientation}
        value={[values[1]]}
        defaultValue={[defaultValues[1]]}
        min={mins[1]}
        max={maxs[1]}
        step={(maxs[1] - mins[1]) / 100.0}
        aria-label="Volume"
        id={`slider-${name}`}
        onValueChange={(value) => {
          const _values = [values[0], value[0]]
          updateSliderDoubleParameterValue(name, _values)
        }}
      >
        <SliderTrack></SliderTrack>
        <SliderThumb />
      </SliderRootLower>
      <SliderTextInputX
        value={values[0]}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value)
          updateSliderDoubleParameterValue(name, [newValue, values[1]])
        }}
      />
      <SliderTextInputY
        value={values[1]}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value)
          updateSliderDoubleParameterValue(name, [values[0], newValue])
        }}
      />
    </SliderContainer>
  )
}

const SliderContainer = styled('form', {
  position: 'relative',
  width: '200px',
  height: '62px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const SliderLabel = styled(LabelPrimitive.Root, {
  position: 'absolute',
  color: '$darkgray',
  fontSize: '$sm',
  lineHeight: '$sm',

  top: 0,
  left: 0,
})

const SliderMaxLabel = styled(LabelPrimitive.Root, {
  position: 'absolute',
  color: '$lightgray',
  fontSize: '$sm',
  lineHeight: '$sm',
  fontStyle: 'italic',

  bottom: 0,
  right: 0,
})

const SliderMinLabel = styled(LabelPrimitive.Root, {
  position: 'absolute',
  color: '$lightgray',
  fontSize: '$sm',
  lineHeight: '$sm',
  fontStyle: 'italic',

  bottom: 0,
  left: 0,
})

const SliderTextInputX = styled('input', {
  all: 'unset',
  position: 'absolute',
  fontSize: '$sm',
  lineHeight: '$sm',
  borderBottom: '1px solid $darkgray',
  width: '22px',
  top: 0,
  right: 30,
})
const SliderTextInputY = styled('input', {
  all: 'unset',
  position: 'absolute',
  fontSize: '$sm',
  lineHeight: '$sm',
  borderBottom: '1px solid $darkgray',
  width: '22px',
  top: 0,
  right: 0,
})

const SliderRootUpper = styled(SliderPrimitive.Root, {
  position: 'absolute',
  top: 18,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: 200,
  height: 20,
})

const SliderRootLower = styled(SliderPrimitive.Root, {
  position: 'absolute',
  top: 40,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: 200,
  height: 20,
})


const SliderTrack = styled(SliderPrimitive.Track, {
  backgroundColor: '$lightgray',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',
  height: 3,
})

const SliderThumb = styled(SliderPrimitive.Thumb, {
  display: 'block',
  width: 10,
  height: 10,
  backgroundColor: 'white',
  border: '3px solid $darkgray',
  borderRadius: 10,
  boxShadow: '0 0 0 4px white',
  //   '&:hover': { backgroundColor: violet.violet3 },
  //   '&:focus': { outline: 'none', boxShadow: `0 0 0 5px ${blackA.blackA8}` },
})
