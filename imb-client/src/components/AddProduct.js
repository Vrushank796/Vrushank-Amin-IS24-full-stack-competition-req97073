import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineCancel } from 'react-icons/md#MdOutlineCancel ';

const AddProduct = (props) => {
  //product state to manage the product object
  const [product, setProduct] = useState({
    productName: '',
    productOwnerName: '',
    Developers: [],
    scrumMasterName: '',
    startDate: '',
    methodology: '',
  });

  //Handle Add Product form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Call API endpoint to add the new product
    try {
      const response = await axios.post(
        'http://localhost:3000/api/product',
        product
      );
      console.log(response.data);
      alert(response.data);
    } catch (error) {
      alert(error);
    }
    props.hideModal();
    window.location.reload();
  };

  //Handle input change in Add Product Form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value.replace(/[^a-zA-Z ]/g, ''),
    }));
  };

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-full h-full max-w-lg md:h-auto '>
          <div className='relative bg-white rounded-lg shadow dark:dark:bg-slate-800'>
            <button
              type='button'
              className='absolute top-5 right-5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
              onClick={() => props.hideModal()}
            >
              <MdOutlineCancel size={25} />
            </button>
            <div className='px-6 py-6 lg:px-12 text-left '>
              <h3 className='mb-5 text-2xl font-bold text-gray-900 dark:text-white '>
                Add Product Information
              </h3>

              <form onSubmit={handleSubmit} className='text-left'>
                <label className=' text-gray-900 font-bold dark:text-white'>
                  Product Name
                </label>
                <input
                  type='text'
                  name='productName'
                  className='appearance-none block w-full text-gray-700 border rounded  px-1 py-1 mb-5 focus:outline-none focus:bg-white dark:text-grey-700'
                  value={product.productName}
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
                  value={product.productOwnerName}
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
                  value={product.Developers.join(',')}
                  required
                  placeholder='Developers Name (John Smith,Jack Jonas,...(Upto 5))'
                  className='appearance-none block w-full text-gray-700 border rounded py-1 px-1 mb-5  focus:outline-none focus:bg-white dark:text-grey-700'
                  onChange={(event) => {
                    //Validate - Developers names are only allowed up to 5
                    const Developers = event.target.value.split(',');
                    if (Developers.length <= 5) {
                      setProduct((prevState) => ({
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
                  value={product.scrumMasterName}
                  onChange={handleChange}
                  placeholder='Enter Scrum Master Name'
                  required
                />

                <label className=' text-gray-900 font-bold dark:text-white'>
                  Start Date
                </label>
                <input
                  type='date'
                  name='startDate'
                  className='appearance-none block w-full text-gray-700 border rounded py-1 px-1 mb-5  focus:outline-none focus:bg-white dark:text-grey-700'
                  value={product.startDate}
                  onChange={(event) => {
                    const startDate = event.target.value;

                    setProduct((prevState) => ({
                      ...prevState,
                      startDate,
                    }));
                  }}
                  required
                />

                <label className=' text-gray-900 font-bold dark:text-white block   '>
                  Methodology
                </label>
                <select
                  name='methodology'
                  value={product.methodology}
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
                  className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
};

export default AddProduct;
