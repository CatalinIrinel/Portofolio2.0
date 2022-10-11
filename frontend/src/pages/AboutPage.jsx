import { Box, Heading, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useReducer } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { aboutPage } from '../constants/Texts';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, techs: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function AboutPage() {
  const [{ loading, error, techs }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    techs: [],
  });

  useEffect(() => {
    const fetchTechs = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/techs');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchTechs();
  }, []);
  return (
    <Box
      w={'full'}
      display={'flex'}
      flexDirection={'column'}
      color={'#fff'}
      gap={'8rem'}
    >
      <Helmet>
        <title>About - Peak & Go</title>
      </Helmet>

      <Box
        className="section"
        w={'full'}
        display={'flex'}
        justifyContent={'center'}
        mt={'4rem'}
      >
        <Heading
          w={'fit-content'}
          h={'fit-content'}
          as="h1"
          color={'#fff'}
          fontSize={'h1'}
          textAlign={'center'}
        >
          Get to know Me :)
        </Heading>
      </Box>
      <Box
        className="row-about-me"
        w="full"
        display={'flex'}
        h={'fit-content'}
        gap={'3rem'}
      >
        {aboutPage.about.map((text, index) => (
          <Box
            w={'inherit'}
            display={'inherit'}
            justifyContent={'space-evenly'}
            alignItems={'center'}
            flexWrap={'wrap'}
            key={index}
            gap={'4rem'}
          >
            <Box borderRadius={'50%'} className={'faded'} overflow={'hidden'}>
              <Image
                objectFit={'cover'}
                objectPosition={'left'}
                boxSize={['300px', '500px']}
                src={text.image}
                alt={text.title}
              />
            </Box>
            <Box
              w={'500px'}
              display={'flex'}
              flexDir={'column'}
              gap={'2rem'}
              textAlign={['center', null, null, 'right']}
            >
              <Heading w={'full'} as={'h2'} fontSize={'h2'}>
                {text.name}
              </Heading>
              <Heading
                color={'brand.600'}
                as={'h3'}
                fontSize={'1rem'}
                mt={'-2rem'}
              >
                {text.position}
              </Heading>
              <Text lineHeight={'2rem'}>{text.description}</Text>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={['center', null, null, 'flex-start']}
        flexDir={'column'}
      >
        <Heading
          textAlign={['center', null, null, 'left']}
          // 26ch is about 36rem
          maxW={'36rem'}
          w={'full'}
          as={'h2'}
          fontSize={'h2'}
          mb={'5rem'}
          className={'typeEffect'}
        >
          All the technologies that I use
        </Heading>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox status="error">{error}</MessageBox>
        ) : (
          <Box
            w="full"
            display={'flex'}
            h={'fit-content'}
            justifyContent={'space-evenly'}
            flexWrap={'wrap'}
            gap={[0, '3rem']}
          >
            {techs.map((tech, index) => {
              return (
                <Box
                  maxW={'300px'}
                  w={'full'}
                  minH={'250px'}
                  key={index}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                  gap={'1rem'}
                  mb={'5rem'}
                >
                  <Box boxSize={'80px'} alignItems={'center'} display={'flex'}>
                    <Image w={'80px'} src={tech.image} />
                  </Box>

                  <Heading
                    as={'h3'}
                    fontSize={'2rem'}
                    color={'#fff'}
                    textDecoration={'underline'}
                    textAlign={'center'}
                  >
                    {tech.tech}
                  </Heading>
                  <Text textAlign={'center'} w={'inherit'} color={'#d3d3d3'}>
                    {tech.description}
                  </Text>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AboutPage;
