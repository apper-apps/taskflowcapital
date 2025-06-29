export const getPriorityWeight = (priority) => {
  const weights = { high: 3, medium: 2, low: 1 }
  return weights[priority] || 2
}

export const sortTasksByPriority = (tasks) => {
  return [...tasks].sort((a, b) => {
    return getPriorityWeight(b.priority) - getPriorityWeight(a.priority)
  })
}

export const filterTasksByStatus = (tasks, status) => {
  if (status === 'active') return tasks.filter(task => !task.completed)
  if (status === 'completed') return tasks.filter(task => task.completed)
  return tasks
}

export const searchTasks = (tasks, searchTerm) => {
  if (!searchTerm) return tasks
  
  const term = searchTerm.toLowerCase()
  return tasks.filter(task => 
    task.title.toLowerCase().includes(term) ||
    task.category.toLowerCase().includes(term)
  )
}

export const groupTasksBy = (tasks, groupBy) => {
  switch (groupBy) {
    case 'category':
      return tasks.reduce((groups, task) => {
        const category = task.category || 'General'
        if (!groups[category]) groups[category] = []
        groups[category].push(task)
        return groups
      }, {})
      
    case 'priority':
      return tasks.reduce((groups, task) => {
        const priority = task.priority || 'medium'
        const label = priority.charAt(0).toUpperCase() + priority.slice(1) + ' Priority'
        if (!groups[label]) groups[label] = []
        groups[label].push(task)
        return groups
      }, {})
      
    case 'status':
      return tasks.reduce((groups, task) => {
        const status = task.completed ? 'Completed' : 'Active'
        if (!groups[status]) groups[status] = []
        groups[status].push(task)
        return groups
      }, {})
      
    default:
      return { 'All Tasks': tasks }
  }
}

export const calculateProgress = (tasks) => {
  if (tasks.length === 0) return 0
  const completed = tasks.filter(task => task.completed).length
  return Math.round((completed / tasks.length) * 100)
}