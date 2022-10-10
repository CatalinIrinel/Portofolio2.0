import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';

function DashboardPage() {
  return (
    <Box>
      <Helmet>
        <title>Dashboard - Peak & Go</title>
      </Helmet>
      <Heading as={'h1'}>Dashboard</Heading>
    </Box>
  );
}

export default DashboardPage;
