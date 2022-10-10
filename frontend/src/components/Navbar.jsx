import {
  Avatar,
  Box,
  Image,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { logo } from '../constants/Images';

function Navbar({ toggle }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };
  return (
    <Box
      w={'full'}
      h={'150px'}
      display={'flex'}
      justifyContent={['space-between', null, null, 'center']}
      alignItems={'center'}
      background={'brand.100'}
      px={['1rem', '7.5rem']}
      p={['6']}
    >
      <Box display={['block', null, null, 'none']}>
        <Link to="/">
          <Image
            boxSize={'70px'}
            src={logo}
            alt={'Peak & Go - Web Development'}
          />
        </Link>
      </Box>
      <Box display={['block', null, null, 'none']} onClick={toggle}>
        <HamburgerIcon color="brand.600" boxSize={8} />
      </Box>
      <UnorderedList
        listStyleType={'none'}
        display={['none', null, null, 'flex']}
        alignItems={'center'}
        margin={0}
        gap={'1rem'}
        color={'brand.600'}
        fontWeight={'bold'}
        textTransform={'uppercase'}
      >
        <ListItem p={'1rem'} borderRadius={'50%'}>
          <Link to="/">Home</Link>
        </ListItem>
        <ListItem p={'1rem'} borderRadius={'50%'}>
          <Link to="/projects">Projects</Link>
        </ListItem>
        <ListItem>
          <Image
            boxSize={'70px'}
            src={logo}
            alt={'Peak & Go - Web Development'}
          />
        </ListItem>
        <ListItem p={'1rem'} borderRadius={'50%'}>
          <Link to="/about">About</Link>
        </ListItem>

        <ListItem p={'1rem'} borderRadius={'50%'}>
          <Link to="/contact">Contact</Link>
        </ListItem>
      </UnorderedList>
      <Box
        display={['none', null, null, 'block']}
        color={'#fff'}
        position={'absolute'}
        right={'10rem'}
        zIndex={10000}
      >
        {userInfo && userInfo.isAdmin && (
          <Menu id="admin-nav-dropdown">
            <MenuButton display="flex" alignItems="center">
              <Avatar marginRight="0.5rem" size="xs" bg="brand.400" />
              Administrator
              <ChevronDownIcon />
            </MenuButton>
            <MenuList bg={'brand.400'}>
              <Link to="/admin/dashboard">
                {' '}
                <MenuItem _focus={{ background: 'brand.500', color: '#000' }}>
                  Dashboard
                </MenuItem>
              </Link>

              <Link to="/admin/projects">
                {' '}
                <MenuItem _focus={{ background: 'brand.500', color: '#000' }}>
                  Proiecte
                </MenuItem>
              </Link>

              <Link to="/admin/techs">
                {' '}
                <MenuItem _focus={{ background: 'brand.500', color: '#000' }}>
                  Tehnologii
                </MenuItem>
              </Link>

              <MenuDivider />
              <Link to="#signout" onClick={signoutHandler}>
                {' '}
                <MenuItem _focus={{ background: 'brand.500', color: '#000' }}>
                  {' '}
                  Delogare
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
