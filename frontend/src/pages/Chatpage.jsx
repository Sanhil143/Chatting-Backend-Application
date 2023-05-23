import React from 'react'
import { ChatState } from '../context/ChatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChat from '../components/helper/MyChat'
import { Box } from '@chakra-ui/react'

const Chatpage = () => {
  const {user} = ChatState()
  return (
    <div style={{width:'100%'}}>
    {user && <SideDrawer/>}
    <Box display='flex' justifyContent='space-between'
    w='100%' h='91.5vh' p='10px'>
    {user && <MyChat/>}
    </Box>
    </div>
  )
}

export default Chatpage
