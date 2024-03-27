import React, { createContext, useContext, useState, ReactNode } from 'react'
import { LocationsData } from '../utils/types/locationTypes'

interface FiltersContextType {
  searchFound: LocationsData | null
  setSearchFound: React.Dispatch<React.SetStateAction<LocationsData | null>>
  selectedFilter: string
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined)

export const FiltersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchFound, setSearchFound] = useState<LocationsData | null>(null)
  const [selectedFilter, setSelectedFilter] = useState('')

  const contextValue = {
    searchFound,
    setSearchFound,
    selectedFilter,
    setSelectedFilter,
  }

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = (): FiltersContextType => {
  const context = useContext(FiltersContext)
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider')
  }
  return context
}
