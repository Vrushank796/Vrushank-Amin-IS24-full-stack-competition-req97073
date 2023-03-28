import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditProduct from './components/EditProduct';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/edit-product/:id' element={<EditProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
