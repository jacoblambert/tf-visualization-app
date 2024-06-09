"use client"

import { useState } from 'react'
import Sidebar from './sidebar'
import ThreeScene from './threeScene'

export default function HomePage() {
  const [transformations, setTransformations] = useState([])

  return (
    <div className="flex w-full h-screen">
      <Sidebar transformations={transformations} setTransformations={setTransformations} />
      <main className="flex-grow p-4">
        <ThreeScene transformations={transformations} />
      </main>
    </div>
  )
}
