// Copyright Epic Games, Inc. All Rights Reserved.

import React from 'react';
import { ParameterProvider } from './parameter/ParameterProvider'
import { PixelStreamingWrapper } from './pixelStreaming/PixelStreamingWrapper';

export const App = () => {
    return (
        <ParameterProvider>
            <div
                style={{
                    height: '100%',
                    width: '100%'
                }}
            >
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
            </div>
        </ParameterProvider>
    );
};
