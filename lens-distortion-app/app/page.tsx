"use client"

import { useState } from 'react'
import Sidebar from './sidebar'
import ScatterPlot from './scatterplot'

export default function HomePage() {
  const [params, setParams] = useState({ d1: 0.0, d2: 0.0, d3: 0.0, d4: 0.0, d5: 0.0 })
  const [model, setModel] = useState('plumbBob')

  return (
    <div className="flex w-full h-screen">
      <Sidebar params={params} setParams={setParams} setModel={setModel} />
      <main className="flex-grow p-4">
        <ScatterPlot params={params} model={model} />
      </main>
    </div>
  )
}
