import {useMemo} from "react"
import {makeNoise2D} from "open-simplex-noise"

export default function useNoise2D(props) {
  const {seed} = props

  return useMemo(() => {
    return makeNoise2D(seed)
  }, [seed])
}
