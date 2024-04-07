import React, { useContext } from 'react';

import * as _Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import { styled } from '../../core/stitches';
import ParameterContext, { CheckboxGroupParameter, CheckboxParameter } from '../parameter/ParameterProvider';

interface BaseCheckboxProps {
    label: string
    checked?: boolean
    setChecked?: (checked: boolean) => void
}

interface CheckboxGroupProps {
    name: string
}

export const BaseCheckbox = ({ label, checked, setChecked }: BaseCheckboxProps) => (
    <form>
        <Flex css={{ alignItems: 'center' }}>
            <CheckboxRoot defaultChecked id="c1" checked={checked} onCheckedChange={setChecked}>
                <CheckboxIndicator>
                    <CheckIcon />
                </CheckboxIndicator>
            </CheckboxRoot>
            <Label css={{ paddingLeft: 15 }} htmlFor="c1">
                {label}
            </Label>
        </Flex>
    </form>
);

export const Checkbox = ({ name }: CheckboxGroupProps) => {
    const { parameters, updateCheckboxParameterValue } = useContext(ParameterContext)
    const parameter = parameters.find((param) => (param.name === name) && (param.type === "checkbox")) as CheckboxParameter

    if (!parameter) {
        return null
    }
    return (
        <>
            <CheckboxLabel>{parameter.label}</CheckboxLabel>
            <BaseCheckbox label={parameter.label} checked={parameter.checked} setChecked={() => updateCheckboxParameterValue(name, !parameter.checked)} />
        </>
    )
}

export const CheckboxGroup = ({ name }: CheckboxGroupProps) => {
    const { parameters, updateCheckboxParameterValue } = useContext(ParameterContext)
    const parameter = parameters.find((param) => (param.name === name) && (param.type === "checkbox_group")) as CheckboxGroupParameter

    if (!parameter) {
        return null
    }
    return (
        <>
            <CheckboxLabel>{parameter.label}</CheckboxLabel>
            <FlexRow>
                {parameter.items.map(({ name, label, checked }, index) => (
                    <BaseCheckbox key={index} label={label} checked={checked} setChecked={() => updateCheckboxParameterValue(name, !checked)} />
                ))}
            </FlexRow>
        </>
    )
}

const CheckboxRoot = styled(_Checkbox.Root, {
    all: 'unset',
    backgroundColor: 'white',
    width: 18,
    height: 18,
    borderRadius: 4,
    border: `1px solid $darkgray`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // boxShadow: `0 2px 10px ${blackA.blackA4}`,
    // '&:hover': { backgroundColor: violet.violet3 },
    // '&:focus': { boxShadow: `0 0 0 2px black` },
    [`&[data-state=checked]`]: {
        backgroundColor: '$darkgray',
    }
});

const CheckboxIndicator = styled(_Checkbox.Indicator, {
    color: "$darkgray",
    [`&[data-state=checked]`]: {
        color: 'white',
    }
});

const Label = styled('label', {
    color: '$darkgray',
    fontSize: 15,
    lineHeight: 1,
});

const Flex = styled('div', { display: 'flex' });

const CheckboxLabel = styled(Label, {
    fontSize: 13,
    lineHeight: 1,
    fontWeight: 500,
    marginBottom: 5,
    display: 'block',
})
const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    gap: 25
})
