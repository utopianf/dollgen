import React, { useContext, useState } from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { styled } from '../../core/stitches';
import { PixelStreamingContext } from '../pixelStreaming/PixelStreamingProvider';

export const ZoomSlider = () => {
    const { pixelStreaming } = useContext(PixelStreamingContext);
    const [pitchInput, setPitchInput] = useState(45);

    return (
        <SliderContainer>
            <SliderLabel htmlFor="zoom">前後</SliderLabel>
            <SliderRoot
                value={[pitchInput]}
                defaultValue={[50]}
                min={10}
                max={100}
                step={1}
                aria-label="Volume"
                id="zoom-pitch"
                onValueChange={(value) => {
                    setPitchInput(value[0]);
                    if (pixelStreaming) {
                        pixelStreaming.emitUIInteraction({
                            parameter: 'zoom',
                            value: value[0]
                        });
                    }
                }}
            >
                <SliderTrack></SliderTrack>
                <SliderThumb />
            </SliderRoot>
            <SliderTextInput
                value={pitchInput}
                onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    setPitchInput(newValue);
                    if (pixelStreaming) {
                        pixelStreaming.emitUIInteraction({
                            parameter: 'zoom',
                            value: newValue
                        });
                    }
                }}
            />
        </SliderContainer>
    );
};

const SliderContainer = styled('form', {
    position: 'absolute',
    bottom: '130px',
    right: '5px',
    width: '200px',
    height: '47px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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

const SliderLabel = styled(LabelPrimitive.Root, {
    position: 'absolute',
    color: '$darkgray',
    fontSize: '$sm',
    lineHeight: '$sm',
    top: 0,
    left: 0
});
