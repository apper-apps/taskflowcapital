import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No tasks yet",
  description = "Create your first task to get started with organizing your day!",
  actionText = "Add Your First Task",
  onAction,
  icon = "CheckSquare"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-6"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-8 shadow-xl"
      >
        <ApperIcon name={icon} className="w-10 h-10 text-white" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-gray-900 mb-3 text-center font-display"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 text-center mb-8 max-w-md leading-relaxed"
      >
        {description}
      </motion.p>

      {onAction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onAction}
            variant="accent"
            size="large"
            icon="Plus"
            className="shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            {actionText}
          </Button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-gray-400 mb-2">Pro tip:</p>
        <p className="text-sm text-gray-500">
          Use the quick add form above to rapidly create tasks with categories and priorities
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Empty