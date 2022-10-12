import React from 'react';
import { Box, Heading, Image, Link, Text } from '@chakra-ui/react';

function Card({ name, src, description, techs, imgStart, link }) {
  const imgTechs = [...techs];
  return (
    <Box
      maxW={'1300px'}
      w={'full'}
      display={'grid'}
      justifyItems={['center', null, null, 'initial']}
      gridAutoColumns={'minmax(auto,1fr)'}
      gridTemplateAreas={[
        `'col2''col1'`,
        null,
        null,
        `${imgStart ? `'col2 col1'` : `'col1 col2'`}`,
      ]}
      gap={['2rem', null, null, 0]}
      data-aos={imgStart ? 'fade-right' : 'fade-left'}
      data-aos-duration={'1500'}
      data-aos-easing={'ease-in-out'}
    >
      <Box
        gridArea={'col1'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-evenly'}
        alignItems={[
          'center',
          null,
          null,
          `${imgStart ? 'flex-end' : 'flex-start'}`,
        ]}
        gap={['1rem', null, null, 0]}
      >
        <Heading
          as={'h2'}
          fontWeight={'semibold'}
          color={'#ffffff'}
          fontSize={['2rem', '2.5rem']}
          textAlign={'center'}
        >
          {name}
        </Heading>
        <Text
          color={'brand.500'}
          fontSize={['1rem', '1.2rem']}
          textAlign={imgStart ? 'right' : 'left'}
        >
          {description}
        </Text>
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          alignItems={'center'}
          gap={'.5rem'}
          mt={'1rem'}
        >
          {imgTechs.map((tech) => (
            <Image boxSize={'50px'} src={tech} alt={name} />
          ))}
        </Box>
      </Box>
      <Box
        gridArea={'col2'}
        display={'flex'}
        justifyContent={`${imgStart ? 'flex-start' : 'flex-end'}`}
        alignItems={'center'}
      >
        <Box
          w={'100%'}
          maxW={'550px'}
          borderRadius={'1rem'}
          overflow={'hidden'}
        >
          <Link href={link} isExternal target="_blank" aria-label={name}>
            <Image src={src} name={name} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
