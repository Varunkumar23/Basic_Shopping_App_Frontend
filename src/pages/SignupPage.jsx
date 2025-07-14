import { Navbar } from "../components/Navbar";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const result = await resp.json();
      if (resp.status === 201) {
        alert("Registration Successfull");
        navigate("/login");
      } else {
        alert("Registration error", result.message);
      }
    } catch (err) {
      console.log("Error in Sign up ", err.message);
    }
  };

  return (
    <div>
      <div className="min-h-[100vh] p-4 flex items-center justify-center">
        <form
          onSubmit={handleRegister}
          className="p-5 flex-col items-start gap-4 bg-amber-500 rounded-lg"
        >
          <div className="flex gap-4 items-center">
            <label className="text-gray-700 text-2xl" htmlFor="user-email">
              E-mail:{" "}
            </label>
            <input
              id="user-email"
              type="email"
              name="email"
              required
              className="border-1 rounded-md py-1 px-2 text-indigo-700"
            ></input>
          </div>
          <div className="flex gap-4 items-center">
            <label className="text-gray-700 text-2xl" htmlFor="user-password">
              Password:{" "}
            </label>
            <input
              id="user-password"
              type="password"
              name="password"
              required
              className="border-1 my-6 rounded-md py-1 px-2 text-indigo-700"
            ></input>
          </div>
          <div className="flex flex-col gap-3 items-center self-stretch">
            <button className="bg-green-500 rounded-2xl w-25 border-1 py-1 px-2 cursor-pointer">
              Register
            </button>
            <p className="flex flex-col gap-2 items-center justify-center">
              <span>Already have an account?</span>
              <Link to="/login">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export { SignupPage };
