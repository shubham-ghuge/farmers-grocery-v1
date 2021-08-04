import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, setMessage } from "../features/addressSlice";
import { Alert } from "./Alert";

function Address() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [addressData, setAddressData] = useState({ address: "", pincode: 0 });
  const { loading, message, address } = useSelector((state) => state.address);

  function addressHandler(event) {
    event.preventDefault();
    dispatch(addAddress(addressData));
    setAddressData({ address: "", pincode: 0 });
  }
  return (
    <div className="flex-column ai-start w-sm-30 address-w bgc-base-100 py-2 mb-2 pb-2 bdrs-2">
      {message && (
        <Alert
          message={message}
          onClose={() => dispatch(setMessage())}
          color="primary"
        />
      )}
      <h2 className="fsz-2">Your Addresses</h2>
      {address.length === 0 ? (
        <h2 className="fsz-1 ml-3 p-3">No Address found please Add One</h2>
      ) : (
        <div className="list-container bgc-base-100">
          {address.map(
            (i, idx) =>
              i.address && (
                <div className="list-item" key={idx}>
                  <p>{i.address}</p>
                  <p>{i.pincode}</p>
                </div>
              )
          )}
        </div>
      )}
      <div className="flex-column ai-start">
        <button
          id="#address"
          className="btn-primary mx-4"
          onClick={() => setToggle((curr) => !curr)}
        >
          {toggle ? "close" : "Add new address"}
        </button>
        {toggle && (
          <form className="flex-column m-4" onSubmit={(e) => addressHandler(e)}>
            <label className="fsz-1 flex-column fw-500">
              <span className="mb-2">Address</span>
              <input
                type="text"
                className="input"
                value={addressData.address}
                onChange={(e) =>
                  setAddressData((curr) => ({
                    ...curr,
                    address: e.target.value,
                  }))
                }
              />
            </label>
            <label className="fsz-1 flex-column fw-500">
              <span className="mb-2 text-sm">Pin Code</span>
              <input
                className="input"
                type="number"
                value={addressData.pincode}
                onChange={(e) =>
                  setAddressData((curr) => ({
                    ...curr,
                    pincode: e.target.value,
                  }))
                }
              />
            </label>
            <button style={{ alignSelf: "flex-start" }} className="btn-primary">
              {loading ? "loading" : "add address"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
export { Address };
