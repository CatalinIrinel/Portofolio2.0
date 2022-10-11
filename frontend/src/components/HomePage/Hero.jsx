import { Box, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import { heroImg } from '../../constants/Images';
import { hero } from '../../constants/Texts';
import { Buttons } from '../Button';

function Hero() {
  return (
    <Box
      maxW={'100rem'}
      w={'full'}
      h={['100vh', '900px']}
      display={'flex'}
      alignItems={'center'}
      justifyContent={['flex-start', null, 'center', 'space-between']}
      flexWrap={'wrap'}
      mt={['0', null, null, '-50px']}
      mb={'50px'}
      position={'relative'}
      gap={[null, null, '5rem', null]}
    >
      <div className="dark-light animated"></div>
      <div className="purple-light animated"></div>
      <div className="light animated"></div>
      <Box
        position={'relative'}
        w={'500px'}
        display={'flex'}
        flexDirection={'column'}
        gap={'1rem'}
        justifyContent={'center'}
        alignItems={['center', null, null, 'flex-start']}
        color={'#fff'}
        zIndex={'10'}
        textAlign={['center', null, null, 'left']}
      >
        <Heading as={'h1'} fontSize={['h1', null, 'h1', 'h1']}>
          {hero.name}
        </Heading>
        <Heading
          as={'h3'}
          mb={'2rem'}
          fontSize={['h3', 'h2']}
          fontWeight={'100'}
        >
          {hero.title}
        </Heading>
        <Buttons link={hero.link} text={hero.buttonText} />
      </Box>

      <Box
        position={'relative'}
        w={['550px', null, '600px', '700px']}
        h={['350px', null, '600px', '700px']}
        borderRadius={'62% 38% 40% 60% / 79% 49% 51% 21% '}
        bg={'linear-gradient(292.86deg, #6622BD -36.09%, #000000 110%)'}
        zIndex={'10'}
        className="animated"
      >
        <Image
          boxSize={['250px', '450px']}
          src={heroImg.laptop}
          className="laptop"
        />
        <Image
          boxSize={['150px', '250px']}
          src={heroImg.phone}
          className="phone"
        />
      </Box>
    </Box>
  );
}

export default Hero;
