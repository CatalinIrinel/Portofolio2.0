import { Box, Image, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegCopyright } from 'react-icons/fa';
import { logo } from '../constants/Images';

function Footer() {
  return (
    <Box
      w={'100%'}
      h={['24rem', null, null, '6.25rem']}
      bg={'linear-gradient(180deg, #1D0330 0%, #7063BF 100%)'}
      px={['1rem', null, '3rem', '7.5rem']}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      color={'#fff'}
      zIndex={100}
    >
      <Box
        py={['2rem', null, null, 0]}
        w={'100%'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={['center', 'space-between']}
        flexDirection={['column', null, null, 'row']}
        gap={['3rem', null, null, 0]}
      >
        <Box w={['fit-content', null, null, '18rem']}>
          <Image
            boxSize={'70px'}
            src={logo}
            alt={'Peak & Go - Web Development'}
          />
        </Box>

        <UnorderedList
          listStyleType={'none'}
          display={'flex'}
          flexWrap={'wrap'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={['column', null, null, 'row']}
          gap={['1rem', null, null, '3rem']}
          m={0}
        >
          <ListItem textDecoration={'underline'}>
            <Link to="/projects">Projects</Link>
          </ListItem>
          <ListItem>Peak & Go - Web Development</ListItem>
          <ListItem textDecoration={'underline'}>
            <Link to="/contact">Contact</Link>
          </ListItem>
        </UnorderedList>

        <Box
          w={['fit-content', null, null, '18rem']}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          fontSize={'.8rem'}
        >
          {' '}
          All rights reserver &nbsp;
          <FaRegCopyright size={'.8rem'} />
          &nbsp; Peak & Go - {new Date().getFullYear()}
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
