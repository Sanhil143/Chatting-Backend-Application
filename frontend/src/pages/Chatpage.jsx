import React from 'react'
import { ChatState } from '../context/ChatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer'

const Chatpage = () => {
  const {user} = ChatState()
  return (
    <div style={{width:'100%'}}>
    {user && <SideDrawer/>}
      
    </div>
  )
}

export default Chatpage
