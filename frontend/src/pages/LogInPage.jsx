import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../Utils';

function LogInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://peak.babyfie.ro/api/users/signin',
        {
          email,
          password,
        }
      );
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  return (
    <Box
      w={'full'}
      minH={'calc(100vh - 200px - 6rem)'}
      display={'flex'}
      flexDirection={'column'}
      alignItems="center"
      justifyContent={'center'}
      gap={'3rem'}
    >
      <Helmet>
        <title>Log In - Peak & Go</title>
      </Helmet>
      <Heading as="h1" fontSize={'3rem'} textAlign={['center', 'left']}>
        Administrator Log In
      </Heading>
      <form onSubmit={submitHandler}>
        <FormControl isRequired mb="2rem" color={'#fff'}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            borderColor={'brand.500'}
            w="300px"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb="2rem" color={'#fff'}>
          <FormLabel htmlFor="password">Parola:</FormLabel>
          <Input
            borderColor={'brand.500'}
            w="300px"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl display="flex" justifyContent="center" w="100%">
          <Button
            my={'1rem'}
            type="submit"
            bg={'brand.600'}
            color={'#000'}
            w={'200px'}
            h={'40px'}
            borderRadius={'0 1.8rem'}
            _hover={'none'}
            _focus={{ boxShadow: 'none' }}
          >
            Logare
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

export default LogInPage;
