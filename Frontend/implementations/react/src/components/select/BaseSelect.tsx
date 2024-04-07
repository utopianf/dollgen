import React, { useContext } from 'react';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import * as _Select from '@radix-ui/react-select';
import { SelectItemProps } from '@radix-ui/react-select';

import { styled } from '../../core/stitches'
import ParameterContext, { DropdownParameter } from '../parameter/ParameterProvider';

export const Select = ({ name }: { name: string }) => {
    const { parameters, updateDropdownParameterValue } = useContext(ParameterContext)

    // 対応するパラメータを見つけ、その値を設定します。
    const parameter = parameters.find((param) => param.name === name && param.type === "dropdown") as DropdownParameter | undefined

    if (!parameter) {
        return null
    }
    return (
        <>
            <SelectLabel htmlFor={parameter.label}>{parameter.label}</SelectLabel>
            <_Select.Root defaultValue='DG9-01' onValueChange={(value) => { updateDropdownParameterValue(name, value) }}>
                <SelectTrigger id={parameter.label} aria-label={parameter.label} disabled={parameter.disabled}>
                    <_Select.Value />
                    <SelectIcon>
                        <ChevronDownIcon />
                    </SelectIcon>
                </SelectTrigger>
                <_Select.Portal>
                    <SelectContent>
                        <SelectScrollUpButton>
                            <ChevronUpIcon />
                        </SelectScrollUpButton>
                        <SelectViewport>
                            {parameter.items.map((item, index) => {
                                return (
                                    <SelectItem key={index} value={item.value.toString()}>{item.label}</SelectItem>
                                )
                            }
                            )}
                        </SelectViewport>
                        <SelectScrollDownButton>
                            <ChevronDownIcon />
                        </SelectScrollDownButton>
                    </SelectContent>
                </_Select.Portal>
            </_Select.Root>
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

const SelectTrigger = styled(_Select.SelectTrigger, {
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

const SelectIcon = styled(_Select.SelectIcon, {
    // color: violet.violet11,
    borderColor: '$darkgray',
});

const SelectContent = styled(_Select.Content, {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 6,
    boxShadow:
        '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
});

const SelectViewport = styled(_Select.Viewport, {
    padding: 5,
});

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(({ children, ...props }, ref) => {
    return (
        <StyledItem {...props} ref={ref}>
            <_Select.ItemText>{children}</_Select.ItemText>
            <StyledItemIndicator>
                <CheckIcon />
            </StyledItemIndicator>
        </StyledItem>
    );
});


const StyledItem = styled(_Select.Item, {
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


const StyledItemIndicator = styled(_Select.ItemIndicator, {
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

const SelectScrollUpButton = styled(_Select.ScrollUpButton, scrollButtonStyles);

const SelectScrollDownButton = styled(_Select.ScrollDownButton, scrollButtonStyles);

export default BaseHeadSelect;