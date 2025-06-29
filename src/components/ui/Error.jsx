import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  showRetry = true,
  icon = "AlertTriangle"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6 shadow-lg"
      >
        <ApperIcon name={icon} className="w-8 h-8 text-white" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-gray-900 mb-2 text-center"
      >
        Oops! Something went wrong
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 text-center mb-8 max-w-md"
      >
        {message}
      </motion.p>

      {showRetry && onRetry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onRetry}
            icon="RefreshCw"
            className="shadow-lg hover:shadow-xl"
          >
            Try Again
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Error