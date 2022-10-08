import { useState } from "react";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://edgee-commercebackend-production.up.railway.app/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          mode: "cors",
        }
      );
      if (!res.ok) throw new Error("Invalid Credentials");
      const data = await res.json();

      setMessage(data.data);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      setError(error.message);
      setEmail("");
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
          {message && (
            <p className="text-center text-black w-full px-4 py-3 bg-green-200 mb-4 rounded">
              {message}
            </p>
          )}
          <div>
            <label htmlFor="" className="text-black abel text-xl font-[500]">
              E-mail
            </label>
            <input
              type="text"
              className="block bg-gray-100 border-b-2 border-blackish w-full outline-none py-2 px-3 mb-8"
              name="fullname"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
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

export default ForgotPasswordPage;
