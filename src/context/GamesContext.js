import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, JSON_API_PRODUCTS } from "../information";

export const gamesContext = createContext();

export const useProducts = () => {
  return useContext(gamesContext);
};

const INIT_STATE = {
  products: [],
  oneProduct: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return { ...state, products: action.payload };
    case ACTIONS.GET_ONE_PRODUCT:
      return { ...state, oneProduct: action.payload };
    default:
      return state;
  }
};

const GamesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    try {
      let { data } = await axios(
        `${JSON_API_PRODUCTS}${window.location.search}`
      );
      let action = {
        type: ACTIONS.GET_PRODUCTS,
        payload: data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${JSON_API_PRODUCTS}/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      await axios.post(JSON_API_PRODUCTS, newProduct);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const getOneProduct = async (id) => {
    try {
      const { data } = await axios(`${JSON_API_PRODUCTS}/${id}`);
      let action = {
        type: ACTIONS.GET_ONE_PRODUCT,
        payload: data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const saveEditedProduct = async (id, newProduct) => {
    try {
      await axios.patch(`${JSON_API_PRODUCTS}/${id}`, newProduct);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  let values = {
    products: state.products,
    oneProduct: state.oneProduct,
    saveEditedProduct,
    addProduct,
    getProducts,
    deleteProduct,
    getOneProduct,
  };

  return (
    <gamesContext.Provider value={values}>{children}</gamesContext.Provider>
  );
};

export default GamesContextProvider;
