import React, { useEffect, useState, useCallback } from 'react';
import styles from './ListProducts.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListProducts = (props) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]); //State to manage list of products
  const [totalProducts, setTotalProducts] = useState(0); //Keep track of total products
  const [search, setSearch] = useState(''); // Set search query and it helps to filter products

  //function to navigate to edit product page
  const toEditProduct = (productToEdit) => {
    //using state to send productToEdit data to EditProduct Form component
    navigate(`/edit-product/${productToEdit.productId}`, {
      state: productToEdit,
    });
  };

  //function to fetch the products list
  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setProducts]);

  //To filter the products based on either searched scrumMaster name or developer name
  const filteredProducts = search
    ? products.filter((item) => {
        const hasScrumMaster = item.scrumMasterName
          .toLowerCase()
          .includes(search.toLowerCase());
        const hasDeveloper = item.Developers.some((dev) =>
          dev.toLowerCase().includes(search.toLowerCase())
        );
        return hasScrumMaster || hasDeveloper;
      })
    : products;

  //useEffect to render list of products based on it's dependencies
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    //set search and totalProducts state based on search query
    if (props.query !== '') {
      setSearch(props.query);
      const totalProducts = filteredProducts.length;
      setTotalProducts(totalProducts);
    } else {
      setSearch(props.query);
      const totalProducts = products.length;
      setTotalProducts(totalProducts);
    }
  }, [filteredProducts, products, search, props.query]);

  return (
    <div className='flex flex-col justify-center m-10'>
      <div className='text-left  mt-2 text-2xl text-semibold lg:m-2 '>
        Total Products: {totalProducts}
      </div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Product Number</th>
            <th className={styles.th}>Product Name</th>
            <th className={styles.th}>Product Owner</th>
            <th className={styles.th}>Developer Names</th>
            <th className={styles.th}>Scrum Master</th>
            <th className={styles.th}>Start Date</th>
            <th className={styles.th}>Methodology</th>
            <th className={styles.th}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {search !== '' && !totalProducts ? (
            <tr className={styles.error}>
              <td colSpan={8} className={styles.td}>
                <span className='text-black dark:text-white'>
                  No product task found for searched role!
                </span>
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr className={styles.tr} key={product.productId}>
                <td className={styles.td}>{product.productId}</td>
                <td className={styles.td}>{product.productName}</td>
                <td className={styles.td}>{product.productOwnerName}</td>
                <td className={styles.td}>
                  {product.Developers.map((dev, i) => (
                    <span key={i}>
                      {dev}
                      <br />
                    </span>
                  ))}
                </td>
                <td className={styles.td}>{product.scrumMasterName}</td>
                <td className={styles.td}>{product.startDate}</td>
                <td className={styles.td}>{product.methodology}</td>
                <td className={styles.td}>
                  <button
                    type='button'
                    onClick={() => {
                      toEditProduct(product);
                    }}
                    className='px-4 py-2 font-semibold text-sm bg-yellow-600 text-white rounded-md shadow-sm hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 ease-in-out duration-300'
                  >
                    Edit Product
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListProducts;
