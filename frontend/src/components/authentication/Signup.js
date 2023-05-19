import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

const Signup = () => {
      const [name, setName] = useState();
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();
      const [confirmpassword, setConfirmpassword] = useState();
      const [picture, setPicture] = useState();

      //password hide<-->show functionality
      const [showPass, setShowpass] = useState(false);
      const handleClick = () => setShowpass(!showPass);

      const postDetails = (picture) => {}

      const submitHandler = () => {}

      return (
            <VStack color="black">
                  <FormControl id='first-name' isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                              placeholder='Enter Your Name'
                              onChange={(e) => setName(e.target.value)}
                        />
                  </FormControl>
                  <FormControl id='email' isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                              type='email'
                              placeholder='Enter Your Email'
                              onChange={(e) => setEmail(e.target.value)}
                        />
                  </FormControl>
                  <FormControl id='password' isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                              <Input
                                    type={showPass ? 'text' : 'password'}
                                    placeholder='Enter Password'
                                    onChange={(e) => setPassword(e.target.value)}
                              />
                              <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                          {showPass ? "Hide" : "Show"}
                                    </Button>
                              </InputRightElement>
                        </InputGroup>
                  </FormControl>
                  <FormControl id='confirmPassword' isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup size='md'>
                              <Input
                                    type={showPass ? 'text' : 'password'}
                                    placeholder='Confirm Password'
                                    onChange={(e) => setConfirmpassword(e.target.value)}
                              />
                              <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size='sm'
                                          onClick={handleClick}>
                                          {showPass ? "Hide" : "Show"}
                                    </Button>
                              </InputRightElement>
                        </InputGroup>
                  </FormControl>
                  <FormControl id="picture">
                        <FormLabel>Upload Your Picture</FormLabel>
                        <Input
                              type='file'
                              p={1.5}
                              accept='image/*'
                              onChange={(e) => postDetails(e.target.files[0])}
                        />
                  </FormControl>
                  <Button
                  colorScheme='blue'
                  width="100%"
                  style={{marginTop:15}}
                  onClick={submitHandler}>
                        Signup
                  </Button>
            </VStack>
      )
}

export default Signup
