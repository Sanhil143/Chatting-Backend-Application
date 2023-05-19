import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();

      const [showPass, setShowpass] = useState(false);
      const handleClick = () => setShowpass(!showPass)

      const submitHandler = () => {}

      return (
            <VStack>
                  <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                              type="email"
                              placeholder='Enter your Email'
                              onChange={(e) => setEmail(e.target.value)}
                        />
                  </FormControl>
                  <FormControl id='password' isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                              <Input
                                    type={showPass ? "text" : "password"}
                                    placeholder='Enter Password'
                                    onChange={(e) => setPassword(e.target.value)}
                              />
                              <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size='sm'
                                          onClick={handleClick}>
                                          {showPass ? "Hide" : "Show"}
                                    </Button>
                              </InputRightElement>
                        </InputGroup>
                  </FormControl>
                  <Button
                  colorScheme='blue'
                  width='100%'
                  style={{marginTop:15}}
                  onClick={submitHandler}>
                        Login
                  </Button>
            </VStack>
      )
}

export default Login
