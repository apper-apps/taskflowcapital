import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = ({ 
  label, 
  icon, 
  error, 
  className = '', 
  containerClassName = '',
  ...props 
}) => {
  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <input
          className={`
            block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 
            placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 
            focus:ring-primary-500/20 transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default Input