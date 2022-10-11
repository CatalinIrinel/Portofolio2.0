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
  Link as ExtLink,
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
        projects: action.payload.projects,
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
function ProjectListPage() {
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      projects,
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
        const { data } = await axios.get(`/api/projects/admin?page=${page}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
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
        '/api/projects/new',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success('Project created successfully');
      dispatch({ type: 'CREATE_SUCCESS' });
      navigate(`/admin/project/${data.project._id}`);
    } catch (err) {
      toast.error(getError(error));
      dispatch({
        type: 'CREATE_FAIL',
      });
    }
  };
  const deleteHandler = async (project) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`/api/projects/${project._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Project deleted successfully');
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
        <title>Projects List - Peak & Go</title>
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
        <Heading as="h1" fontSize={'h1'}>
          Projects List
        </Heading>
        <Button
          type="button"
          onClick={createHandler}
          borderRadius={'0 1.5rem 0 1.5rem'}
          bg={'brand.600'}
          color={'#000'}
          _hover={'none'}
        >
          Add new project
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
                  <Th>ID</Th>
                  <Th>NAME</Th>
                  <Th>LINK</Th>
                  <Th>ACTIONS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {projects.map((project) => (
                  <Tr key={project._id}>
                    <Td>
                      <Image
                        w={'160px'}
                        src={project.image}
                        alt={'Web development ' + project.name}
                      />
                    </Td>
                    <Td>{project.name}</Td>
                    <Td>
                      <ExtLink
                        href={project.link}
                        target="_blank"
                        aria-label="facebook"
                        rel="noreferrer"
                      >
                        {project.link}
                      </ExtLink>{' '}
                    </Td>
                    <Td color={'#000'}>
                      <IconButton
                        fontSize={'1.5rem'}
                        onClick={() =>
                          navigate(`/admin/project/${project._id}`)
                        }
                        icon={<BiEdit />}
                      />{' '}
                      <IconButton
                        fontSize={'1.5rem'}
                        onClick={() => deleteHandler(project)}
                        icon={<BiTrash />}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box maxW={'1300px'} mt={'1rem'} w="full" display={'flex'}>
            {[...Array(pages).keys()].map((x) => (
              <Link key={x + 1} to={`/admin/projects?page=${x + 1}`}>
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

export default ProjectListPage;
