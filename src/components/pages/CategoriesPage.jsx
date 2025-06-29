import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { categoryService } from '@/services/api/categoryService'
import { taskService } from '@/services/api/taskService'
import ApperIcon from '@/components/ApperIcon'

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    color: 'blue',
    icon: 'Tag'
  })

  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
    { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500' },
    { value: 'gray', label: 'Gray', class: 'bg-gray-500' },
  ]

  const iconOptions = [
    'Tag', 'Briefcase', 'Home', 'ShoppingCart', 'Heart', 'Star',
    'Book', 'Coffee', 'Car', 'Plane', 'Music', 'Camera'
  ]

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [categoriesData, tasksData] = await Promise.all([
        categoryService.getAll(),
        taskService.getAll()
      ])
      setCategories(categoriesData)
      setTasks(tasksData)
    } catch (err) {
      setError('Failed to load categories. Please try again.')
      console.error('Error loading categories:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getCategoryTaskCount = (categoryName) => {
    return tasks.filter(task => task.category === categoryName).length
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    try {
      if (editingCategory) {
        const updatedCategory = await categoryService.update(editingCategory.Id, formData)
        setCategories(prev => prev.map(cat => cat.Id === editingCategory.Id ? updatedCategory : cat))
        toast.success('Category updated successfully!')
      } else {
        const newCategory = await categoryService.create(formData)
        setCategories(prev => [...prev, newCategory])
        toast.success('Category created successfully!')
      }
      
      resetForm()
    } catch (err) {
      toast.error(editingCategory ? 'Failed to update category' : 'Failed to create category')
      console.error('Error saving category:', err)
    }
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      color: category.color,
      icon: category.icon
    })
    setShowAddForm(true)
  }

  const handleDelete = async (categoryId) => {
    const category = categories.find(cat => cat.Id === categoryId)
    const taskCount = getCategoryTaskCount(category.name)
    
    if (taskCount > 0) {
      toast.error(`Cannot delete category "${category.name}" because it has ${taskCount} tasks. Please reassign or delete the tasks first.`)
      return
    }

    if (!window.confirm(`Are you sure you want to delete the category "${category.name}"?`)) return

    try {
      await categoryService.delete(categoryId)
      setCategories(prev => prev.filter(cat => cat.Id !== categoryId))
      toast.success('Category deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete category')
      console.error('Error deleting category:', err)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', color: 'blue', icon: 'Tag' })
    setEditingCategory(null)
    setShowAddForm(false)
  }

  if (loading) return <Loading type="categories" count={4} />
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
            Task Categories
          </h1>
          <p className="text-gray-600 mt-1">
            Organize your tasks with custom categories
          </p>
        </div>

        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          icon="Plus"
          variant="accent"
        >
          Add Category
        </Button>
      </motion.div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Category Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: color.value })}
                        className={`
                          w-full h-10 rounded-lg ${color.class} flex items-center justify-center
                          ${formData.color === color.value ? 'ring-2 ring-offset-2 ring-gray-900' : ''}
                        `}
                      >
                        {formData.color === color.value && (
                          <ApperIcon name="Check" className="w-4 h-4 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${colorOptions.find(c => c.value === formData.color)?.class} flex items-center justify-center`}>
                  <ApperIcon name={formData.icon} className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700">Preview: {formData.name || 'Category Name'}</span>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!formData.name.trim()}
                >
                  {editingCategory ? 'Update' : 'Create'} Category
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories List */}
      {categories.length === 0 ? (
        <Empty
          title="No categories yet"
          description="Create your first category to better organize your tasks. Categories help you group related tasks together."
          actionText="Create First Category"
          onAction={() => setShowAddForm(true)}
          icon="Tag"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {categories.map((category) => (
              <motion.div
                key={category.Id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className="group bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${colorOptions.find(c => c.value === category.color)?.class} flex items-center justify-center shadow-lg`}>
                    <ApperIcon name={category.icon} className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {getCategoryTaskCount(category.name)} tasks
                    </p>
                  </div>

                  <Badge 
                    color={category.color}
                    variant="solid"
                  >
                    {getCategoryTaskCount(category.name)}
                  </Badge>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-4 flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="small"
                    icon="Edit"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    icon="Trash2"
                    onClick={() => handleDelete(category.Id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Statistics */}
      {categories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{categories.length}</div>
              <div className="text-sm text-gray-600">Total Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-600">{tasks.length}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-600">
                {categories.length > 0 ? Math.round(tasks.length / categories.length) : 0}
              </div>
              <div className="text-sm text-gray-600">Avg Tasks per Category</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default CategoriesPage