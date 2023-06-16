import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER, UPDATE_INV } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  const [updateProduct] = useMutation(UPDATE_INV);
  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");

      console.log(cart);
      cart.forEach((item) => {
        console.log(item.quantity);
        const inventory = item.quantity - item.purchaseQuantity;
        console.log(item.purchaseQuantity)
        console.log(inventory);
        updateProduct({
          variables: {
            _id: item._id,
            quantity: item.purchaseQuantity,
          },
        });
      });
      const products = cart.map((item) => item._id);
      console.log(products);
      console.log(cart);
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }

      //      setTimeout(() => {
      //        window.location.assign('/');
      //      }, 3000);
    }

    saveOrder();
  }, [addOrder, updateProduct]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
