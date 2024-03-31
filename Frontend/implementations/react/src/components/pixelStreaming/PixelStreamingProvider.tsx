import { FC, PropsWithChildren, createContext, useState } from 'react'

import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4'

type PixelStreamingContextType = {
  pixelStreaming: PixelStreaming | undefined
  setPixelStreaming: (pixelStreaming: PixelStreaming) => void
}

export const PixelStreamingContext = createContext<PixelStreamingContextType>({
  pixelStreaming: undefined,
  setPixelStreaming: () => { },
})

export const PixelStreamingProvider: FC<PropsWithChildren> = ({ children }) => {
  const [pixelStreaming, setPixelStreaming] = useState<PixelStreaming | undefined>()

  return (
    <PixelStreamingContext.Provider
      value={{ pixelStreaming, setPixelStreaming }}
    >
      {children}
    </PixelStreamingContext.Provider>
  )
}
