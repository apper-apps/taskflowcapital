import React from 'react'
import { motion } from 'framer-motion'

const Loading = ({ type = 'tasks', count = 3 }) => {
  const TaskSkeleton = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-5 h-5 bg-gray-200 rounded mt-1 animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-3">
            <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )

  const CategorySkeleton = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        </div>
        <div className="h-6 w-8 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {type === 'tasks' && <TaskSkeleton />}
          {type === 'categories' && <CategorySkeleton />}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Loading