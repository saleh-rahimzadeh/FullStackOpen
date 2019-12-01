import { useState, useEffect } from 'react'
import axios from 'axios'



/* useField Hook
------------------------------------------------------------------------------- */

export const useField = (type) => {
  const [value, setValue] = useState('')


  const onChange = (event) => {
    setValue(event.target.value)
  }


  return {
    type,
    value,
    onChange
  }
}



/* useResource Hook
------------------------------------------------------------------------------- */

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])



  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  
  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response))
  }

  const service = {
    create
  }


  
  useEffect(() => {
    getAll().then(data => {
      console.log(data)
      setResources(data)
    })
    
  }, [])


  return [
    resources, 
    service
  ]
}
