import mockCategories from '@/services/mockData/categories.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class CategoryService {
  constructor() {
    this.categories = [...mockCategories]
  }

  async getAll() {
    await delay(250)
    return [...this.categories].sort((a, b) => a.name.localeCompare(b.name))
  }

  async getById(id) {
    await delay(200)
    const category = this.categories.find(c => c.Id === parseInt(id))
    if (!category) throw new Error('Category not found')
    return { ...category }
  }

  async create(categoryData) {
    await delay(350)
    
    const newCategory = {
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      name: categoryData.name,
      color: categoryData.color || 'gray',
      icon: categoryData.icon || 'Tag',
      ...categoryData
    }
    
    this.categories.push(newCategory)
    return { ...newCategory }
  }

  async update(id, updates) {
    await delay(300)
    
    const categoryIndex = this.categories.findIndex(c => c.Id === parseInt(id))
    if (categoryIndex === -1) throw new Error('Category not found')
    
    this.categories[categoryIndex] = { ...this.categories[categoryIndex], ...updates }
    return { ...this.categories[categoryIndex] }
  }

  async delete(id) {
    await delay(250)
    
    const categoryIndex = this.categories.findIndex(c => c.Id === parseInt(id))
    if (categoryIndex === -1) throw new Error('Category not found')
    
    this.categories.splice(categoryIndex, 1)
    return true
  }
}

export const categoryService = new CategoryService()