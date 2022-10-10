import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import EditProjectPage from './pages/EditProjectPage';
import ProjectListPage from './pages/ProjectListPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Footer from './components/Footer';
import { Box } from '@chakra-ui/react';
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './ScrollToTop';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
// Toast alerts
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TechsListPage from './pages/TechsListPage';
import EditTechsPage from './pages/EditTechPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <Navbar toggle={toggler} />
      <Sidebar isOpen={isOpen} toggle={toggler} />
      <ScrollToTop />
      <ToastContainer position="top-center" limit={1} />
      <Box
        bg={'linear-gradient(292.86deg, #000000 -46.09%, #6622BD 96.9%)'}
        px={['3rem', null, '5rem', '7.5rem']}
        py={['2rem', null, null, '3rem']}
        color={'#FFf'}
        overflow={'hidden'}
      >
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/about'} element={<AboutPage />} />
          <Route path={'/projects'} element={<ProjectsPage />} />
          <Route path={'/contact'} element={<ContactPage />} />
          <Route path={'/login'} element={<LogInPage />} />
          <Route path={'/register'} element={<RegisterPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <DashboardPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/project/:id"
            element={
              <AdminRoute>
                <EditProjectPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/techs/:id"
            element={
              <AdminRoute>
                <EditTechsPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/projects"
            element={
              <AdminRoute>
                <ProjectListPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/techs"
            element={
              <AdminRoute>
                <TechsListPage />
              </AdminRoute>
            }
          />
        </Routes>
      </Box>
      <Footer />
    </Router>
  );
}

export default App;
