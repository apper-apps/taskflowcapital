import { format, isToday, isTomorrow, isPast, isThisWeek, parseISO } from 'date-fns'

export const formatTaskDate = (dateString) => {
  if (!dateString) return null
  
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString
  
  if (isToday(date)) return 'Today'
  if (isTomorrow(date)) return 'Tomorrow'
  if (isPast(date)) return `Overdue - ${format(date, 'MMM d')}`
  if (isThisWeek(date)) return format(date, 'EEEE')
  return format(date, 'MMM d, yyyy')
}

export const getDateColor = (dateString) => {
  if (!dateString) return 'gray'
  
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString
  
  if (isPast(date) && !isToday(date)) return 'red'
  if (isToday(date)) return 'yellow'
  if (isTomorrow(date)) return 'blue'
  return 'gray'
}

export const sortTasksByDate = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    
    const dateA = new Date(a.dueDate)
    const dateB = new Date(b.dueDate)
    
    return dateA - dateB
  })
}