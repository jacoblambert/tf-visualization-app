// app/ParameterInput.tsx
import React from 'react'

interface ParameterInputProps {
  variable: string
  name: string
  value: number
  min: number
  max: number
  step: number
  onChange: (variable: string, value: number) => void
}

const ParameterInput: React.FC<ParameterInputProps> = ({ variable, name, value, min, max, step, onChange }) => {
  return (
    <div className="mb-4">
      <label className="flex items-center mb-2 text-base font-medium text-gray-900 dark:text-white">
      {name}:
        <input
          type="number"
          id={`${variable}-input`}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(variable, parseFloat(e.target.value))}
          aria-describedby={`${variable}-helper-text`}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ml-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(variable, parseFloat(e.target.value))}
        className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
      />
    </div>
  )
}

export default ParameterInput
