import React, { useContext } from 'react';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import * as Select from '@radix-ui/react-select';
import { SelectItemProps } from '@radix-ui/react-select';

import { styled } from '../../core/stitches'
import { PixelStreamingContext } from '../pixelStreaming/PixelStreamingProvider'

export const BaseHeadSelect = () => {
    const { pixelStreaming } = useContext(PixelStreamingContext)
    return (
        <>
            <SelectLabel htmlFor="head">ベースヘッド</SelectLabel>
            <Select.Root defaultValue='DG9-01' onValueChange={(value) => {
                if (pixelStreaming) {
                    pixelStreaming.emitUIInteraction({
                        parameter: 'base_head',
                        value: value,
                    })
                }
            }}>
                <SelectTrigger id="head" aria-label="Eye-Mouse" disabled>
                    <Select.Value />
                    <SelectIcon>
                        <ChevronDownIcon />
                    </SelectIcon>
                </SelectTrigger>
                <Select.Portal>
                    <SelectContent>
                        <SelectScrollUpButton>
                            <ChevronUpIcon />
                        </SelectScrollUpButton>
                        <SelectViewport>
                            <SelectItem value="DG9-01">DG9-01</SelectItem>
                        </SelectViewport>
                        <SelectScrollDownButton>
                            <ChevronDownIcon />
                        </SelectScrollDownButton>
                    </SelectContent>
                </Select.Portal>
            </Select.Root>
        </>
    );
}


const SelectLabel = styled(Label, {
    fontSize: 13,
    lineHeight: 1,
    fontWeight: 500,
    marginBottom: 5,
    display: 'block',
    color: "$lightgray",
});

const SelectTrigger = styled(Select.SelectTrigger, {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    padding: '0 15px',
    fontSize: 13,
    lineHeight: 1,
    height: '32px',
    width: '176px',
    gap: 5,
    backgroundColor: 'white',
    border: `1px solid $darkgray`,
    // color: violet.violet11,
    // '&:hover': { backgroundColor: mauve.mauve3 },
    // '&[data-placeholder]': { color: violet.violet9 },
});

const SelectIcon = styled(Select.SelectIcon, {
    // color: violet.violet11,
    borderColor: '$darkgray',
});

const SelectContent = styled(Select.Content, {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 6,
    boxShadow:
        '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
});

const SelectViewport = styled(Select.Viewport, {
    padding: 5,
});

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(({ children, ...props }, ref) => {
    return (
        <StyledItem {...props} ref={ref}>
            <Select.ItemText>{children}</Select.ItemText>
            <StyledItemIndicator>
                <CheckIcon />
            </StyledItemIndicator>
        </StyledItem>
    );
});


const StyledItem = styled(Select.Item, {
    fontSize: 13,
    lineHeight: 1,
    color: "$",
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    height: 25,
    padding: '0 35px 0 25px',
    position: 'relative',
    userSelect: 'none',

    '&[data-disabled]': {
        // color: mauve.mauve8,
        pointerEvents: 'none',
    },

    '&[data-highlighted]': {
        outline: 'none',
        // backgroundColor: violet.violet9,
        // color: violet.violet1,
    },
});


const StyledItemIndicator = styled(Select.ItemIndicator, {
    position: 'absolute',
    left: 0,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const scrollButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    backgroundColor: 'white',
    // color: "$ultradarkgray",
    cursor: 'default',
};

const SelectScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles);

const SelectScrollDownButton = styled(Select.ScrollDownButton, scrollButtonStyles);

export default BaseHeadSelect;