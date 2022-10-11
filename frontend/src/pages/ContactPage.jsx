import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  ListIcon,
  ListItem,
  Text,
  Textarea,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaPhoneAlt,
  FaWhatsapp,
} from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { contactData } from '../constants/Texts';

function ContactPage() {
  const { github, facebook, linkedin, instagram } = contactData.socialMedia;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const emailHandler = async (e) => {
    e.preventDefault();
    document.getElementById('formC').reset();
    await axios
      .post('/send-mail', {
        name,
        email,
        message,
      })
      .then(toast.succes('Mesajul a fost trimis'));
  };
  return (
    <Box
      w={'full'}
      minH={[
        'calc(100vh - 6.25rem - 4rem - 24rem)',
        null,
        null,
        'calc(100vh - 6.25rem - 6rem)',
      ]}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-evenly'}
      gap={'1.5rem'}
      flexDir={'column'}
      color={'#fff'}
    >
      <Helmet>
        <title>Contact Us - Peak & Go</title>
      </Helmet>
      <Heading as="h1" fontSize={'h1'} textAlign={'center'}>
        Lets get in touch
      </Heading>
      <Box
        w={'full'}
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
        gap={['3rem', null, null, 0]}
      >
        <Box
          w={'full'}
          maxW={'400px'}
          minH={'400px'}
          display={'flex'}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={'5rem'}
          textAlign={['center', 'left']}
        >
          <Box>
            <Heading
              as="h2"
              fontSize={'h4'}
              textDecor={'underline'}
              mb={['2rem', '1rem']}
            >
              You can contact me here
            </Heading>
            <UnorderedList
              m={0}
              listStyleType={'none'}
              display={'flex'}
              flexDir={'column'}
              gap={['1.5rem', '.5rem']}
            >
              <ListItem>
                <Link href={'call:+40738467902'}>
                  <ListIcon fontSize={'1.5rem'} as={FaPhoneAlt} /> +40738 467
                  902
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon fontSize={'1.5rem'} as={FaWhatsapp} /> +40738 467 902
              </ListItem>
              <ListItem>
                <Link href={'mailto:contact@peakngo.com'}>
                  <ListIcon fontSize={'1.5rem'} as={IoIosMail} />{' '}
                  contact[at]peakngo.com
                </Link>
              </ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Heading
              as="h2"
              fontSize={'h4'}
              mb={['1rem', 0]}
              textDecor={'underline'}
            >
              Follow me on social media
            </Heading>
            <UnorderedList
              m={0}
              listStyleType={'none'}
              display={'flex'}
              fontSize={'2rem'}
              justifyContent={'center'}
              gap={'1.5rem'}
            >
              <ListItem>
                <Link
                  href={facebook}
                  target="_blank"
                  aria-label="facebook"
                  rel="noreferrer"
                >
                  <ListIcon as={FaFacebook} />
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href={instagram}
                  target="_blank"
                  aria-label="facebook"
                  rel="noreferrer"
                >
                  <ListIcon as={FaInstagram} />
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href={github}
                  target="_blank"
                  aria-label="facebook"
                  rel="noreferrer"
                >
                  <ListIcon as={FaGithub} />
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href={linkedin}
                  target="_blank"
                  aria-label="facebook"
                  rel="noreferrer"
                >
                  <ListIcon as={FaLinkedin} />
                </Link>
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
        <Box
          w={['400px', null, null, 'fit-content']}
          display={'flex'}
          justifyContent={'center'}
          fontSize={'h3'}
        >
          <Text>OR</Text>
        </Box>
        <Box w={'full'} maxW={'400px'} mb={['2rem', 0]}>
          <Heading
            as={'h2'}
            fontSize={'h3'}
            mb={'1rem'}
            textAlign={['center', 'left']}
          >
            Message me now.
          </Heading>
          <form className="contact" onSubmit={emailHandler}>
            <FormControl isRequired>
              <FormLabel>Email:</FormLabel>
              <Input
                type={'email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormHelperText>
                Enter the email you would like to be contacted through
              </FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Name:</FormLabel>
              <Input
                type={'text'}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText>
                Enter your name so we can get to know each other
              </FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Message:</FormLabel>
              <Textarea onChange={(e) => setMessage(e.target.value)} />
              <FormHelperText>
                Enter your name so we can get to know each other
              </FormHelperText>
            </FormControl>

            <FormControl
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Button
                type="submit"
                bg={'brand.600'}
                color={'#000'}
                fontWeight={'bold'}
                _hover={'none'}
              >
                Send Message
              </Button>
              <Button
                w={'150px'}
                type="reset"
                bg={'none'}
                border={'3px solid #F3D587'}
                color={'brand.600'}
                fontWeight={'bold'}
                _hover={'none'}
              >
                Cancel
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default ContactPage;
