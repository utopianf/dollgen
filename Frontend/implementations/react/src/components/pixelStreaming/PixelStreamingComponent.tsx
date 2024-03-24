import React, { useContext, useEffect, useRef } from 'react'

import {
  Config,
  PixelStreaming,
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4'

import { PixelStreamingContext } from './PixelStreamingProvider'
import { styled } from '../../core/stitches'
import { PitchSlider } from '../slider/PitchSlider'
import { YawSlider } from '../slider/YawSlider'
import { ZoomSlider } from '../slider/ZoomSlider'

const PixelStreamingComponent: React.FC = () => {
  const videoParentRef = useRef<HTMLDivElement | null>(null)
  const clickToPlayRef = useRef<HTMLDivElement | null>(null)

  const { setPixelStreaming } = useContext(PixelStreamingContext)
  useEffect(() => {
    if (videoParentRef.current) {
      const config = new Config({
        initialSettings: {
          AutoConnect: true,
          AutoPlayVideo: true,
          StartVideoMuted: true,
          ss: 'ws://localhost',
          // ss: 'ws://125.195.168.137',
        },
      })

      const _pixelStreaming = new PixelStreaming(config, {
        videoElementParent: videoParentRef.current,
      })

      _pixelStreaming.addEventListener('playStreamRejected', () => {
        if (clickToPlayRef.current) {
          clickToPlayRef.current.className = 'visible'
          clickToPlayRef.current.onclick = () => {
            _pixelStreaming.videoElementParent.style.position = 'relative'
            _pixelStreaming.play()
            if (clickToPlayRef.current) {
              clickToPlayRef.current.className = ''
              clickToPlayRef.current.onclick = null
              clickToPlayRef.current.style.display = 'none'
            }
          }
        }
      })

      // _pixelStreaming.addEventListener('handle_responses', () => {

      // })

      setPixelStreaming(_pixelStreaming)
    }
  }, [])

  return (
    <>
      <VideoContainer ref={videoParentRef}></VideoContainer>
      <YawContainer><YawSlider /></YawContainer>
      <ZoomContainer><ZoomSlider /></ZoomContainer>
      <PitchContainer><PitchSlider /></PitchContainer>
      {/* <div ref={clickToPlayRef} className="clickToPlay">
        <div>Click to play</div>
      </div> */}
    </>
  )
}

const VideoContainer = styled('div', {
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
})

// Put YawSlider, ZoomSlider, PitchSlider at the right bottom corner of the container and above the video
const ZoomContainer = styled('div', {
  position: 'absolute',
  bottom: 0,
  right: 0,
})

const YawContainer = styled('div', {
  position: 'absolute',
  bottom: 0,
  right: 0,
  marginBottom: 30,
})


const PitchContainer = styled('div', {
  position: 'absolute',
  bottom: 0,
  right: 0,
  marginBottom: 60,
})

export default PixelStreamingComponent
