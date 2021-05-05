import { createContext, useContext, useReducer } from "react";
import productReducer, { initialState } from "../reducers/productReducer";

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);
  return (
    <DataContext.Provider
      value={{
        products: state.productData,
        cart: state.cart,
        bag: state.bag,
        dispatch
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataProvider = () => {
  return useContext(DataContext);
};
