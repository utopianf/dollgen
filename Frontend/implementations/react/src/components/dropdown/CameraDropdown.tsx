import BaseDropdown from './Dropdown';
import { styled } from '../../core/stitches';

export const CameraDropdown = () => {
    return (
        <CameraDropdownContainer>
            <CameraDropdownLabel>視点対象</CameraDropdownLabel>
            <BaseDropdown name="camera" />
        </CameraDropdownContainer>
    );
};

const CameraDropdownContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14
    // position: 'absolute',
    // bottom: '30px',
    // right: '5px'
});

const CameraDropdownLabel = styled('div', {
    fontSize: 12
});
