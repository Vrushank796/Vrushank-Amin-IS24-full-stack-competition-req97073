import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); //Using useLocation to fetch the productToEdit data sent from listProducts component
  const [editProduct, setEditProduct] = useState(state); //To manage the editProduct data

  //Handle Edit Product form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Call API endpoint to update the product information based on productId
    try {
      const response = await axios.put(
        `http://localhost:3000/api/product/${editProduct.productId}`,
        editProduct
      );
      console.log(response.data);
      alert(response.data);
      navigate('/');
    } catch (error) {
      alert(error);
    }
  };

  //Handle input change in Edit Product Form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditProduct((prevState) => ({
      ...prevState,
      [name]: value.replace(/[^a-zA-Z ]/g, ''),
    }));
  };

  return (
    <div className='dark:bg-slate-800'>
      <div className='justify-center items-center m-auto p-6 lg:w-1/2 sm:w-full dark:bg-slate-800'>
        <div className='text-left '>
          <button
            type='button'
            onClick={() => {
              navigate('/');
            }}
            className='w-auto my-10  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
          >
            Back to Products
          </button>
          <h3 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>
            Edit Product Information
          </h3>

          <form onSubmit={handleSubmit} className='text-left'>
            <label className=' text-gray-900 font-bold dark:text-white'>
              Product Name
            </label>
            <input
              type='text'
              name='productName'
              className='appearance-none block w-full text-gray-700 bg-white border rounded  px-1 py-1 mb-5 focus:outline-none focus:bg-white dark:text-grey-700'
              value={editProduct.productName}
              onChange={handleChange}
              required
              placeholder='Enter Product Name'
            />
            <label className=' text-gray-900 font-bold dark:text-white'>
              Product Owner Name
            </label>
            <input
              type='text'
              name='productOwnerName'
              value={editProduct.productOwnerName}
              className='appearance-none block w-full text-gray-700 border rounded py-1 px-1 mb-5  focus:outline-none focus:bg-white dark:text-grey-700'
              onChange={handleChange}
              required
              placeholder='Enter Product Owner Name'
            />

            <label className=' text-gray-900 font-bold dark:text-white'>
              Developers
            </label>
            <input
              type='text'
              name='developers'
              value={editProduct.Developers.join(',')}
              required
              placeholder='Enter Developers Name (John Smith,Jack Jonas,...(Up to 5))'
              className='appearance-none block w-full text-gray-700 border rounded py-1 px-1 mb-5  focus:outline-none focus:bg-white dark:text-grey-700'
              onChange={(event) => {
                //Validate - Developers names are only allowed up to 5
                const Developers = event.target.value.split(',');
                if (Developers.length <= 5) {
                  setEditProduct((prevState) => ({
                    ...prevState,
                    Developers,
                  }));
                } else {
                  alert(
                    'Error: You are only allowed to include upto 5 developers'
                  );
                }
              }}
            />

            <label className=' text-gray-900 font-bold dark:text-white'>
              Scrum Master Name
            </label>
            <input
              type='text'
              name='scrumMasterName'
              className='appearance-none block w-full text-gray-700 border rounded py-1 px-1 mb-5  focus:outline-none focus:bg-white dark:text-grey-700'
              value={editProduct.scrumMasterName}
              onChange={handleChange}
              placeholder='Enter Scrum Master Name'
              required
            />

            <label className=' text-gray-900 font-bold dark:text-white'>
              Start Date
            </label>
            <input
              type='text'
              name='startDate'
              className='appearance-none block w-full text-gray-700 border rounded py-1 px-1 mb-5  focus:outline-none focus:bg-white dark:text-black dark:bg-gray-500'
              value={editProduct.startDate}
              disabled
            />

            <label className=' text-gray-900 font-bold dark:text-white block   '>
              Methodology
            </label>
            <select
              name='methodology'
              value={editProduct.methodology}
              className='block appearance-none w-full  border border-gray-200 text-gray-700 py-2 px-4  mb-5 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:text-grey-700'
              onChange={handleChange}
              required
            >
              <option value='' defaultValue disabled>
                --Select Methodology--
              </option>
              <option value='Agile'>Agile</option>
              <option value='Waterfall'>Waterfall</option>
            </select>
            <button
              type='submit'
              data-modal-hide='add-product-modal'
              className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
