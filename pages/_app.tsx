import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {
  KeyboardControls,
  KeyboardControlsEntry
} from '@react-three/drei'
import {useMemo} from 'react'



enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

export default function App({Component, pageProps}: AppProps) {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    {name: Controls.forward, keys: ['ArrowUp', 'KeyW']},
    {name: Controls.back, keys: ['ArrowDown', 'KeyS']},
    {name: Controls.left, keys: ['ArrowLeft', 'KeyA']},
    {name: Controls.right, keys: ['ArrowRight', 'KeyD']},
    {name: Controls.jump, keys: ['Space']},
  ], [])
  return (
    <KeyboardControls map={map}>
      <Component {...pageProps} />
    </KeyboardControls>
  )
}
