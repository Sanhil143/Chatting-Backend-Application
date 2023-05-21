
import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ProfileModal = ({user,children}) => {

      const {isOpen,onOpen,onClose} = useDisclosure()
  return (
    <>
      {children ? (
            <span onClick={onOpen}>{children}</span>
      ) : (
            <IconButton d={{base:'flex'}} icon={<ViewIcon/>} onClick={onOpen}/>
      )}
      <Modal size='lg' onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay/>
      <ModalContent h='410px'>
      <ModalHeader
      fontSize='40px'
      fontFamily='Work sans'
      display='flex'
      justifyContent='center'
      >
            {user.data.name}
      </ModalHeader>    
      <ModalCloseButton/>
      <ModalBody 
      display='flex'
      flexDir='column'
      alignItems='center'
      justifyContent='space-between'
      >
            <Image
                  borderRadius='full'
                  boxSize='150px'
                  src={user.data.picture}
                  alt={user.data.name}
            />
            <Text
            fontSize={{base:'28px',md:'30px'}}
            fontFamily='Work sans'>
                  ©️hit❤️©️hat
            </Text>
      </ModalBody>        
      <ModalFooter>
            <Button bg='red'  onClick={onClose}>Close</Button>
      </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
