import React, { useState } from 'react';
import Search from '../components/Search';
import ListProducts from '../components/ListProducts';
import AddProduct from '../components/AddProduct';

const Home = () => {
  const [search, setSearch] = useState(''); //To manage and update list of products based on search query
  const [showAddProductModal, setShowAddProductModal] = useState(false); //To manage add product modal (show/hide)

  //function to set search state
  const handleSearchRoles = (query) => {
    setSearch(query);
  };

  //function to hide add product modal
  const hideAddProductModal = () => {
    setShowAddProductModal(false);
  };

  return (
    <div className='flex flex-col justify-center text-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-medium p-9'>
          IMB-Manage and Track Product Information
        </h1>
      </div>

      {/* Search Bar */}
      <Search searchRoles={handleSearchRoles} />

      {/* Add Product Button */}
      <div className=''>
        <button
          type='button'
          onClick={() => setShowAddProductModal(true)}
          className='px-4 py-2 font-semibold text-lg bg-blue-500 text-white rounded-md shadow-sm hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 ease-in-out duration-300'
        >
          Add Product
        </button>

        {/* Display Add Product Modal when Add Product button is clicked, modal is handled using showAddProductModal state*/}
        {showAddProductModal ? (
          <AddProduct
            showModal={showAddProductModal}
            hideModal={hideAddProductModal}
          />
        ) : null}
      </div>

      {/* Display List of Products */}
      <ListProducts query={search} />
    </div>
  );
};

export default Home;
