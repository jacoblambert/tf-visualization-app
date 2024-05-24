"use client"

import React, { useState } from 'react'
import ParameterInput from './ParameterInput'

const Sidebar: React.FC<{ params: any; setParams: (params: any) => void; setModel: (model: string) => void }> = ({ params, setParams, setModel }) => {
  const [model, setModelState] = useState('plumbBob')

  const handleModelChange = (selectedModel: string) => {
    setModelState(selectedModel)
    setModel(selectedModel)  // Ensure the parent state is also updated
    // Reset parameters based on model presets
    if (selectedModel === 'plumbBob') {
      setParams({ d1: 0.0, d2: 0.0, d3: 0.0, d4: 0.0, d5: 0.0 })
    } else {
      setParams({ d1: 0.0, d2: 0.0, d3: 0.0, d4: 0.0, d5: 0.0 })
    }
  }

  const handleParamChange = (param: string, value: number) => {
    setParams((prevParams: any) => ({ ...prevParams, [param]: value }))
  }

  return (
    <aside className="w-1/5 mb-4 lg:block col-span-1 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-5">
      <label
        htmlFor="presets"
        className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
        Select your Camera Model
      </label>

      <div className="inline-flex rounded-md shadow-sm mb-4" role="group">
        <button
          type="button"
          className={`py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border 
          font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10 focus:outline-solid focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:p-4 ${
            model === 'plumbBob' ? 'bg-gray-200 text-black' : ''
          }`}
          onClick={() => handleModelChange('plumbBob')}
        >
          <svg className="w-[24px] h-[24px] text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
          </svg>
          Plumb Bob
        </button>
        <button
          type="button"
          className={`py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border 
          font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:p-4 ${
            model === 'fisheye' ? 'bg-gray-900 text-black' : ''
          }`}
          onClick={() => handleModelChange('fisheye')}
        >
          <svg className="w-[24px] h-[24px] text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2.2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
            <path stroke="currentColor" strokeWidth="2.2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>
          Fisheye
        </button>
      </div>

      <form className="mb-4">
        <label
          htmlFor="presets"
          className="block mb-2 text-l font-medium text-gray-900 dark:text-white"
        >
          Select a Preset (Optional)
        </label>
        {model === 'plumbBob' && (
          <select
            id="presets"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled selected>Choose a preset</option>
            <option value="preset1">C1</option>
            <option value="preset2">Lucid</option>
          </select>
        )}
        {model === 'fisheye' && (
          <select
            id="presets"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled selected>Choose a preset</option>
            <option value="preset1">C1 120</option>
            <option value="preset2">Willfire</option>
          </select>
        )}
      </form>

      <label
        htmlFor="presets"
        className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
      >
        Set Distortion Parameters
      </label>
      <ParameterInput
        variable="d1"
        name="K1"
        value={params.d1}
        min={-1}
        max={1}
        step={0.01}
        onChange={handleParamChange}
      />
      <ParameterInput
        variable="d2"
        name="K2"
        value={params.d2}
        min={-0.5}
        max={0.5}
        step={0.005}
        onChange={handleParamChange}
      />
      <ParameterInput
        variable="d3"
        name={model === 'plumbBob' ? 'P1' : 'K3'}
        value={params.d3}
        min={-0.5}
        max={0.5}
        step={0.005}
        onChange={handleParamChange}
      />
      <ParameterInput
        variable="d4"
        name={model === 'plumbBob' ? 'P2' : 'K4'}
        value={params.d4}
        min={-0.5}
        max={0.5}
        step={0.005}
        onChange={handleParamChange}
      />
      {model === 'plumbBob' && (
        <ParameterInput
          variable="d5"
          name="K3"
          value={params.d5}
          min={-0.5}
          max={0.5}
          step={0.005}
          onChange={handleParamChange}
        />
      )}
    </aside>
  )
}

export default Sidebar
