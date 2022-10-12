import {
  Box,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Image,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../Utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        techs: action.payload.techs,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

function TechsListPage() {
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      techs,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://peak.babyfie.ro/api/techs/admin?page=${page}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        'https://peak.babyfie.ro/api/techs/new',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success('Project created successfully');
      dispatch({ type: 'CREATE_SUCCESS' });
      navigate(`/admin/tech/${data.project._id}`);
    } catch (err) {
      toast.error(getError(error));
      dispatch({
        type: 'CREATE_FAIL',
      });
    }
  };
  const deleteHandler = async (tech) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`https://peak.babyfie.ro/api/techs/${tech._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Tech deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  return (
    <Box
      minH={'calc(100vh -  250px - 6rem)'}
      mx={['1rem', '3rem']}
      py={['2rem', '4rem']}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Helmet>
        <title>Techs List - Peak & Go</title>
      </Helmet>
      <Box
        maxW={'1100px'}
        w={'full'}
        display={'flex'}
        justifyContent={['center', null, 'space-between']}
        mb={'2rem'}
        flexWrap={'wrap'}
        gap={'2rem'}
      >
        <Heading as="h1">Techs List</Heading>
        <Button
          type="button"
          onClick={createHandler}
          borderRadius={'0 1.5rem 0 1.5rem'}
          bg={'brand.600'}
          color={'#000'}
          _hover={'none'}
        >
          Add new tech
        </Button>
      </Box>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox status="error">{error}</MessageBox>
      ) : (
        <>
          <TableContainer maxW={'1300px'} w="full">
            <Table variant="simple">
              <Thead bg={'brand.500'}>
                <Tr>
                  <Th>IMAGE</Th>
                  <Th>NAME</Th>
                  <Th>ACTIONS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {techs.map((tech) => (
                  <Tr key={tech._id}>
                    <Td>
                      <Image
                        w={'50px'}
                        h={'50px'}
                        objectFit={'contain'}
                        src={tech.image}
                      />
                    </Td>
                    <Td>{tech.tech}</Td>
                    <Td color={'#000'}>
                      <IconButton
                        fontSize={'1.5rem'}
                        onClick={() => navigate(`/admin/techs/${tech._id}`)}
                        icon={<BiEdit />}
                      />{' '}
                      <IconButton
                        fontSize={'1.5rem'}
                        onClick={() => deleteHandler(tech)}
                        icon={<BiTrash />}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box maxW={'1300px'} mt={'2rem'} w="full" display={'flex'}>
            {[...Array(pages).keys()].map((x) => (
              <Link key={x + 1} to={`/admin/techs?page=${x + 1}`}>
                <Box
                  border={'1px solid #fff'}
                  boxSize={'25px'}
                  mr={3}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  borderRadius={'0.3rem'}
                  color={x + 1 === Number(page) ? 'brand.100' : '#fff'}
                  bg={x + 1 === Number(page) ? 'brand.600' : 'transparent'}
                  fontWeight={x + 1 === Number(page) ? 'bold' : 'normal'}
                >
                  {x + 1}
                </Box>
              </Link>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default TechsListPage;
