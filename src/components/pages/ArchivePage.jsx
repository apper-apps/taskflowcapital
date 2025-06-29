import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import TaskList from '@/components/organisms/TaskList'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { taskService } from '@/services/api/taskService'
import ApperIcon from '@/components/ApperIcon'

const ArchivePage = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const allTasks = await taskService.getAll()
      // Only show completed tasks
      const completedTasks = allTasks.filter(task => task.completed)
      setTasks(completedTasks)
    } catch (err) {
      setError('Failed to load completed tasks. Please try again.')
      console.error('Error loading tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleRestoreTask = async (taskId) => {
    try {
      const updatedTask = await taskService.update(taskId, {
        completed: false,
        completedAt: null
      })
      
      setTasks(prev => prev.filter(t => t.Id !== taskId))
      toast.success('Task restored to active list!')
    } catch (err) {
      toast.error('Failed to restore task')
      console.error('Error restoring task:', err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to permanently delete this task? This action cannot be undone.')) return
    
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(t => t.Id !== taskId))
      toast.success('Task permanently deleted')
    } catch (err) {
      toast.error('Failed to delete task')
      console.error('Error deleting task:', err)
    }
  }

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to permanently delete all completed tasks? This action cannot be undone.')) return
    
    try {
      await Promise.all(tasks.map(task => taskService.delete(task.Id)))
      setTasks([])
      toast.success('All completed tasks deleted')
    } catch (err) {
      toast.error('Failed to clear completed tasks')
      console.error('Error clearing tasks:', err)
    }
  }

  const filteredTasks = searchTerm
    ? tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tasks

  if (loading) return <Loading type="tasks" count={3} />
  if (error) return <Error message={error} onRetry={loadTasks} />

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Task Archive
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage your completed tasks
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{tasks.length}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          
          {tasks.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              icon="Trash2"
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Clear All
            </Button>
          )}
        </div>
      </motion.div>

      {/* Search */}
      {tasks.length > 0 && (
        <SearchBar 
          onSearch={setSearchTerm}
          placeholder="Search completed tasks..."
        />
      )}

      {/* Task List */}
      {tasks.length === 0 ? (
        <Empty
          title="No completed tasks"
          description="Complete some tasks to see them archived here. Completed tasks can be restored or permanently deleted."
          actionText="Go to Tasks"
          onAction={() => window.location.href = '/'}
          icon="Archive"
        />
      ) : (
        <div className="space-y-4">
          {/* Custom task list for archive with restore functionality */}
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <motion.div
                key={task.Id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="group bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 opacity-75"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded border-2 border-green-500 flex items-center justify-center">
                      <ApperIcon name="Check" size={12} className="text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-500 line-through">
                      {task.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                      <span>Category: {task.category}</span>
                      <span>•</span>
                      <span>Priority: {task.priority}</span>
                      {task.completedAt && (
                        <>
                          <span>•</span>
                          <span>Completed: {new Date(task.completedAt).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="small"
                      icon="RotateCcw"
                      onClick={() => handleRestoreTask(task.Id)}
                      className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                      title="Restore task"
                    />
                    <Button
                      variant="ghost"
                      size="small"
                      icon="Trash2"
                      onClick={() => handleDeleteTask(task.Id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete permanently"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Results Info */}
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4"
            >
              <p className="text-gray-600">
                Showing {filteredTasks.length} of {tasks.length} completed tasks
                {searchTerm && (
                  <span> matching "{searchTerm}"</span>
                )}
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}

export default ArchivePage