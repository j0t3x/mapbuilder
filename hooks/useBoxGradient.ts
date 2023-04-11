import {useMemo} from 'react'

export default function useBoxGradient({blur, size}) {

  return useMemo(() => {
    return newGradient({blur, size})
  }, [blur, size])
}

function newGradient(info = {}) {
  const blur = info.blur
  const size = info.size - 1

  const minCoordBlur = blur
  const maxCoordBlur = size - blur

  return function getValue(x = Infinity, y = Infinity) {
    const {coord} = [{
      coord: x,
      distance: x
    }, {
      coord: y,
      distance: y
    }, {
      coord: x,
      distance: size - x
    }, {
      coord: y,
      distance: size - y
    }].reduce((minCoordDist, coord) => {
      if (minCoordDist === null) return coord

      return coord.distance < minCoordDist.distance
        ? coord
        : minCoordDist
    }, null)

    if (coord >= minCoordBlur && coord <= maxCoordBlur) return 1

    if (coord < minCoordBlur) return coord / minCoordBlur

    if (coord > maxCoordBlur) {
      return Math.max(0, (size - coord) / (size - maxCoordBlur))
    }
  }
}
