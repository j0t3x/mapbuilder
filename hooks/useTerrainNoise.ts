import {useCallback} from 'react'
import useBoxGradient from '@/hooks/useBoxGradient'
import terrainType from '@/libs/terrain-types'
import useFractalNoise from '@/hooks/useFractalNoise'

export default function useTerrainNoise({
  size,
  blur,
  octaves,
  frequency,
  persistence,
  terrainNoise,
  variantNoise
}) {

  const getBorderGradientValue = useBoxGradient({size, blur})

  const getTerrainNoise = useFractalNoise({
    octaves,
    frequency,
    persistence,
    noise: terrainNoise
  })

  const getVariantNoise = useFractalNoise({
    octaves,
    frequency,
    persistence,
    noise: variantNoise
  })

  const getInfo = useCallback(
    (x, y) => {
      const terrainNoise =
        (getTerrainNoise(x, y) + 1) / 2 + (getBorderGradientValue(x, y) - 1)

      const info = {
        x,
        y,
        type: null,
        color: null,
        variantNoise: null,
        terrainNoise: terrainNoise
      }

      if (terrainNoise < 0.2) {
        //water
        info.color = '#000'
        info.type = terrainType.OCEAN
      } else if (terrainNoise < 0.4) {
        //water
        info.color = '#000'
        info.type = terrainType.SEA
      } else if (terrainNoise < 0.45) {
        //sand
        const variantNoise = getVariantNoise(x, y)
        info.variantNoise = variantNoise

        if (variantNoise < -0.2) {
          info.color = '#867645'
          info.type = terrainType.OTHER_LAND
        } else if (variantNoise < 0.2) {
          info.color = '#a49463'
          info.type = terrainType.LAND
        } else {
          info.color = '#c2b281'
          info.type = terrainType.MUSHROOM
        }
      } else if (terrainNoise < 0.6) {
        //grass
        const variantNoise = getVariantNoise(x, y)
        info.variantNoise = variantNoise

        if (variantNoise < -0.2) {
          info.color = '#284d00'
          info.type = terrainType.FLOWER
        } else if (variantNoise < 0.2) {
          info.color = '#3c6114'
          info.type = terrainType.SMALL_GRASS
        } else {
          info.color = '#5a7f32'
          info.type = terrainType.BIG_GRASS
        }
      } else {
        //mountain
        const variantNoise = getVariantNoise(x, y)
        info.variantNoise = variantNoise

        if (variantNoise < -0.2) {
          info.color = '#ebebeb'
          info.type = terrainType.TREE
        } else if (variantNoise < 0.2) {
          info.color = '#8c8e7b'
          info.type = terrainType.TREE_LARGE
        } else {
          info.color = '#a0a28f'
          info.type = terrainType.HIDDEN_GRASS
        }
      }

      return info
    },
    [getTerrainNoise, getVariantNoise, getBorderGradientValue]
  )

  return getInfo
}
