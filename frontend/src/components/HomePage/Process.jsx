import {
  Box,
  Heading,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { processData } from '../../constants/Texts';
import { GiWireframeGlobe } from 'react-icons/gi';
import { BsCodeSlash } from 'react-icons/bs';
import { RiComputerLine } from 'react-icons/ri';

function Process() {
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
        How our process unfolds?
      </Heading>
      <Box
        w={'full'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
      >
        {processData.process.map((item, index) => (
          <Box
            key={index}
            maxW={'300px'}
            data-aos={item.effect}
            data-aos-duration={item.effectDuration}
            data-aos-easing={item.effectEase}
            data-aos-delay={item.effectDelay}
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
                  as={item.image}
                  color={'brand.500'}
                />
              </ListItem>
              <ListItem>
                <Heading as={'h3'} fontSize={'h3'}>
                  {item.title}
                </Heading>
              </ListItem>
              <ListItem>
                <Text textAlign={'center'} w={'fit-content'}>
                  {item.text}
                </Text>
              </ListItem>
            </UnorderedList>
          </Box>
        ))}
      </Box>
      <Box
        display={'flex'}
        w={'full'}
        flexWrap={'wrap'}
        justifyContent={'space-evenly'}
        alignItems={'flex-start'}
        position={'relative'}
        color={'brand.400'}
      >
        <Box className="translate">
          <GiWireframeGlobe className="rotate" size={'4rem'} />
        </Box>
        <Box className="translate">
          <BsCodeSlash className="rotate" size={'4rem'} />
        </Box>
        <Box className="translate">
          <RiComputerLine className="rotate" size={'4rem'} />
        </Box>

        {processData.texts.map((text, index) => (
          <Box
            color={'#fff'}
            position={'relative'}
            zIndex={3}
            className="glass"
            display={'flex'}
            flexDir={'column'}
            gap={'2rem'}
            key={index}
            w={'full'}
            minH={'200px'}
            maxW={'700px'}
            bg={'brand.glass'}
            py={'1rem'}
            px={'2rem'}
            mb={'2rem'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              w={'full'}
              justifyContent={'space-between'}
            >
              <Heading as={'h3'} fontSize={'h4'}>
                {text.title}
              </Heading>
              <UnorderedList listStyleType={'none'}>
                <ListItem>
                  <ListIcon fontSize={'h1'} as={text.image} />
                </ListItem>
              </UnorderedList>
            </Box>
            <Text whiteSpace={'pre-wrap'} fontWeight={'600'} w={'full'}>
              {text.text}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Process;
