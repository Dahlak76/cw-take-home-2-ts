import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { store } from './app/store'
import apiSlice, { fetchData } from './apiSlice'

interface Payload {
  payload: string
}

//create a form component that dispatches the fetchData function
const Form = () => {
  //use the useDispatch hook to dispatch the fetchData function
  //create a state variable for the input value
  const dispatch = useAppDispatch()
  // const dispatch = useDispatch()
  const [payload, setPayload] = useState<Payload>({'payload': ''});
  // const { response, error, isLoading } = useSelector((state: any) => state.api)
  // const { response, error, isLoading } = useAppSelector((state: any) => state.api)
  const apiState = useAppSelector((state: any) => state.api)
  const response = useAppSelector((state: any) => state.api.response)
  const error = useAppSelector((state: any) => state.api.error)
  const isLoading = useAppSelector((state: any) => state.api.isLoading);
  console.log("apiState: ", apiState)
  console.log("response: ", response)
  console.log("error: ", error)
  console.log("isLoading: ", isLoading)


  //create a function that handles the form submit event 
  //and dispatches the fetchData function with the input value as the payload
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(fetchData(payload.payload))
  }
  //return a form with an input and submit button 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setPayload({"payload": e.target.value})}
        />
        <button type="submit">Submit</button>
      </form>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {response && <p>Response: {response}</p>}
          {console.log('response:', response)}
          {console.log('error:', error)}
          {console.log('isLoading:', isLoading)}
    </div>
  )
}

export default Form
