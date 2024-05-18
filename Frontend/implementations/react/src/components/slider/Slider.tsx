import React, { useContext } from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { styled } from '../../core/stitches';
import ParameterContext, {
    SliderParameter
} from '../parameter/ParameterProvider';

interface SliderProps {
    name: string;
    label: string;
    defaultValue: number;
    min?: number;
    max?: number;
    step?: number;
    maxLabel?: string;
    minLabel?: string;
    disabled?: boolean;
    orientation?: 'horizontal' | 'vertical';
    onValueChange?: (value: number[]) => void;
}

export const Slider = (props: SliderProps) => {
    const {
        name,
        label,
        minLabel,
        maxLabel,
        defaultValue,
        orientation,
        disabled,
        min,
        max,
        step,
        onValueChange
    } = props;
    const { parameters, updateSliderParameterValue } =
        useContext(ParameterContext);

    // 対応するパラメータを見つけ、その値を設定します。
    const parameter = parameters.find(
        (param) =>
            'name' in param && param.name === name && param.type === 'slider'
    );
    const value = parameter
        ? Number((parameter as SliderParameter).value)
        : defaultValue;

    return (
        <SliderContainer>
            <SliderLabel htmlFor={name}>{label}</SliderLabel>
            {minLabel && (
                <SliderMinLabel htmlFor={name}>{minLabel}</SliderMinLabel>
            )}
            {maxLabel && (
                <SliderMaxLabel htmlFor={name}>{maxLabel}</SliderMaxLabel>
            )}
            <SliderRoot
                disabled={disabled}
                orientation={orientation}
                value={[value]}
                defaultValue={[defaultValue]}
                min={min}
                max={max}
                step={step ?? (max - min) / 100.0}
                aria-label="Volume"
                id={`slider-${name}`}
                onValueChange={
                    onValueChange ??
                    ((value) => {
                        updateSliderParameterValue(name, value[0]);
                    })
                }
            >
                <SliderTrack></SliderTrack>
                <SliderThumb />
            </SliderRoot>
            <SliderTextInput
                value={value}
                onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    updateSliderParameterValue(name, newValue);
                }}
            />
        </SliderContainer>
    );
};

const SliderContainer = styled('form', {
    position: 'relative',
    width: '200px',
    height: '47px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
});

const SliderLabel = styled(LabelPrimitive.Root, {
    position: 'absolute',
    color: '$darkgray',
    fontSize: '$sm',
    lineHeight: '$sm',

    top: 0,
    left: 0
});

const SliderMaxLabel = styled(LabelPrimitive.Root, {
    position: 'absolute',
    color: '$lightgray',
    fontSize: '$sm',
    lineHeight: '$sm',
    fontStyle: 'italic',

    bottom: 0,
    right: 0
});

const SliderMinLabel = styled(LabelPrimitive.Root, {
    position: 'absolute',
    color: '$lightgray',
    fontSize: '$sm',
    lineHeight: '$sm',
    fontStyle: 'italic',

    bottom: 0,
    left: 0
});

const SliderTextInput = styled('input', {
    all: 'unset',
    position: 'absolute',
    fontSize: '$sm',
    lineHeight: '$sm',
    borderBottom: '1px solid $darkgray',
    width: '22px',
    top: 0,
    right: 0
});

const SliderRoot = styled(SliderPrimitive.Root, {
    position: 'absolute',
    top: 18,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    touchAction: 'none',
    width: 200,
    height: 20
});

const SliderTrack = styled(SliderPrimitive.Track, {
    backgroundColor: '$lightgray',
    position: 'relative',
    flexGrow: 1,
    borderRadius: '9999px',
    height: 3
});

const SliderThumb = styled(SliderPrimitive.Thumb, {
    display: 'block',
    width: 10,
    height: 10,
    backgroundColor: 'white',
    border: '3px solid $darkgray',
    borderRadius: 10,
    boxShadow: '0 0 0 4px white'
    //   '&:hover': { backgroundColor: violet.violet3 },
    //   '&:focus': { outline: 'none', boxShadow: `0 0 0 5px ${blackA.blackA8}` },
});
