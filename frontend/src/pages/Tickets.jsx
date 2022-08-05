import React from 'react'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getTickets, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Tickets() {
    const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  )

  const dispatch = useDispatch()

  //clear state on unmount
  // if we want something to happen on unmount, we need to return a function from useEffect
  useEffect(() => {
      return () => {
          if(isSuccess){
              dispatch(reset())
          }
      }
  }, [dispatch, isSuccess])
  useEffect(()=> {
      dispatch(getTickets())
  }, [dispatch])

  if(isLoading){
      return <Spinner/>
  }

  return (
    <div>
        <h1>Tickets</h1>
    </div>
  )
}

export default Tickets