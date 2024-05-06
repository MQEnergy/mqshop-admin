import {useEffect, useState} from 'react'

interface LocalStorageProps<T> {
  key: string
  defaultValue: T
}

export default function useLocalStorage<T>({
                                             key,
                                             defaultValue,
                                           }: LocalStorageProps<T>) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as const
}

export function useStorage<T>({
                                             key,
                                             defaultValue,
                                           }: LocalStorageProps<T>) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue !== null ? storedValue as T : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue] as const
}

