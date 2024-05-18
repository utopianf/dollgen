import { useContext } from 'react';

import { BaseCheckbox } from './Checkbox';
import { styled } from '../../core/stitches';
import ParameterContext, {
    CheckboxParameter
} from '../parameter/ParameterProvider';

export const MakeupCheckbox = () => {
    const { parameters, updateCheckboxParameterValue } =
        useContext(ParameterContext);
    const parameter = parameters.find(
        (param) => param.name === 'makeup' && param.type === 'checkbox'
    ) as CheckboxParameter;

    if (!parameter) {
        return null;
    }
    return (
        <MakeupCheckboxContainer>
            メイクを表示する？
            <BaseCheckbox
                label="はい"
                checked={parameter.checked}
                setChecked={(checked) =>
                    updateCheckboxParameterValue('makeup', checked)
                }
            />
        </MakeupCheckboxContainer>
    );
};

const MakeupCheckboxContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    position: 'absolute',
    bottom: '70px',
    right: '5px'
});
