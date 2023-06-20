import React, { useState, useEffect } from "react";
import { useStoreContext } from '../utils/GlobalState';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT, DELETE_PRODUCT } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import { QUERY_ALL_PRODUCTS } from '../utils/queries';
import '../index.css'
import { idbPromise } from '../utils/helpers';
import { UPDATE_PRODUCTS, ADD_PRODUCT as ADD_PRODUCT_ACTION } from "../utils/actions";


function SellArt() {
  // const [userProducts, setUserProducts] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    image: "",
    artist: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
  });
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [state, dispatch] = useStoreContext();

  const { categories, products } = state;


const { data: userData, loading: userLoading } = useQuery(QUERY_USER);
// const { loading: productsLoading, data: userProductsData } = useQuery(QUERY_ALL_PRODUCTS);


// useEffect(() => {
//   if (!userLoading && !productsLoading && userProductsData) {
//     const filteredUserProducts = userProductsData.products.filter(
//       (product) => product?.user?._id === userData?.user._id
//     );
//     setUserProducts(filteredUserProducts);
//   }
// }, [userLoading, productsLoading, userProductsData, userData]);

const { loading, data, refetch } = useQuery(QUERY_ALL_PRODUCTS);

useEffect(() => {
  refetch();
}, [refetch]);

useEffect(() => {
  if (data) {
    dispatch({
      type: UPDATE_PRODUCTS,
      products: data.products,
    });
    data.products.forEach((product) => {
      idbPromise('products', 'put', product);
    });
  } else if (!loading) {
    idbPromise('products', 'get').then((products) => {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: products,
      });
    });
  }
}, [data, loading, dispatch]);

function filterProducts() {
  if (!userData) {
    return [];
  }

  return state.products.filter(
    (product) => product?.user?._id === userData?.user._id
  );
}


const handleFormSubmit = async (event) => {
  event.preventDefault();

  const {data} =await addProduct({
    variables: {
      name: formState.name,
      image: formState.image,
      artist: formState.artist,
      price: parseFloat(formState.price),
      quantity: parseInt(formState.quantity),
      description: formState.description,
      category: formState.category,
      user: userData.user._id
    },
  });

  const addedProduct = data?.addProduct;

  if (addedProduct) {
    // setUserProducts((prevProducts) => [...prevProducts, addedProduct]);
    dispatch({
      type: ADD_PRODUCT_ACTION,
      product: addedProduct,
    });
    idbPromise('products', 'put', addedProduct);
  }

  setFormState({
    name: '',
    image: '',
    artist: '',
    price: '',
    quantity: '',
    description: '',
    category: ''
  });
};

const handleChange = (event) => {
  const { name, value } = event.target;

  if (name === "category") {
    console.log('name', name);
    console.log('value', value);
    const selectedCategory = categories.find(
      (category) => category._id === value
    );
    console.log('selected cat', selectedCategory)
    setFormState((prevState) => ({
      ...prevState,
      category: selectedCategory ? selectedCategory._id : "", 
    }));
  } else {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
};

  const handleDelete = async (productId) => {
    try {
      await deleteProduct({
        variables: { productId },
        update: (cache) => {
          cache.modify({
            fields: {
              userProducts(existingProducts = [], { readField }) {
                const updatedProducts = existingProducts.filter(
                  (productRef) => productId !== readField('_id', productRef)
                );
                return updatedProducts;
              },
            },
          });
        },
      });
      // setUserProducts((prevProducts) =>
      //   prevProducts.filter((product) => product._id !== productId)
      // );
      const updatedProducts = state.products.filter((product) => product._id !== productId);
      dispatch({
        type: UPDATE_PRODUCTS,
        products: updatedProducts,
      });
      idbPromise('products', 'delete', {_id: productId});
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  }

  return (
    <>
      <div className="mx-2 form-container">
        <h3>What would you like to sell?</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="my-1">
            <label for="name">
              Title of Artwork:
            </label>
            <input type="text" name="name" id="name" onChange={handleChange} value={formState.name} />
          </div>

          <div className="my-1">
            <label for="image" >
              Image URL:
            </label>
            <input type="text" name="image" id="image" onChange={handleChange} value={formState.image} />
          </div>

          <div className="my-1">
            <label for="artist">
              Artist's Name:
            </label>
            <input type="text" name="artist" id="artist" onChange={handleChange} value={formState.artist} />
          </div>

          <div className="my-1">
            <label for="price" >
              Price:
            </label>
            <input type="text" name="price" id="price" onChange={handleChange} value={formState.price} />
          </div>

          <div className="my-1">
            <label for="quantity">
              Quantity:
            </label>
            <input type="text" name="quantity" id="quantity" onChange={handleChange} value={formState.quantity} />
          </div>

          <div className="my-1">
            <div>
              <div>
                <label for="description">
                  Description:
                </label>
              </div>
            </div>
            <div>
              <div>
                <textarea
          
                  type="text"
                  id="description"
                  name="description"
                  rows="3"
                  cols="50"
                  onChange={handleChange}
                  value={formState.description}
                ></textarea>
              </div>
            </div>
            <div>
              <label for="category">Select Category</label>
              <select
                id="category"
                name="category"
                onChange={handleChange}
                value={formState.category}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="mx-2 my-2 form-container spacing">
        <h3>Your Listed Artwork:</h3>
        {filterProducts().map((product) => (
                  <div className="row mb-2">
                  <div className="col-md-8">
                    <h4>{product.name}</h4>
                  </div>
                  <div>
                    <button id="delete" onClick={() => handleDelete(product._id)} data-id={product._id}>REMOVE LISTING</button>
                  </div>
                </div>

        ))}

      </div>
    </>
  );
}

export default SellArt;
