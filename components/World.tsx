import WorldTerrain from '@/components/WorldTerrain'

export default function World({size, terrainInfo}) {
  return (
    <div style={{width: size, height: size}}>
      <WorldTerrain size={size} getInfo={terrainInfo} />
    </div>
  )
}
