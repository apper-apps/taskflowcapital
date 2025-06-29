import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns'
import Checkbox from '@/components/atoms/Checkbox'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import PriorityIndicator from '@/components/molecules/PriorityIndicator'
import ApperIcon from '@/components/ApperIcon'

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const handleComplete = () => {
    onToggleComplete(task.Id)
  }

  const handleEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onEdit(task.Id, { title: editTitle.trim() })
    }
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    }
    if (e.key === 'Escape') {
      setEditTitle(task.title)
      setIsEditing(false)
    }
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString
    
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    if (isPast(date)) return `Overdue - ${format(date, 'MMM d')}`
    return format(date, 'MMM d, yyyy')
  }

  const getDueDateColor = (dateString) => {
    if (!dateString) return 'gray'
    
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString
    
    if (isPast(date) && !isToday(date)) return 'red'
    if (isToday(date)) return 'yellow'
    return 'blue'
  }

  const getCategoryColor = (category) => {
    const colors = {
      Work: 'blue',
      Personal: 'green', 
      Shopping: 'purple',
      Health: 'pink',
      General: 'gray'
    }
    return colors[category] || 'gray'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.01 }}
      className={`
        group bg-white rounded-xl border border-gray-200 p-4 shadow-sm 
        hover:shadow-md transition-all duration-200
        ${task.completed ? 'opacity-75' : ''}
      `}
    >
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="mt-1"
        >
          <Checkbox
            checked={task.completed}
            onChange={handleComplete}
            size="large"
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleEdit}
                  onKeyDown={handleKeyPress}
                  className="w-full text-lg font-medium bg-transparent border-b-2 border-primary-500 focus:outline-none"
                  autoFocus
                />
              ) : (
                <motion.h3
                  className={`
                    text-lg font-medium cursor-pointer
                    ${task.completed 
                      ? 'line-through text-gray-500' 
                      : 'text-gray-900 hover:text-primary-600'
                    }
                  `}
                  onClick={() => setIsEditing(true)}
                >
                  {task.title}
                </motion.h3>
              )}

              <div className="flex items-center gap-3 mt-2">
                <PriorityIndicator priority={task.priority} />
                
                <Badge 
                  color={getCategoryColor(task.category)}
                  size="small"
                >
                  {task.category}
                </Badge>

                {task.dueDate && (
                  <Badge 
                    color={getDueDateColor(task.dueDate)}
                    size="small"
                  >
                    <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
                    {formatDueDate(task.dueDate)}
                  </Badge>
                )}
              </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              <Button
                variant="ghost"
                size="small"
                icon="Edit"
                onClick={() => setIsEditing(true)}
                className="p-2"
              />
              <Button
                variant="ghost"
                size="small"
                icon="Trash2"
                onClick={() => onDelete(task.Id)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              />
            </div>
          </div>

          {task.completedAt && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500 mt-2"
            >
              Completed {format(new Date(task.completedAt), 'MMM d, yyyy \'at\' h:mm a')}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default TaskItem