import React from 'react'
import { motion } from 'framer-motion'
import FilterChip from '@/components/molecules/FilterChip'
import Button from '@/components/atoms/Button'

const FilterToolbar = ({ 
  categories = [],
  activeFilters = {},
  onFilterChange,
  taskCounts = {},
  onClearFilters
}) => {
  const priorityFilters = [
    { key: 'high', label: 'High Priority', color: 'red', icon: 'AlertCircle' },
    { key: 'medium', label: 'Medium Priority', color: 'yellow', icon: 'Clock' },
    { key: 'low', label: 'Low Priority', color: 'green', icon: 'CheckCircle' }
  ]

  const statusFilters = [
    { key: 'active', label: 'Active', color: 'blue', icon: 'Play' },
    { key: 'completed', label: 'Completed', color: 'green', icon: 'CheckCircle2' }
  ]

  const hasActiveFilters = Object.values(activeFilters).some(filter => 
    Array.isArray(filter) ? filter.length > 0 : filter
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="small"
            onClick={onClearFilters}
            icon="X"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Category Filters */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              label={category.name}
              icon={category.icon}
              color={category.color || 'gray'}
              count={taskCounts.categories?.[category.name] || 0}
              active={activeFilters.categories?.includes(category.name)}
              onClick={() => onFilterChange('categories', category.name)}
            />
          ))}
        </div>
      </div>

      {/* Priority Filters */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Priority</h4>
        <div className="flex flex-wrap gap-2">
          {priorityFilters.map((priority) => (
            <FilterChip
              key={priority.key}
              label={priority.label}
              icon={priority.icon}
              color={priority.color}
              count={taskCounts.priorities?.[priority.key] || 0}
              active={activeFilters.priorities?.includes(priority.key)}
              onClick={() => onFilterChange('priorities', priority.key)}
            />
          ))}
        </div>
      </div>

      {/* Status Filters */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Status</h4>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((status) => (
            <FilterChip
              key={status.key}
              label={status.label}
              icon={status.icon}
              color={status.color}
              count={taskCounts.status?.[status.key] || 0}
              active={activeFilters.status === status.key}
              onClick={() => onFilterChange('status', status.key)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default FilterToolbar