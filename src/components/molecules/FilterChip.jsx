import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const FilterChip = ({ 
  label, 
  active = false, 
  onClick, 
  icon, 
  count,
  color = 'gray',
  className = '' 
}) => {
  const colorClasses = {
    gray: active ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    blue: active ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    green: active ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200',
    yellow: active ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    red: active ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200',
    purple: active ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    pink: active ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-700 hover:bg-pink-200',
    indigo: active ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium 
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20
        ${colorClasses[color]}
        ${className}
      `}
    >
      {icon && (
        <ApperIcon name={icon} className="w-4 h-4 mr-1.5" />
      )}
      {label}
      {count !== undefined && (
        <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
          active ? 'bg-white/20' : 'bg-white/80 text-gray-600'
        }`}>
          {count}
        </span>
      )}
    </motion.button>
  )
}

export default FilterChip