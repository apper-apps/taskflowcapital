import mockTasks from '@/services/mockData/tasks.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class TaskService {
  constructor() {
    this.tasks = [...mockTasks]
  }

  async getAll() {
    await delay(300)
    return [...this.tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  async getById(id) {
    await delay(200)
    const task = this.tasks.find(t => t.Id === parseInt(id))
    if (!task) throw new Error('Task not found')
    return { ...task }
  }

  async create(taskData) {
    await delay(400)
    
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      completed: false,
      category: taskData.category || 'General',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      completedAt: null,
      ...taskData
    }
    
    this.tasks.push(newTask)
    return { ...newTask }
  }

  async update(id, updates) {
    await delay(300)
    
    const taskIndex = this.tasks.findIndex(t => t.Id === parseInt(id))
    if (taskIndex === -1) throw new Error('Task not found')
    
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates }
    return { ...this.tasks[taskIndex] }
  }

  async delete(id) {
    await delay(250)
    
    const taskIndex = this.tasks.findIndex(t => t.Id === parseInt(id))
    if (taskIndex === -1) throw new Error('Task not found')
    
    this.tasks.splice(taskIndex, 1)
    return true
  }
}

export const taskService = new TaskService()