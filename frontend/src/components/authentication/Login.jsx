import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { Button, FormControl, FormLabel, Input, InputGroup, 
      InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { appConfig } from '../../configs/urlconfig';


const Login = () => {
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();
      const [loading, setLoading] = useState(false);

      const [showPass, setShowpass] = useState(false);
      const handleClick = () => setShowpass(!showPass)

      const toast = useToast();
      const history = useHistory();

      const submitHandler = async () => {
            setLoading(true);
            if(!email || !password){
                  toast({
                        title:'Please fill all the fields',
                        status:'warning',
                        duration:5000,
                        isClosable:true,
                        position:'bottom'
                  });
                  setLoading(false);
                  return;
            }
            try {
                  const config = {
                        Headers:{
                              'Content-type':'application/json'
                        },
                  };
                  const body = {email,password}
                  const res = await axios.post(`${appConfig.API_URL}/user/login`,body,config);
                  console.log(res);
                  toast({
                        title:'Login Successfull',
                        status:'success',
                        duration:5000,
                        isClosable:true,
                        position:'bottom'
                  });
                  localStorage.setItem('userInfo', JSON.stringify(res));
                  setLoading(false);
                  history.push('/chats');
            } catch (err) {
                  toast({
                        title:'Error Occured!',
                        description:err.message,
                        status:'error',
                        duration:5000,
                        isClosable:true,
                        position:'bottom'
                  });
                  setLoading(false);
            }
      }

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
                  onClick={submitHandler}
                  isLoading={loading}>
                        Login
                  </Button>
            </VStack>
      )
}

export default Login
