// Copyright Epic Games, Inc. All Rights Reserved.
import { useContext, useRef } from 'react';

import DataUpload from '@spectrum-icons/workflow/DataUpload';
import Refresh from '@spectrum-icons/workflow/Refresh';
import SaveTo from '@spectrum-icons/workflow/SaveTo';
import ShoppingCart from '@spectrum-icons/workflow/ShoppingCart';

import { Panel } from './panel/Panel';
import ParameterContext, {
    ParameterProvider
} from './parameter/ParameterProvider';
import { PixelStreamingProvider } from './pixelStreaming/PixelStreamingProvider';
import { PixelStreamingWrapper } from './pixelStreaming/PixelStreamingWrapper';
import { globalStyles, styled } from '../core/stitches';

export const App = () => {
    globalStyles();
    const { reset, load, save } = useContext(ParameterContext);
    const fileRef = useRef<HTMLInputElement>(null);
    return (
        <PixelStreamingProvider>
            <ParameterProvider>
                <div
                    style={{
                        height: '1440px',
                        width: '100wh'
                    }}
                >
                    <Main>
                        <StreamContainer>
                            <PixelStreamingWrapper
                                initialSettings={{
                                    AutoPlayVideo: false,
                                    AutoConnect: true,
                                    ss: 'ws://localhost',
                                    // ss: 'ws://app.doll-gen.com',
                                    StartVideoMuted: true,
                                    HoveringMouse: true
                                    // WaitForStreamer: true,
                                }}
                            />
                        </StreamContainer>
                        <PanelConatainer>
                            <Panel />
                        </PanelConatainer>
                        <SystemButtonsContainer>
                            <Button onClick={() => reset()}>
                                <Refresh />
                                Reset
                            </Button>
                            <input
                                ref={fileRef}
                                type="file"
                                onChange={load}
                                hidden
                            />
                            <Button onClick={() => fileRef.current?.click()}>
                                <DataUpload />
                                Load
                            </Button>
                            <Button onClick={() => save()}>
                                <SaveTo />
                                Save
                            </Button>
                            <Button>
                                <ShoppingCart />
                                Send to cart
                            </Button>
                        </SystemButtonsContainer>
                    </Main>
                </div>
            </ParameterProvider>
        </PixelStreamingProvider>
    );
};

const Button = styled('button', {
    backgroundColor: '$white 0% 0% no-repeat padding-box',
    color: '$basicblack',
    border: '2px solid $superlightgray',
    borderRadius: '12px',
    font: 'normal normal bold 12px/15px Adobe Clean',
    fontWeight: 'bold',
    fontSize: '$ssm',
    display: 'flex',
    '& svg': {
        marginRight: '2px',
        height: '16px',
        width: '16px'
    }
});

const Main = styled('div', {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
    height: '1320px',
    width: '1200px',
    left: 'calc(100vw / 2 - 570px)',
    backgroundColor: '$ultralightgray'
});

const StreamContainer = styled('div', {
    width: '880px',
    height: '100%',
    position: 'absolute',
    left: '0',
    backgroundColor: '#00f00070'
});

const PanelConatainer = styled('div', {
    // display: 'flex',
    width: '300px',
    height: '1240px',
    position: 'absolute',
    left: '900px'
    // backgroundColor: '#f0000070'
});

const SystemButtonsContainer = styled('div', {
    display: 'flex',
    width: '300px',
    height: '40px',
    flexDirection: 'row',
    marginTop: '15px',
    gap: '10px',
    position: 'absolute',
    left: '900px',
    bottom: '0',
    // backgroundColor: '#0000f070',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTop: '1px solid #222222',
    font: '$adobeClean'
});

export default App;
