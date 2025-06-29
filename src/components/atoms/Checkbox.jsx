import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  size = 'medium',
  className = '',
  ...props 
}) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5', 
    large: 'w-6 h-6'
  }
  
  const iconSizes = {
    small: 12,
    medium: 16,
    large: 20
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <div
        className={`
          ${sizes[size]} rounded border-2 cursor-pointer transition-all duration-200
          ${checked 
            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 border-primary-500' 
            : 'bg-white border-gray-300 hover:border-primary-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          focus:ring-2 focus:ring-primary-500/20
        `}
        onClick={() => !disabled && onChange?.({ target: { checked: !checked } })}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center w-full h-full"
          >
            <ApperIcon name="Check" size={iconSizes[size]} className="text-white" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Checkbox