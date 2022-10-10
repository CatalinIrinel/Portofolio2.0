import {
  Avatar,
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
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
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
        <Box>
          {userInfo && userInfo.isAdmin && (
            <Menu id="admin-nav-dropdown">
              <MenuButton display="flex" alignItems="center">
                <Avatar marginRight="0.5rem" size="xs" bg="brand.400" />
                Administrator
                <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <Link to="/admin/dashboard" onClick={toggle}>
                  {' '}
                  <MenuItem>Dashboard</MenuItem>
                </Link>
                <Link to="/admin/projects" onClick={toggle}>
                  {' '}
                  <MenuItem>Proiecte</MenuItem>
                </Link>

                <MenuDivider />
                <Link
                  to="#signout"
                  onClick={() => {
                    signoutHandler();
                    toggle();
                  }}
                >
                  {' '}
                  <MenuItem> Log Out</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
