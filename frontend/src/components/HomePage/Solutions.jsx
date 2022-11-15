import {
  Box,
  Heading,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { solutionData } from '../../constants/Texts';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Solutions() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <Box
      maxW={'100rem'}
      w={'full'}
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'5rem'}
      my={'5rem'}
    >
      <Heading as={'h2'} fontSize={'h2'}>
        {' '}
        What solutions do I offer?
      </Heading>
      <Box
        w={'full'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
      >
        {solutionData.map((solution, index) => (
          <Box
            key={index}
            maxW={'300px'}
            data-aos={solution.effect}
            data-aos-duration={solution.effectDuration}
            data-aos-easing={solution.effectEase}
            data-aos-delay={solution.effectDelay}
          >
            <UnorderedList
              listStyleType={'none'}
              m={0}
              display={'flex'}
              flexDir={'column'}
              alignItems={'center'}
              gap={'2rem'}
            >
              <ListItem>
                <ListIcon
                  boxSize={'100px'}
                  as={solution.image}
                  color={'brand.500'}
                />
              </ListItem>
              <ListItem>
                <Heading as={'h3'} fontSize={'h3'}>
                  {solution.title}
                </Heading>
              </ListItem>
              <ListItem>
                <Text textAlign={'center'} w={'fit-content'}>
                  {solution.text}
                </Text>
              </ListItem>
            </UnorderedList>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Solutions;
