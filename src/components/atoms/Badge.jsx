import React from 'react'

const Badge = ({ 
  children, 
  variant = 'default', 
  color = 'gray',
  size = 'medium',
  className = '' 
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full"
  
  const sizes = {
    small: "px-2 py-0.5 text-xs",
    medium: "px-2.5 py-1 text-xs",
    large: "px-3 py-1.5 text-sm"
  }
  
  const variants = {
    default: `bg-${color}-100 text-${color}-800`,
    solid: `bg-${color}-500 text-white`,
    outline: `border border-${color}-200 text-${color}-700 bg-white`
  }
  
  const colorClasses = {
    gray: variant === 'solid' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-800',
    blue: variant === 'solid' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800',
    green: variant === 'solid' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800',
    yellow: variant === 'solid' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800',
    red: variant === 'solid' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800',
    purple: variant === 'solid' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-800',
    pink: variant === 'solid' ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-800',
    indigo: variant === 'solid' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-800',
  }

  return (
    <span className={`${baseClasses} ${sizes[size]} ${colorClasses[color]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge