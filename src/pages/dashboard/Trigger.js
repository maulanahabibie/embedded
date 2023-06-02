import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MySwal } from '../../utils'

const Trigger = () => {
    const navigate = useNavigate()
    const{token}=useSelector((state)=> state.user)
    useEffect(()=>{
        if(token) setTimeout(()=>navigate("/stats"),2000) 
        else navigate(()=>navigate("/register"))   
    },[token])
  return (
    <div></div>
  )
}

export default Trigger