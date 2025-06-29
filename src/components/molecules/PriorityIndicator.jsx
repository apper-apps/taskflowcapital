import React from 'react'
import { motion } from 'framer-motion'

const PriorityIndicator = ({ priority = 'medium', size = 'medium', showLabel = false }) => {
  const configs = {
    high: {
      color: 'bg-red-500',
      label: 'High',
      gradient: 'from-red-400 to-red-600'
    },
    medium: {
      color: 'bg-yellow-500',
      label: 'Medium', 
      gradient: 'from-yellow-400 to-yellow-600'
    },
    low: {
      color: 'bg-green-500',
      label: 'Low',
      gradient: 'from-green-400 to-green-600'
    }
  }
  
  const sizes = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4'
  }
  
  const config = configs[priority] || configs.medium

  return (
    <div className="flex items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.2 }}
        className={`
          ${sizes[size]} rounded-full bg-gradient-to-r ${config.gradient}
          shadow-sm animate-pulse-soft
        `}
        title={`${config.label} Priority`}
      />
      {showLabel && (
        <span className="text-xs font-medium text-gray-600">
          {config.label}
        </span>
      )}
    </div>
  )
}

export default PriorityIndicator