import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskItem from '@/components/organisms/TaskItem'
import Empty from '@/components/ui/Empty'

const TaskList = ({ 
  tasks = [], 
  onToggleComplete, 
  onDelete, 
  onEdit,
  groupBy = 'none',
  showCompleted = true 
}) => {
  const filteredTasks = showCompleted ? tasks : tasks.filter(task => !task.completed)
  
  if (filteredTasks.length === 0) {
    return <Empty />
  }

  const groupTasks = (tasks, groupBy) => {
    if (groupBy === 'none') {
      return { 'All Tasks': tasks }
    }

    if (groupBy === 'priority') {
      return tasks.reduce((groups, task) => {
        const priority = task.priority || 'medium'
        const priorityLabel = priority.charAt(0).toUpperCase() + priority.slice(1) + ' Priority'
        if (!groups[priorityLabel]) groups[priorityLabel] = []
        groups[priorityLabel].push(task)
        return groups
      }, {})
    }

    if (groupBy === 'category') {
      return tasks.reduce((groups, task) => {
        const category = task.category || 'General'
        if (!groups[category]) groups[category] = []
        groups[category].push(task)
        return groups
      }, {})
    }

    if (groupBy === 'status') {
      return tasks.reduce((groups, task) => {
        const status = task.completed ? 'Completed' : 'Active'
        if (!groups[status]) groups[status] = []
        groups[status].push(task)
        return groups
      }, {})
    }

    return { 'All Tasks': tasks }
  }

  const groupedTasks = groupTasks(filteredTasks, groupBy)

  return (
    <div className="space-y-6">
      {Object.entries(groupedTasks).map(([groupName, groupTasks]) => (
        <motion.div
          key={groupName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {Object.keys(groupedTasks).length > 1 && (
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              {groupName}
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {groupTasks.length}
              </span>
            </h3>
          )}
          
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {groupTasks.map((task) => (
                <TaskItem
                  key={task.Id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default TaskList