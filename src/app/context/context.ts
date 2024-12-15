import { createContext } from 'react'
import { entertainemtData } from '../types/types'

export const MovieContext=createContext<[entertainemtData] | undefined>(undefined)