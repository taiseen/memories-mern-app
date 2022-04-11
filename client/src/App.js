import { Container } from '@material-ui/core';
import { Auth, Home, Navbar, PostDetails } from './components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (

    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          
          <Route path="/" element={<Navigate to='/posts' />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />

          <Route path="/auth" element={
            !user
              ? <Auth />
              : <Navigate to='/posts' />}
          />

        </Routes>
      </Container>
    </BrowserRouter>

  );
}

export default App;