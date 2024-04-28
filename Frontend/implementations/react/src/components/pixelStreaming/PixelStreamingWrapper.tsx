// Copyright Epic Games, Inc. All Rights Reserved.

import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Config,
    AllSettings,
    PixelStreaming,
    Logger
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.2';
import { PixelStreamingContext } from './PixelStreamingProvider';
import ParameterContext from '../parameter/ParameterProvider';

export interface PixelStreamingWrapperProps {
    initialSettings?: Partial<AllSettings>;
}

export const PixelStreamingWrapper = ({
    initialSettings
}: PixelStreamingWrapperProps) => {
    const { init } = useContext(ParameterContext)
    // A reference to parent div element that the Pixel Streaming library attaches into:
    const videoParent = useRef<HTMLDivElement>(null);

    // Pixel streaming library instance is stored into this state variable after initialization:
    const { pixelStreaming, setPixelStreaming } = useContext(PixelStreamingContext)

    // A boolean state variable that determines if the Click to play overlay is shown:
    const [clickToPlayVisible, setClickToPlayVisible] = useState(false);

    // Run on component mount:
    useEffect(() => {
        if (videoParent.current) {
            console.log('PixelStreamingWrapper: videoParent.current', videoParent.current)
            // Attach Pixel Streaming library to videoParent element:
            const config = new Config({ initialSettings });
            const streaming = new PixelStreaming(config, {
                videoElementParent: videoParent.current
            });

            // register a playStreamRejected handler to show Click to play overlay if needed:
            streaming.addEventListener('playStreamRejected', () => {
                setClickToPlayVisible(true);
            });

            streaming.addResponseEventListener('responseListener', (response) => {
                // Logger.Log(Logger.GetStackTrace(), `Response received: ${response}`, Logger.verboseLogLevel);
                init(JSON.parse(response).parameters)
            });

            // Save the library instance into component state so that it can be accessed later:
            setPixelStreaming(streaming);

            // Clean up on component unmount:
            return () => {
                try {
                    streaming.disconnect();
                } catch { }
            };
        }
    }, []);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative'
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%'
                }}
                ref={videoParent}
            />
            {clickToPlayVisible && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        if (clickToPlayVisible && pixelStreaming) {
                            pixelStreaming.play();
                            setClickToPlayVisible(false);
                            pixelStreaming.emitUIInteraction({ command: "init" })
                        }
                    }}
                >
                    <div>Click to play</div>
                </div>
            )}
        </div>
    );
};
