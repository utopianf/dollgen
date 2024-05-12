import { useContext, useEffect, useState } from 'react'

import { Label } from '@radix-ui/react-label'
import { Color, parseColor } from '@react-stately/color'


import { ColorArea } from './ColorArea'
import { ColorWheel } from './ColorWheel'
import { styled } from '../../core/stitches'
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

  const parameter = parameters.find((param) => "name" in param && param.name === name && param.type === "color")
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
    <ColorPickerContainer>
      <ColorPickerLabel htmlFor={name}>{props.label}</ColorPickerLabel>
      <ColorPickerWrapper>
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
    </ColorPickerContainer>
  )
}

const ColorPickerLabel = styled(Label, {
})

const ColorPickerWrapper = styled('div', {
  height: '200px',
})

const ColorPickerContainer = styled('div', {
  position: 'relative',
  width: '200px',
  height: '230px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

const ColorWheelWrapper = styled('div', {
  position: 'absolute',
  zIndex: 1,
})

const ColorAreaWrapper = styled('div', {
  position: 'absolute',
  zIndex: 2,
  top: '80px',
  left: '50px',
})
