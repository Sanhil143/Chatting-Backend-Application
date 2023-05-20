import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Button, FormControl, FormLabel, Input, InputGroup, 
      InputRightElement, VStack, useToast } from '@chakra-ui/react'

const Signup = () => {
      const toast = useToast();
      const history = useHistory();

      const [name, setName] = useState();
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();
      const [confirmpassword, setConfirmpassword] = useState();
      const [picture, setPicture] = useState();
      const [picLoading, setPicLoading] = useState(false);

      //password hide<-->show functionality
      const [showPass, setShowpass] = useState(false);
      const handleClick = () => setShowpass(!showPass);

      const submitHandler = async () => {
            setPicLoading(true);
            if (!name || !email || !password || !confirmpassword) {
                  toast({
                        title:'please enter all fields',
                        status:'warning',
                        duration:5000,
                        isClosable:true,
                        position:'bottom'
                  });
                  setPicLoading(false);
                  return;
            }
            if(password !== confirmpassword){
                  toast({
                        title:'password do not match',
                        status:'warning',
                        duration:5000,
                        isClosable:true,
                        position:'bottom'
                  });
                  return;
            }
            try {
                  const config = {
                        Headers:{
                              'Content-type':'application/json',
                        },
                  }
                  const body = JSON.stringify({name,email,password,picture})
                  const res = await axios.post('http://localhost:5000/user/signup',body,config);
                  console.log(res);
                  toast({
                        title:'Registration Successful',
                        status:'success',
                        duration:5000,
                        isClosable:true,
                        position:'bottom'
                  });
                  localStorage.setItem('userInfo',JSON.stringify(res));
                  setPicLoading(false);
                  history.push('/chats');
            } catch (err) {
                  toast({
                        title:'Error Occured',
                        description:err.message,
                        status:'error',
                        duration:5000,
                        isClosable:true,
                        position:'bottom'
                  });
                  setPicLoading(false);
            }
      }



      const postDetails = (pics) => {
            setPicLoading(true);
            if (pics === undefined) {
                  toast({
                        title: 'PLease select an image!',
                        status: 'warning',
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom'
                  });
                  return;
            }
            if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
                  const data = new FormData();
                  data.append('file', pics);
                  data.append('upload_preset', "Chat-app");
                  data.append('cloud_name', 'dy0gpsned');
                  fetch('https://api.cloudinary.com/v1_1/dy0gpsned/image/upload', {
                        method: 'post',
                        body: data,
                  })
                        .then((res) => res.json())
                        .then((data) => {
                              setPicture(data.url.toString());
                              console.log(data.url.toString());
                              setPicLoading(false);
                        }).catch((err) => {
                              console.error(err);
                              setPicLoading(false);
                        });
            } else {
                  toast({
                        title: 'Please select an image!',
                        status: 'warning',
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom'
                  });
                  setPicLoading(false);
                  return;
            }
      }

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
                        style={{ marginTop: 15 }}
                        onClick={submitHandler}
                        isLoading={picLoading}>
                        Signup
                  </Button>
            </VStack>
      )
}

export default Signup
