import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export const useLocalStorage = (ininialValue: any) => {
    const route = useRouter();
    const overwriteLocalStorage = route.pathname === '/blog/publish';
    const key = overwriteLocalStorage ? 'new' : 'edit';


  const [storageValue, setStorageValue] = useState(() => {
    try {
      const item = JSON.parse(window.localStorage.getItem(key))
      return item ? item : ininialValue
    } catch (error) {
      return ininialValue
    }
  })

  const setValue = (value) => {
    try {
        setStorageValue(value)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storageValue))
  }, [key, storageValue])

  return [storageValue, setValue]
}