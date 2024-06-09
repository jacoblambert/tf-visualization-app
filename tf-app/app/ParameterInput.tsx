import React from 'react'

const ParameterInput: React.FC<{ variable: string; name: string; value: number; min: number; max: number; step: number; onChange: (param: string, value: number) => void }> = ({ variable, name, value, min, max, step, onChange }) => {
  return (
    <div className="flex-1">
      <label htmlFor={variable} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {name}
      </label>
      <input
        type="number"
        id={variable}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(variable, parseFloat(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  )
}

export default ParameterInput
