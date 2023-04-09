import React from 'react'

interface InputFieldProps {
  labelName: string
  type: string
  name: string
  placeholder: string
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  additionalButton?: boolean
  handleAdditionalButton?: () => void
}

export const InputField: React.FC<InputFieldProps> = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  additionalButton,
  handleAdditionalButton,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {labelName}
      </label>
      {additionalButton && (
        <button
          type="button"
          onClick={handleAdditionalButton}
          className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black"
        >
          Randomize
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4dd100] focus:border-[#4dd100] outline-none block w-full p-3"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
)
