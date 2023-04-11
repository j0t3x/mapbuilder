import {useMemo, useState, useCallback} from 'react'

export default function useFractalNoise({
  octaves,
  persistence,
  noise,
  frequency
}) {
  const [cache, setCache] = useState({})

  const getNoise = useMemo(() => {
    return newFractalNoise({
      noise,
      octaves,
      frequency,
      persistence
    })
  }, [octaves, frequency, persistence, noise])

  return useCallback(
    (x, y) => {
      const id = `${x}:${y}`

      if (cache[id] == null) {
        setCache(Object.assign(cache, {[id]: getNoise(x, y)}))
      }

      return cache[id]
    },
    [cache, getNoise]
  )
}

function newFractalNoise(info) {
  const {
    noise,
    octaves = 1,
    amplitude = 1.0,
    frequency = 1.0,
    persistence = .5
  } = info

  return function getFractalNoise(x, y) {
    let value = 0.0

    for (let octave = 0; octave < octaves; octave++) {
      let freq = frequency * Math.pow(2, octave)

      value += noise(
        x * freq,
        y * freq
      ) * (amplitude * Math.pow(persistence, octave))
    }

    return value / (2 - 1 / Math.pow(2, octaves - 1))
  }
}
