import {
  Avatar,
  AvatarBadge,
  Box,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

function Sidebar({ isOpen, toggle }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };
  return (
    <Box
      display={['flex', null, null, 'none']}
      position={'fixed'}
      zIndex={1001}
      w={'full'}
      h={'100vh'}
      bg={'linear-gradient(292.86deg, #000000 -46.09%, #6622BD 96.9%)'}
      alignItems={'center'}
      justifyContent={'center'}
      left={0}
      transition={'all 0.3s ease-in-out'}
      opacity={`${isOpen ? '100%' : '0'}`}
      top={`${isOpen ? '0' : '-100%'}`}
    >
      <Box
        w={'full'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        color={'brand.600'}
        gap={'1.5rem'}
      >
        <Box
          w="100%"
          p="2rem"
          position={'absolute'}
          bottom={'1rem'}
          right={'1rem'}
          display="flex"
          justifyContent="flex-end"
        >
          <CloseIcon boxSize={6} onClick={toggle} />
        </Box>
        <Box mb={'1rem'}>
          {userInfo && userInfo.isAdmin && (
            <Menu id="admin-nav-dropdown">
              <MenuButton display="flex" alignItems="center">
                <Avatar
                  name="Istratoae Catalin"
                  size="md"
                  bg="brand.600"
                  color="#000"
                >
                  <AvatarBadge
                    boxSize={'1.25rem'}
                    bg={'green.500'}
                    border={'none'}
                  />
                </Avatar>
              </MenuButton>
              <MenuList bg={'brand.400'}>
                <Link to="/admin/dashboard">
                  {' '}
                  <MenuItem
                    _focus={{ background: 'brand.500', color: '#000' }}
                    onClick={toggle}
                  >
                    Dashboard
                  </MenuItem>
                </Link>

                <Link to="/admin/projects">
                  {' '}
                  <MenuItem
                    _focus={{ background: 'brand.500', color: '#000' }}
                    onClick={toggle}
                  >
                    Proiecte
                  </MenuItem>
                </Link>

                <Link to="/admin/techs">
                  {' '}
                  <MenuItem
                    _focus={{ background: 'brand.500', color: '#000' }}
                    onClick={toggle}
                  >
                    Tehnologii
                  </MenuItem>
                </Link>

                <MenuDivider />
                <Link to="#signout" onClick={signoutHandler}>
                  {' '}
                  <MenuItem
                    _focus={{ background: 'brand.500', color: '#000' }}
                    onClick={toggle}
                  >
                    {' '}
                    Delogare
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          )}
        </Box>
        <UnorderedList
          listStyleType="none"
          fontSize="1.5rem"
          m={'0'}
          display={'flex'}
          flexDir={'column'}
          alignItems={'center'}
          gap={'4rem'}
        >
          <ListItem mb="1rem" onClick={toggle}>
            <Link to="/">Home</Link>
          </ListItem>
          <ListItem mb="1rem" onClick={toggle}>
            <Link to="/projects">Projects</Link>
          </ListItem>
          <ListItem mb="1rem" onClick={toggle}>
            <Link to="/about">About</Link>
          </ListItem>
          <ListItem mb="1rem" onClick={toggle}>
            <Link to="/contact">Contact</Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
}

export default Sidebar;
