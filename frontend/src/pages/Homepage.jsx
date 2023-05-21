import React from 'react'
import { Tab,Text, Box, Container, Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="#f0ead2"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px">
        <Text
          fontSize="4xl"
          textAlign="center"
          fontFamily="work sans">
          ©️hit❤️©️hat
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p="4"
        borderRadius="lg"
        color="black"
        borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage

// rafce