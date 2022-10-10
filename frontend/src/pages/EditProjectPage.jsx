import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
  UnorderedList,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BiTrash } from 'react-icons/bi';
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
function EditProductPage() {
  const navigate = useNavigate();

  const params = useParams();
  const { id: projectId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [name, setName] = useState('');
  const [technology, setTechnology] = useState([]);
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [imgStart, setImgStart] = useState(true);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('1');

  const imagePosition = () => {
    if (value === '1') {
      setImgStart(true);
    } else {
      setImgStart(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });

        const { data } = await axios.get(`/api/projects/${projectId}`);

        setName(data.name);
        setTechnology(data.technology);
        setLink(data.link);
        setImage(data.image);
        setImgStart(data.imgStart);
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
  }, [projectId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(imgStart);
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/projects/${projectId}`,
        {
          _id: projectId,
          name,
          technology,
          link,
          image,
          imgStart,
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
      navigate('/admin/projects');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  const uploadFileHandler = async (e, forImages) => {
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

      if (forImages) {
        setTechnology([...technology, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success('Pozele au fost urcate cu succes.');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  const deleteFileHandler = async (fileName, f) => {
    setTechnology(technology.filter((x) => x !== fileName));
    toast.success('Poza stearsa cu succes.');
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
        <title>Edit Project - Peak & Go</title>
      </Helmet>
      <Heading as={'h1'}>EditProject {name}</Heading>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem">
              <FormLabel htmlFor="brand">Link:</FormLabel>
              <Input
                borderColor={'#000'}
                w={['300px', '500px']}
                type="text"
                value={link}
                isRequired
                onChange={(e) => setLink(e.target.value)}
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
              <FormLabel htmlFor="description" fontWeight={'bold'}>
                Where does the image start?
              </FormLabel>

              <RadioGroup
                onChange={() => {
                  setValue();
                  imagePosition();
                }}
                value={value}
              >
                <Stack>
                  {' '}
                  <Radio size={'lg'} value={'1'}>
                    Left side
                  </Radio>
                  <Radio size={'lg'} value={'0'}>
                    Right side
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormHelperText>
                Image now is on the {value === '1' ? 'left side' : 'right side'}
              </FormHelperText>
            </FormControl>

            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="image" fontWeight={'bold'}>
                Website Image:
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
                Change Website image:
              </FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                type={'file'}
                onChange={(e) => uploadFileHandler(e, false)}
              />
            </FormControl>
            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="image" fontWeight={'bold'}>
                Technologies
              </FormLabel>
              {technology.length === 0 && <MessageBox>Nici o poza</MessageBox>}
              <UnorderedList listStyleType={'none'}>
                {technology.map((x) => (
                  <ListItem key={x} mb={'0.5rem'}>
                    {x}

                    <IconButton
                      marginLeft={'0.5rem'}
                      bg={'brand.600'}
                      color={'brand.300'}
                      _hover={'none'}
                      onClick={() => deleteFileHandler(x)}
                      icon={<BiTrash />}
                    />
                  </ListItem>
                ))}
              </UnorderedList>
            </FormControl>

            <FormControl mb="2rem" w={'fit-content'}>
              <FormLabel htmlFor="image" fontWeight={'bold'}>
                Upload techs images:
              </FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                type={'file'}
                onChange={(e) => uploadFileHandler(e, true)}
              />
            </FormControl>

            <Button
              _hover={'none'}
              bg={'brand.500'}
              disabled={loadingUpdate}
              type="submit"
              color={'brand.100'}
            >
              Edit Project
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </form>
        </Box>
      )}
    </Box>
  );
}

export default EditProductPage;
