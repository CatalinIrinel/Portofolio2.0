import React from 'react';
import { Box } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/HomePage/Hero';
import Projects from '../components/HomePage/Projects';
import Techs from '../components/HomePage/Techs';
import Solutions from '../components/HomePage/Solutions';
import Process from '../components/HomePage/Process';

function HomePage() {
  return (
    <Box
      className="App"
      w={'full'}
      minH={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      alignItems="center"
      gap={['3rem', null, null, 0]}
    >
      <Helmet>
        <title>Peak & Go - Web Development </title>
      </Helmet>

      <Hero />
      <div className="big-light"></div>
      <Solutions />
      <Projects />
      <Process />
      <div className="elipse3"></div>
      <div className="elipse4"></div>
      <Techs />
    </Box>
  );
}

export default HomePage;
