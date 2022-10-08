import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { resetToken } = useParams();
  const history = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const res = await fetch(
        `https://edgee-commercebackend-production.up.railway.app/api/auth/reset-password/${resetToken}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
          mode: "cors",
        }
      );
      if (!res.ok) throw new Error("Invalid Request");
      const data = await res.json();
      localStorage.setItem("authToken", data.token);
      history("/");
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="bg-gray-100 w-full h-[100vh] py-24 flex flex-col">
      <form
        className="container max-w-sm sm:max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2"
        onSubmit={onSubmitHandler}
      >
        <div className=" px-6 py-8  text-black w-full abel">
          <h1 className="mb-12 text-4xl text-center">Forgot Password</h1>
          {error && (
            <p className="text-center text-black w-full px-4 py-3 bg-red-200 mb-4 rounded">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="" className="text-black abel text-xl font-[500]">
              Password
            </label>
            <input
              type="password"
              className="block bg-gray-100 border-b-2 border-blackish w-full outline-none py-2 px-3 mb-8"
              name="fullname"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="" className="text-black abel text-xl font-[500]">
              Confirm Password
            </label>
            <input
              type="password"
              className="block bg-gray-100 border-b-2 border-blackish w-full outline-none py-2 px-3 mb-8"
              name="fullname"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className={
              "w-full text-center py-4  hover:bg-mostlyblack bg-black text-white text-2xl hover:bg-green-dark focus:outline-none mb-4 abel"
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
