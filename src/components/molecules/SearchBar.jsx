import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import AppIcon from "@/components/atoms/AppIcon";
const SearchBar = ({ onSearch, placeholder = "Search tasks...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch?.(value)
  }

  const clearSearch = () => {
    setSearchTerm('')
    onSearch?.('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative ${className}`}
    >
      <Input
        icon="Search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="pr-10"
      />
      {searchTerm && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={clearSearch}
className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <AppIcon name="X" className="w-4 h-4 text-gray-400" />
      </motion.button>
    )}
  </motion.div>
  )
}

export default SearchBar