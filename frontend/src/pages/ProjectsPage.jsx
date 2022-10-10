import { Box, Heading } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '../components/Card';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import { projectsData } from '../constants/Texts';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, projects: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProjectsPage() {
  const [{ loading, error, projects }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    projects: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/projects');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <Box
      w={'full'}
      display={'flex'}
      flexDirection={'column'}
      alignItems="center"
      justifyContent={'center'}
      color={'#fff'}
      mt={(0, null, null, '3rem')}
      gap={['5rem', null, null, '8rem']}
    >
      <Helmet>
        <title>Our Projects - Peak & Go</title>
      </Helmet>
      <Heading mt={['2rem', 0]} as="h1" fontSize={'3rem'}>
        Projects
      </Heading>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox status="error">{error}</MessageBox>
      ) : (
        <Box
          w={'full'}
          display={'flex'}
          flexDirection={'column'}
          alignItems="center"
          justifyContent={'center'}
          gap={'5rem'}
          mb={'5rem'}
        >
          {projects.map((project) => (
            <Card
              key={project._id}
              name={project.name}
              src={project.image}
              description={project.description}
              techs={project.technology}
              imgStart={project.imgStart}
              link={project.link}
            />
          ))}
        </Box>
      )}
      {/* <Box
        w={'full'}
        display={'flex'}
        flexDirection={'column'}
        alignItems="center"
        justifyContent={'center'}
        gap={'5rem'}
        mb={'5rem'}
      >
        {projectsData.map((project) => (
          <Card
            key={project._id}
            name={project.name}
            src={project.src}
            description={project.description}
            techs={project.techs}
            imgStart={project.imgStart}
            link={project.link}
          />
        ))}
      </Box> */}
    </Box>
  );
}

export default ProjectsPage;
