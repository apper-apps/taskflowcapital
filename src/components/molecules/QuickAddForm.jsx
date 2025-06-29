import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

const QuickAddForm = ({ onAddTask, categories = [] }) => {
  const [title, setTitle] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const newTask = {
      title: title.trim(),
      category: category || 'General',
      priority,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date(),
      completedAt: null
    }

    onAddTask(newTask)
    setTitle('')
    setCategory('')
    setPriority('medium')
    setDueDate('')
    setIsExpanded(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isExpanded && title.trim()) {
        handleSubmit(e)
      }
    }
    if (e.key === 'Escape') {
      setIsExpanded(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Add a new task... (Press Enter to save, Tab for more options)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            onFocus={() => setIsExpanded(true)}
            icon="Plus"
            className="text-lg"
            autoFocus
          />
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim()}
              icon="Plus"
            >
              Add Task
            </Button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default QuickAddForm