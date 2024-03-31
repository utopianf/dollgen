// Copyright Epic Games, Inc. All Rights Reserved.

import React from 'react';
import { ParameterProvider } from './parameter/ParameterProvider'
import { PixelStreamingWrapper } from './pixelStreaming/PixelStreamingWrapper';
import { Panel } from './panel/Panel'

import { styled } from '../core/stitches'

export const App = () => {
    return (
        <ParameterProvider>
            <div
                style={{
                    height: '100%',
                    width: '100%'
                }}
            >
                <Main>
                    <StreamContainer>
                        <PixelStreamingWrapper
                            initialSettings={{
                                AutoPlayVideo: true,
                                AutoConnect: true,
                                ss: 'ws://localhost:80',
                                StartVideoMuted: true,
                                HoveringMouse: true,
                                WaitForStreamer: true
                            }}
                        />
                    </StreamContainer>
                    <PanelConatainer>
                        <Panel />
                    </PanelConatainer>
                </Main>
            </div>
        </ParameterProvider>
    );
};

const Main = styled('div', {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
    height: 'calc(100vh - 180px - 30px)',
    width: '100vw',
    backgroundColor: '$ultralightgray'
})

const StreamContainer = styled('div', {
    width: 800,
    height: '100%',
    position: 'absolute',
    left: 'calc(50% - 560px)',
    // backgroundColor: 'Blue',
})

const PanelConatainer = styled('div', {
    // display: 'flex',
    width: 300,
    height: '100%',
    position: 'absolute',
    left: 'calc(50% + 240px + 20px)',
})

export default App