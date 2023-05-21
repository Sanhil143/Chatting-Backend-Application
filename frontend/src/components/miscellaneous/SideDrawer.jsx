import React, { useState } from 'react'
import {Box,Tooltip,Button, Text, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider} from '@chakra-ui/react'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SideDrawer = () => {
      const [search,setSearch] = useState('');
      const [searchResult,setSearchResult] = useState([]);
      const [loading,setLoading] = useState(false);
      const [loadingChat,setLoadingChat] = useState(false);

      const {user} = ChatState();
      const history = useHistory();
      
      const logoutHandler = () => {
            localStorage.removeItem('userInfo');
            history.push('/');
      };



  return (
    <>
     <Box
     display="flex"
     justifyContent="space-between"
     alignItems="center"
     bg="white"
     w="100%"
     p="5px 10px 5px 10px"
     borderWidth="5px"
     >
     <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
     <Button variant="ghost">
      <i className='fas fa-search'></i>
      <Text d={{base:'none', md:"flex"}} px={4}>
            Search User
      </Text>
     </Button>
     </Tooltip>

     <Text fontSize='2xl' fontFamily='Work sans'>
      ©️hit❤️©️hat
     </Text>
     <div>
      <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize="2xl" m={1}/>
          </MenuButton>  
      </Menu>
      <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
            <Avatar 
            size='sm' 
            cursor='pointer' 
            name={user.data.name} 
            src={user.data.picture}/>
            </MenuButton>
            <MenuList>
            <ProfileModal user={user}>
                  <MenuItem>Profile</MenuItem>
                  </ProfileModal>
                  <MenuDivider/>
                  <MenuItem color='red' onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
      </Menu>
     </div>
     </Box> 
    </>
  )
}

export default SideDrawer
