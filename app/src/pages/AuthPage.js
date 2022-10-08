import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../store/auth/AuthContext";
import Navbar from "../components/Navbar";
const AuthPage = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(true);
  const { login, isLoggedIn } = useContext(AuthContext);
  const history = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (isLoggedIn) {
      history("/");
    }
    const isRegister = params.authMethod === "register";
    setIsRegister(isRegister);
  }, [params, history, isLoggedIn]);
  useEffect(() => {
    // if (localStorage.getItem("authToken")) {
    //   history("/");
    // }
  }, [history]);
  const setRegisterHandler = () => {
    history("/auth/register");
  };
  const setLoginHandler = () => {
    history("/auth/login");
  };

  const onSignupHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      setError("Passwords do not match");
    }
    try {
      const res = await fetch(
        "https://edgee-commercebackend-production.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
          mode: "cors",
        }
      );
      if (!res.ok) throw new Error("Invalid Credentials");
      const data = await res.json();
      const expirationTime = new Date(
        new Date().getTime() + data.expireIn
      ).toISOString();
      login(data.token, data.user, expirationTime);
      history("/");
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  const onLoginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://edgee-commercebackend-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailLogin, password: passwordLogin }),
          mode: "cors",
        }
      );
      if (!res.ok) throw new Error("Invalid Credentials");
      const data = await res.json();
      const expirationTime = new Date(
        new Date().getTime() + data.expireIn
      ).toISOString();
      login(data.token, data.user, expirationTime);
      history(-1);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <>
      <Navbar changeColor={true} isShadow={false} />
      <div className=" min-h-screen flex ">
        <form className="container max-w-sm sm:max-w-md mx-auto flex-1 flex flex-col justify-center items-center pb-12 px-2">
          <div className=" px-6 py-8 text-black w-full ">
            <div className="flex justify-around mb-8">
              <a
                onClick={setRegisterHandler}
                className={`mb-8 text-4xl text-center abel ${
                  isRegister
                    ? "border-b-2 border-black text-black"
                    : "text-black/60 hover:text-black"
                } py-2 cursor-pointer`}
              >
                Sign up
              </a>
              <a
                onClick={setLoginHandler}
                className={`mb-8 text-4xl text-center abel ${
                  !isRegister
                    ? "border-b-2 border-black text-black"
                    : "text-black/60 hover:text-black"
                } py-2 cursor-pointer`}
              >
                Login
              </a>
            </div>
            {error && (
              <p className="text-center text-black w-full px-4 py-3 bg-red-200 mb-8 rounded abel">
                {error}
              </p>
            )}
            {isRegister ? (
              <>
                <div>
                  <label
                    htmlFor=""
                    className="text-black abel text-xl font-[500]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="block  border-b-2 border-blackish w-full outline-none py-2 px-3 mb-4"
                    name="fullname"
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-black abel text-xl font-[500]"
                  >
                    E-mail
                  </label>
                  <input
                    type="text"
                    className="block  border-b-2 border-blackish w-full outline-none py-2 px-3 mb-4"
                    name="fullname"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-black abel text-xl font-[500]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="block  border-b-2 border-blackish w-full outline-none py-2 px-3 mb-4"
                    name="fullname"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-black abel text-xl font-[500]"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="block  border-b-2 border-blackish w-full outline-none py-2 px-3 mb-8"
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
                  onClick={onSignupHandler}
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                <div>
                  <label
                    htmlFor=""
                    className="text-black abel text-xl font-[500]"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="block  border-b-2 border-blackish w-full outline-none py-2 px-3 mb-4"
                    name="fullname"
                    required
                    value={emailLogin}
                    onChange={(e) => {
                      setEmailLogin(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-black abel text-xl font-[500]"
                  >
                    Password
                  </label>
                  <input
                    className="block  border-b-2 border-blackish w-full outline-none py-2 px-3 mb-4"
                    name="fullname"
                    required
                    value={passwordLogin}
                    type="password"
                    onChange={(e) => {
                      setPasswordLogin(e.target.value);
                    }}
                  />
                </div>
                <h3 className="text-center mb-8 text-black hover:text-blackish text-[18px] abel">
                  <Link to="/auth/forgot-password">Forgot your password?</Link>
                </h3>
                <button
                  type="submit"
                  className={
                    "w-full text-center py-4  hover:bg-mostlyblack bg-black text-white text-2xl hover:bg-green-dark focus:outline-none mb-4 abel"
                  }
                  onClick={onLoginHandler}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthPage;
