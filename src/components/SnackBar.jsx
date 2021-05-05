import { useEffect } from "react";
export const SnackBar = ({ text }) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      clearInterval(timerId);
    }, 2000);
  }, []);
  return (
    <div class="snackbar">
      {text}
      <button class="cta">
        <i class="bx bx-x"></i>
      </button>
    </div>
  );
};
