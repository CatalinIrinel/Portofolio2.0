import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
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
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};
function EditTechsPage() {
  const navigate = useNavigate();

  const params = useParams();
  const { id: techId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [tech, setTech] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });

        const { data } = await axios.get(`/api/techs/${techId}`);

        setTech(data.tech);
        setImage(data.image);
        setDescription(data.description);

        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [techId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/techs/${techId}`,
        {
          _id: techId,
          tech,
          image,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Proiect editat cu succes');
      navigate('/admin/techs');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);

    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      setImage(data.secure_url);

      toast.success('Poza au fost urcata cu succes.');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  return (
    <Box
      minH={'60vh'}
      mx="3rem"
      py="4rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Helmet>
        <title>Edit Tech - Peak & Go</title>
      </Helmet>
      <Heading as={'h1'}>Editează Technologia {tech}</Heading>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox status="error">{error}</MessageBox>
      ) : (
        <Box
          marginTop={'3rem'}
          display={'flex'}
          justifyContent={'center'}
          w={'100%'}
          maxW={'1100px'}
        >
          <form onSubmit={submitHandler}>
            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="name" fontWeight={'bold'}>
                Website Name:{' '}
              </FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                value={tech}
                onChange={(e) => setTech(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="description" fontWeight={'bold'}>
                Description:
              </FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="image" fontWeight={'bold'}>
                Tech Image:
              </FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>
            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="image" fontWeight={'bold'}>
                Change Tech image:
              </FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                type={'file'}
                onChange={(e) => uploadFileHandler(e)}
              />
            </FormControl>

            <Button
              _hover={'none'}
              bg={'brand.500'}
              disabled={loadingUpdate}
              type="submit"
              color={'brand.100'}
            >
              Edit Tech
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </form>
        </Box>
      )}
    </Box>
  );
}

export default EditTechsPage;
