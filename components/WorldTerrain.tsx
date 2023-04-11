import {memo, useRef, useEffect} from 'react'


function WorldTerrain({size, getInfo}) {
  const canvasElementRef = useRef(null)

  useEffect(() => {
    const context = canvasElementRef.current!.getContext('2d')

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        context.fillStyle = getInfo(x, y).color
        context.fillRect(x, y, 1, 1)
      }
    }

    return () => context.clearRect(0, 0, size, size)
  }, [size, getInfo])

  return (
    <div>
      <canvas width={size} height={size} ref={canvasElementRef} />
    </div>
  )
}

export default memo(WorldTerrain)
