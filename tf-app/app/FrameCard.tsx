import React, { useEffect, useState } from 'react'
import ParameterInput from './ParameterInput'
import { Euler } from 'three'

const FrameCard: React.FC<{ frame: any; setFrame: (frame: any) => void; isWorld?: boolean; availableFrames: string[] }> = ({ frame, setFrame, isWorld, availableFrames }) => {
  const [localFrame, setLocalFrame] = useState(frame)

  useEffect(() => {
    if (!isWorld) {
      setLocalFrame(frame)
    }
  }, [frame, isWorld])

  const handleInputChange = (field, value) => {
    const updatedFrame = { ...localFrame, [field]: value }
    setLocalFrame(updatedFrame)
    setFrame(updatedFrame)
  }

  return (
    <div className={`p-4 mb-4 border rounded ${isWorld ? 'bg-gray-200' : 'bg-white'}`}>
      <div className="flex space-x-2 mb-4">
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Frame name</label>
          <input
            type="text"
            value={localFrame.name}
            onChange={(e) => !isWorld && handleInputChange('name', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            readOnly={isWorld}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Parent frame</label>
          <select
            value={localFrame.parent}
            onChange={(e) => !isWorld && handleInputChange('parent', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={isWorld}
          >
            {isWorld ? (
              <option>None</option>
            ) : (
              availableFrames.map((parent) => (
                <option key={parent} value={parent}>
                  {parent}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        <ParameterInput variable="x" name="X" value={localFrame.x} min={-10} max={10} step={0.1} onChange={(param, value) => handleInputChange(param, value)} />
        <ParameterInput variable="y" name="Y" value={localFrame.y} min={-10} max={10} step={0.1} onChange={(param, value) => handleInputChange(param, value)} />
        <ParameterInput variable="z" name="Z" value={localFrame.z} min={-10} max={10} step={0.1} onChange={(param, value) => handleInputChange(param, value)} />
      </div>

      <div className="flex space-x-2 mb-4">
        <ParameterInput variable="roll" name="Roll" value={localFrame.roll} min={-180} max={180} step={1} onChange={(param, value) => handleInputChange(param, value)} />
        <ParameterInput variable="pitch" name="Pitch" value={localFrame.pitch} min={-180} max={180} step={1} onChange={(param, value) => handleInputChange(param, value)} />
        <ParameterInput variable="yaw" name="Yaw" value={localFrame.yaw} min={-180} max={180} step={1} onChange={(param, value) => handleInputChange(param, value)} />
      </div>
    </div>
  )
}

export default FrameCard
