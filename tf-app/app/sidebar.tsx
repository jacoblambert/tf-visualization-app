"use client"

import React, { useState } from 'react'
import FrameCard from './FrameCard'

const Sidebar: React.FC<{ transformations: any[]; setTransformations: (trans: any[]) => void }> = ({ transformations, setTransformations }) => {
  const [newFrame, setNewFrame] = useState({
    name: '',
    parent: 'world',
    x: 0,
    y: 0,
    z: 0,
    roll: 0,
    pitch: 0,
    yaw: 0,
  })

  const addTransformation = () => {
    setTransformations([...transformations, newFrame])
    setNewFrame({
      name: '',
      parent: 'world',
      x: 0,
      y: 0,
      z: 0,
      roll: 0,
      pitch: 0,
      yaw: 0,
    })
  }

  return (
    <aside className="w-1/4 mt-4 mb-4 ml-4 bg-gray-100 border border-gray-300 p-5 h-screen overflow-y-auto">
      <div>
        <FrameCard frame={{ name: 'World', parent: 'None', x: 0, y: 0, z: 0, roll: 0, pitch: 0, yaw: 0 }} setFrame={() => {}} isWorld={true} availableFrames={[]} />
      </div>
      {transformations.map((trans, index) => (
        <FrameCard key={index} frame={trans} setFrame={(frame) => {
          const updatedTransformations = [...transformations]
          updatedTransformations[index] = frame
          setTransformations(updatedTransformations)
        }} availableFrames={['world', ...transformations.map((t) => t.name)]} />
      ))}
      <button onClick={addTransformation} className="w-full p-2 mt-4 text-white bg-blue-500 rounded">
        Add new TF
      </button>
    </aside>
  )
}

export default Sidebar
