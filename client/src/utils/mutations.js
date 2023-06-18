import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $artist: String
    $description: String
    $image: String
    $quantity: Int
    $price: Float!
    $user: ID
    $category: ID!
  ) {
    addProduct(
      name: $name
      artist: $artist
      description: $description
      image: $image
      quantity: $quantity
      price: $price
      user: $user
      category: $category
    ) {
      _id
      name
      artist
      description
      image
      quantity
      price
      user {
        _id
      }
      category {
        _id
        name
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId) {
      _id
    }
  }
`;

export const UPDATE_INV = gql`
  mutation updateProduct($_id: ID!, $quantity: Int!) {
    updateProduct(_id: $_id, quantity: $quantity) {
      _id
      quantity
    }
  }
`;
