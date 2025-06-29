import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Layout = () => {
  const location = useLocation()

  const navigation = [
    { name: 'Tasks', href: '/', icon: 'CheckSquare' },
    { name: 'Archive', href: '/archive', icon: 'Archive' },
    { name: 'Categories', href: '/categories', icon: 'Tag' },
  ]

  const isActiveRoute = (href) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-xl"
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-8">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-display bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-sm text-gray-500">Organize your tasks</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => `
                    group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl 
                    transition-all duration-200
                    ${isActive || isActiveRoute(item.href)
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <ApperIcon 
                    name={item.icon} 
                    className="w-5 h-5 transition-transform group-hover:scale-110" 
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200/50">
              <div className="text-xs text-gray-500 text-center">
                Built with ❤️ for productivity
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <main className="min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout