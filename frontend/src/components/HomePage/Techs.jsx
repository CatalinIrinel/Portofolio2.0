import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { useEffect, useReducer } from 'react';
import { techText } from '../../constants/Texts';
import { Buttons } from '../Button';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';

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

function Techs() {
  const [{ loading, error, techs }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    techs: [],
  });

  useEffect(() => {
    const fetchTechs = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/techs/home');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchTechs();

    Aos.init({ disable: window.innerWidth < 480 });
  }, []);
  return (
    <Box
      maxW={'100rem'}
      w={'full'}
      minH={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      mt={'50px'}
      gap={['5rem', null, null, 0]}
      position={'relative'}
      zIndex={5}
    >
      <Box
        w="full"
        display={'grid'}
        justifyItems={['center', null, null, 'flex-start']}
        gridAutoColumns={'minmax(auto,1fr)'}
        gridTemplateAreas={[`'col2''col1'`, null, null, `'col1 col2'`]}
        h={['fit-content', null, null, '250px']}
        gap={['2rem', null, null, 0]}
      >
        <Buttons
          link={techText.link}
          text={techText.buttonText}
          gridArea={'col1'}
        />
        <Box
          w={'full'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={['center', null, null, 'flex-end']}
          textAlign={['center', null, null, 'right']}
          gridArea={'col2'}
        >
          <Heading
            as={'h2'}
            color={'#fff'}
            w={['fit-content', null, null, '700px']}
            fontSize={'h2'}
            fontWeight={600}
          >
            {techText.title}
          </Heading>
          <Text maxW={'600px'} fontSize={'1.3rem'}>
            {techText.description}
          </Text>
        </Box>
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
          justifyContent={'space-evenly'}
          flexWrap={'wrap'}
          gap={'3rem'}
        >
          {techs.map((tech, index) => {
            return (
              <Box
                maxW={['300px', '400px']}
                w={'full'}
                minH={'250px'}
                key={index}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                gap={'1rem'}
                h={'fit-content'}
                mb={'5rem'}
                data-aos={tech.effect}
                data-aos-duration={tech.effectDuration}
                data-aos-easing={tech.effectEase}
              >
                <Box boxSize={'80px'} alignItems={'center'} display={'flex'}>
                  <Image w={'80px'} src={tech.image} />
                </Box>

                <Heading
                  as={'h3'}
                  fontSize={'2rem'}
                  color={'#fff'}
                  textDecoration={'underline'}
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
  );
}

export default Techs;
