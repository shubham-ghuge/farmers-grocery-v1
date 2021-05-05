export const initialState = {
  productData: [],
  cart: [],
  bag: []
};

function productReducer(state, action) {
  const toggleState = (_id, toToggle, status) => {
    return state.productData.map((item) => {
      if (item._id === _id) {
        item[`${toToggle}`] = !status;
      }
      return item;
    });
  };
  const removeEle = (arr, ele) => {
    return arr.filter((item) => item !== ele);
  };
  const setQuantity = (productId, productQty) => {
    return state.productData.map((item) => {
      if (item._id === productId) {
        item.quantity = productQty;
      }
      return item;
    });
  };
  switch (action.type) {
    case "INITIALISE_DATA":
      return { ...state, productData: action.payload };

    case "ADD_TO_CART":
      const productInCart = action.payload._id;
      return {
        ...state,
        productData: toggleState(
          productInCart,
          "isInCart",
          action.payload.status
        ),
        cart: [...state.cart, { _id: productInCart, qty: 0 }]
      };

    case "ADD_TO_BAG":
      const productInBag = action.payload._id;
      return {
        ...state,
        productData: toggleState(
          productInBag,
          "isInBag",
          action.payload.status
        ),
        bag: action.payload.status
          ? removeEle(state.bag, productInBag)
          : state.bag.concat(productInBag)
      };

    case "REMOVE_FROM_BAG":
      return {
        ...state,
        productData: toggleState(
          action.payload._id,
          "isInBag",
          action.payload.status
        ),
        bag: removeEle(state.bag, action.payload._id)
      };

    case "INCREMENT":
      return {
        ...state,
        productData: setQuantity(action.payload.pid, action.payload.pqty)
      };

    case "DECREMENT":
      let filteredProducts = [];
      if (action.payload.pqty === 0) {
        filteredProducts = state.cart.filter(
          ({ _id }) => _id !== action.payload.pid
        );
      }
      return {
        ...state,
        cart: action.payload.pqty === 0 ? filteredProducts : state.cart,
        productData:
          action.payload.pqty !== 0
            ? setQuantity(action.payload.pid, action.payload.pqty)
            : toggleState(action.payload.pid, "isInCart", true)
      };

    default:
      return state;
  }
}
export default productReducer;
