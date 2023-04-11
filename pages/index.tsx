import {useMemo, useRef} from 'react'
import {Inter} from 'next/font/google'
import {Canvas, useFrame} from '@react-three/fiber'
import {
  Gltf,
  CameraControls,
  Grid
} from '@react-three/drei'
import World from '@/components/World'
import {Range} from 'react-range';
import {useState} from 'react'
import chance from 'chance'
import useNoise2D from '@/hooks/useNoise2D'
import useTerrainNoise from '@/hooks/useTerrainNoise'
import terrainType from '@/libs/terrain-types'

const inter = Inter({subsets: ['latin']})


function MapBuilder({getInfo, size, spacing}) {
  const offset = size * spacing / 2
  const features = []
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const t = getInfo(x, y).type
      let render = true
      switch (t) {
        case 'nothing': {
          continue
          break;
        }
        case terrainType.OTHER_LAND: {
          render = Math.random() > .8
          break;
        }
        case terrainType.LAND: {
          render = Math.random() > .9
          break;
        }
        case terrainType.MUSHROOM: {
          render = Math.random() > .98
          break;
        }
        case terrainType.FLOWER: {
          render = Math.random() > .99
          break;
        }
        case terrainType.SMALL_GRASS: {
          render = Math.random() > .9
          break;
        }
        case terrainType.BIG_GRASS: {
          render = Math.random() > .5
          break;
        }
        case terrainType.TREE: {
          render = Math.random() > .8
          break;
        }
        case terrainType.TREE_LARGE: {
          render = Math.random() > .9
          break;
        }
        case terrainType.HIDDEN_GRASS: {
          render = Math.random() > .6
          break;
        }
        default: {
          //statements; 
          break;
        }
      }
      if (!render) continue
      features.push({
        x: x * spacing - offset,
        y: y * spacing - offset,
        asset: Array.isArray(t) ? t[~~(Math.random() * t.length)] : t
      })
    }
  }


  return features.map(({x, y, asset}, index) => {
    return <Gltf key={index} src={asset} position={[x, 0, y]} />
  })
}

export default function Home() {

  const random = chance(`${Math.random()}`)
  const [terrainSeed, setTerrainSeed] = useState(0)
  const [size, setSize] = useState(500)
  const [spacing, setSppacing] = useState(.2)

  function handleClick() {
    setTerrainSeed(random.integer({min: 1000, max: 9999}))
  }

  const terrainVariantSeed = random.integer({min: 1000, max: 9999})

  const getTerrainInfo = useTerrainNoise({
    size,
    blur: 100,
    octaves: 20,
    frequency: 0.00625,
    persistence: 0.6,
    terrainNoise: useNoise2D({seed: terrainSeed}),
    variantNoise: useNoise2D({seed: terrainVariantSeed})
  })

  return (
    <main className="grid grid-rows-2 grid-flow-col min-h-full min-w-full">
      <div className="row-span-3 col-span-2 min-h-full">
        <div className="min-h-full min-w-full"
          style={{position: "relative", width: size, height: size}}>
          <Canvas
            camera={{position: [-2.5, 1, 17.5]}}
          >
            <color attach="background" args={['#fff']} />
            <ambientLight intensity={0.9} />
            <spotLight position={[50, 50, 50]} angle={0} penumbra={1} />
            <pointLight position={[0, 0, 0]} />
            <MapBuilder getInfo={getTerrainInfo} size={size} spacing={spacing} />
            <Grid infiniteGrid={true} />
            <CameraControls makeDefault />
          </Canvas>
        </div>
      </div>
      <div className="grid place-content-center bg-[#000]">
        <div className='grid place-content-center bg-[#000]'>
          <World
            size={size}
            // cloudsSeed={3964}
            terrainInfo={getTerrainInfo}
          // cloudsVariantSeed={7829}
          // terrainVariantSeed={3333}
          />
        </div>
      </div>
      <div className="row-span-2 col-span-1 min-h-full">
        <div className="min-h-full min-w-full">
          <button className='rounded-full-lg bg-indigo-500 text-white' onClick={handleClick}>Randomize</button>
          <p>Seed: {terrainSeed}</p>
          <p>Spacing: {spacing}</p>
          <p>Size: {size}</p>
        </div>
      </div>
    </main>
  )
}
