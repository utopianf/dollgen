import { useContext, useEffect, useState } from 'react'

import { Label } from '@radix-ui/react-label'
import { Color, parseColor } from '@react-stately/color'
import { styled } from '../../core/stitches'

import { ColorArea } from './ColorArea'
import { ColorWheel } from './ColorWheel'
import ParameterContext, { ColorParameter } from '../parameter/ParameterProvider'
import { PixelStreamingContext } from '../pixelStreaming/PixelStreamingProvider'

interface ColorPickerProps {
  name: string
  label: string
  disabled?: boolean
}

export const ColorPicker = (props: ColorPickerProps) => {
  const { pixelStreaming } = useContext(PixelStreamingContext)

  const { name } = props
  const { parameters, updateColorParameterValue } = useContext(ParameterContext)

  const parameter = parameters.find((param) => param.name === name && param.type === "color")
  const { rValue, gValue, bValue } = parameter ? (parameter as ColorParameter) : { rValue: 0.5, gValue: 0.5, bValue: 0.5 }

  const [value, setValue] = useState<Color>(
    parseColor(
      `rgba(${rValue * 256}, ${gValue * 256}, ${bValue * 256
      })`
    ).toFormat('hsl')
  )
  const [endValue, setEndValue] = useState<Color>(value)

  const [sChannel, lChannel] = value.getColorChannels().slice(1, 3)

  useEffect(() => {
    if (pixelStreaming) {
      const emitObject = {
        parameter: name,
        value: `${value.toFormat('rgba').getChannelValue('red') / 256.0},${value.toFormat('rgba').getChannelValue('green') / 256.0
          },${value.toFormat('rgba').getChannelValue('blue') / 256.0},${value
            .toFormat('rgba')
            .getChannelValue('alpha')}`,
      }

      pixelStreaming.emitUIInteraction(emitObject)
    }
  }, [endValue])

  const handleChangeEnd = (value: Color) => {
    setEndValue(value)
    updateColorParameterValue(name,
      value.toFormat('rgba').getChannelValue('red') / 256.0,
      value.toFormat('rgba').getChannelValue('green') / 256.0,
      value.toFormat('rgba').getChannelValue('blue') / 256.0)
  }

  return (
    <ColorPickerWrapper>
      <ColorPickerLabel htmlFor={name}>{props.label}</ColorPickerLabel>
      <ColorWheelWrapper>
        <ColorWheel
          value={value}
          onChange={setValue}
          onChangeEnd={handleChangeEnd}
        />
      </ColorWheelWrapper>
      <ColorAreaWrapper>
        <ColorArea
          name={name}
          value={value}
          onChange={setValue}
          onChangeEnd={handleChangeEnd}
          xChannel={sChannel}
          yChannel={lChannel}
        />
      </ColorAreaWrapper>
    </ColorPickerWrapper>
  )
}

const ColorPickerLabel = styled(Label, {
  position: 'absolute',
  top: 0,
  left: 0,
})

const ColorPickerWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const ColorWheelWrapper = styled('div', {
  position: 'relative',
  zIndex: 1,
})

const ColorAreaWrapper = styled('div', {
  position: 'absolute',
  zIndex: 2,
})
