import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import QuickAddForm from '@/components/molecules/QuickAddForm'
import SearchBar from '@/components/molecules/SearchBar'
import FilterToolbar from '@/components/organisms/FilterToolbar'
import TaskList from '@/components/organisms/TaskList'
import ProgressRing from '@/components/molecules/ProgressRing'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'
import ApperIcon from '@/components/ApperIcon'

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [groupBy, setGroupBy] = useState('none')
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    priorities: [],
    status: null
  })

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError('Failed to load tasks. Please try again.')
      console.error('Error loading tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAddTask = async (newTask) => {
    try {
      const createdTask = await taskService.create(newTask)
      setTasks(prev => [createdTask, ...prev])
      toast.success('Task created successfully!')
    } catch (err) {
      toast.error('Failed to create task')
      console.error('Error creating task:', err)
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date() : null
      })
      
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t))
      toast.success(updatedTask.completed ? 'Task completed! 🎉' : 'Task reopened')
    } catch (err) {
      toast.error('Failed to update task')
      console.error('Error updating task:', err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(t => t.Id !== taskId))
      toast.success('Task deleted')
    } catch (err) {
      toast.error('Failed to delete task')
      console.error('Error deleting task:', err)
    }
  }

  const handleEditTask = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.update(taskId, updates)
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t))
      toast.success('Task updated')
    } catch (err) {
      toast.error('Failed to update task')
      console.error('Error updating task:', err)
    }
  }

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev }
      
      if (filterType === 'status') {
        newFilters.status = newFilters.status === value ? null : value
      } else {
        const currentValues = newFilters[filterType] || []
        newFilters[filterType] = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      }
      
      return newFilters
    })
  }

  const handleClearFilters = () => {
    setActiveFilters({
      categories: [],
      priorities: [],
      status: null
    })
    setSearchTerm('')
  }

  const filteredTasks = useMemo(() => {
    let filtered = tasks

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(task =>
        activeFilters.categories.includes(task.category)
      )
    }

    // Priority filter
    if (activeFilters.priorities.length > 0) {
      filtered = filtered.filter(task =>
        activeFilters.priorities.includes(task.priority)
      )
    }

    // Status filter
    if (activeFilters.status === 'active') {
      filtered = filtered.filter(task => !task.completed)
    } else if (activeFilters.status === 'completed') {
      filtered = filtered.filter(task => task.completed)
    }

    return filtered
  }, [tasks, searchTerm, activeFilters])

  const taskStats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(t => t.completed).length
    const active = total - completed
    const progress = total > 0 ? (completed / total) * 100 : 0

    return { total, completed, active, progress }
  }, [tasks])

  const taskCounts = useMemo(() => {
    return {
      categories: tasks.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1
        return acc
      }, {}),
      priorities: tasks.reduce((acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1
        return acc
      }, {}),
      status: {
        active: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length
      }
    }
  }, [tasks])

  if (loading) return <Loading type="tasks" count={5} />
  if (error) return <Error message={error} onRetry={loadData} />

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
            Task Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your daily tasks and stay productive
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{taskStats.active}</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <ProgressRing progress={taskStats.progress} size={80} />
        </div>
      </motion.div>

      {/* Quick Add */}
      <QuickAddForm onAddTask={handleAddTask} categories={categories} />

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchBar 
            onSearch={setSearchTerm}
            placeholder="Search tasks by title or category..."
          />
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="none">No Grouping</option>
            <option value="category">Group by Category</option>
            <option value="priority">Group by Priority</option>
            <option value="status">Group by Status</option>
          </select>

          <Button
            variant="outline"
            size="small"
            icon="Filter"
            onClick={() => {
              const toolbar = document.getElementById('filter-toolbar')
              toolbar?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="xl:col-span-1">
          <div id="filter-toolbar" className="sticky top-6">
            <FilterToolbar
              categories={categories}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              taskCounts={taskCounts}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>

        {/* Task List */}
        <div className="xl:col-span-3">
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            groupBy={groupBy}
          />
        </div>
      </div>

      {/* Results Info */}
      {(searchTerm || Object.values(activeFilters).some(f => Array.isArray(f) ? f.length > 0 : f)) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <p className="text-gray-600">
            Showing {filteredTasks.length} of {tasks.length} tasks
            {searchTerm && (
              <span> matching "{searchTerm}"</span>
            )}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default TaskDashboard