import {useEffect, useRef} from 'react'
import useNoise2D from "@/hooks/useNoise2D"
import useCloudsNoise from "@/hooks/useCloudsNoise"

export default function WorldClouds(props) {
  const {size, cloudsSeed, variantSeed} = props

  const canvasElementRef = useRef(null)

  const getInfo = useCloudsNoise({
    size,
    blur: 50,
    octaves: 20,
    frequency: 0.01,
    persistence: 0.6,
    cloudsNoise: useNoise2D({seed: cloudsSeed}),
    variantNoise: useNoise2D({seed: variantSeed})
  })

  useEffect(() => {
    const context = canvasElementRef.current.getContext("2d")

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const info = getInfo(x, y)
        if (info.color == null) continue

        context.fillStyle = "#000000"
        context.fillRect(x + 10, y + 10, 1, 1)

        context.fillStyle = info.color
        context.fillRect(x, y, 1, 1)
      }
    }

    return () => context.clearRect(0, 0, size, size)
  }, [size, getInfo])

  return (
    <div className="AppWorldLayer AppWorldClouds">
      <canvas width={size} height={size} ref={canvasElementRef} />
    </div>
  )
}
