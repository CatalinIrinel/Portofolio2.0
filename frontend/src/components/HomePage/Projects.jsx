import { Box, Heading, Image, Link, Text } from '@chakra-ui/react';
import { projects as projText } from '../../constants/Texts';
import { Buttons } from '../Button';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import Aos from 'aos';
import 'aos/dist/aos.css';

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

function Projects() {
  const [{ loading, error, projects }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    projects: [],
  });
  useEffect(() => {
    Aos.init();
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(
          'https://peak.babyfie.ro/api/projects/home'
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <Box
      maxW={'100rem'}
      w={'full'}
      minH={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      mt={'50px'}
      gap={'5rem'}
    >
      <Box
        w="full"
        display={'flex'}
        justifyContent={['center', null, null, 'space-between']}
        alignItems={['center', null, null, 'flex-start']}
        flexWrap={'wrap'}
        h={['fit-content', null, null, '250px']}
        gap={['2rem', null, null, 0]}
      >
        <Heading
          as={'h2'}
          color={'#fff'}
          w={'700px'}
          fontSize={'h2'}
          fontWeight={600}
          textAlign={['center', null, null, 'left']}
        >
          {projText.title}
        </Heading>
        <Buttons link={projText.link} text={projText.buttonText} />
      </Box>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox status="error">{error}</MessageBox>
      ) : (
        <Box
          w="full"
          display={'flex'}
          h={'fit-content'}
          justifyContent={['center', null, null, 'space-between']}
          alignItems={['center', 'flex-start']}
          flexWrap={'wrap'}
          gap={['5rem', null, null, 0]}
        >
          {projects.map((project, index) => {
            return (
              <Box
                key={index}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={'2rem'}
                w={'400px'}
                h={'fit-content'}
                zIndex={100}
                position={'relative'}
                data-aos={project.effect}
                data-aos-duration={project.effectDuration}
                data-aos-easing={project.effectEase}
                data-aos-delay={project.effectDelay}
              >
                <div className="elipse1"></div>
                <div className="elipse2"></div>
                <Link
                  w={'fit-content'}
                  href={project.link}
                  isExternal
                  target="_blank"
                  aria-label={project.name}
                  borderRadius={'1rem'}
                  overflow={'hidden'}
                >
                  <Image
                    w={['350px', '400px']}
                    h={['200px', '200px']}
                    src={project.image}
                    alt={project.name}
                  />
                </Link>
                <Heading
                  as={'h3'}
                  fontSize={'2rem'}
                  color={'#fff'}
                  textDecoration={'underline'}
                  textAlign={'center'}
                >
                  {project.name}
                </Heading>
                <Text
                  textAlign={['center', 'left']}
                  w={'inherit'}
                  color={'#d3d3d3'}
                >
                  {project.description}
                </Text>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default Projects;
