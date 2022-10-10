import { Box } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export function SecondaryButtons({ web, text }) {
  return (
    <Box display={'flex'}>
      <Link to={web}>
        <Box
          bg={'none'}
          borderRadius={'0 1.8rem'}
          border={'3px solid'}
          borderColor={'brand.600'}
          color={'brand.600'}
          fontWeight={'semibold'}
          w={'200px'}
          h={'40px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {text}
        </Box>
      </Link>
    </Box>
  );
}
export const Buttons = ({ link, text }) => {
  return (
    <Box display={'flex'}>
      <Link to={link}>
        <Box
          bg={'brand.600'}
          borderRadius={'0 1.8rem'}
          color={'#000'}
          fontWeight={'semibold'}
          w={'200px'}
          justifyContent={'center'}
          h={'40px'}
          display={'flex'}
          alignItems={'center'}
        >
          {text}
        </Box>
      </Link>
    </Box>
  );
};
