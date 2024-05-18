import { useContext } from 'react';

import { BaseCheckbox } from './Checkbox';
import { styled } from '../../core/stitches';
import ParameterContext, {
    CheckboxParameter
} from '../parameter/ParameterProvider';

export const GridCheckbox = () => {
    const { parameters, updateCheckboxParameterValue } =
        useContext(ParameterContext);
    const parameter = parameters.find(
        (param) => param.name === 'grid' && param.type === 'checkbox'
    ) as CheckboxParameter;

    if (!parameter) {
        return null;
    }
    return (
        <GridCheckboxContainer>
            ワイヤフレームを表示する？
            <BaseCheckbox
                label="はい"
                checked={parameter.checked}
                setChecked={(checked) =>
                    updateCheckboxParameterValue('grid', checked)
                }
            />
        </GridCheckboxContainer>
    );
};

const GridCheckboxContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'left',
    font: 'normal normal normal 14px/17px Adobe Clean Han',
    letterSpacing: 0
    // position: 'absolute',
    // bottom: '90px',
    // right: '5px'
});
