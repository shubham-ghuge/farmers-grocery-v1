import { FcShop } from "react-icons/fc";
export const NotFound = () => {
  return (
    <>
      <span
        className="d-flex jc-center"
        style={{ fontSize: "15rem", lineHeight: "1" }}
      >
        <FcShop />
      </span>
      <h1 className="text-center">404 Not Found</h1>
    </>
  );
};
