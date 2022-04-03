import { Container } from '@material-ui/core';
import { Auth, Home, Navbar } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

  return (

    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>

  );
}

export default App;