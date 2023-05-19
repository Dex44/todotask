import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Utils/AuthContext";
import apiCall from "../Utils/ApiCall";
import { toast } from "react-toastify";
import { ApiConstants } from "../Utils/Constant";
import LoaderComponent from "../Utils/Loader";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUserData } = useContext(AuthContext);

  const handleLogin = () => {
    if (username && password) {
      setLoading(true);
      const LoginData = {
        email: username,
        password: password,
      };
      apiCall
        .post(ApiConstants.loginApi, LoginData)
        .then((response) => {
          if (response?.data?.access_token) {
            return response?.data?.access_token;
          } else {
            toast.error("Something Went Wrong", { toastId: "loginerror" });
          }
        })
        .then((res) => {
          const headers = {
            Authorization: `Bearer ${res}`,
          };
          apiCall
            .get(ApiConstants.profileApi, {
              headers: headers,
            })
            .then((response) => {
              if (response?.data) {
                setUserData(response?.data);
                setToken(res);
                navigate("/dashboard");
              } else {
                toast.error("Something Went Wrong", { toastId: "loginerror" });
              }
            })
            .catch((error) => {
              console.log("error", error);
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message || "Something Went Wrong",
            { toastId: "loginerror" }
          );
          console.log("error", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("Enter Username & Password");
    }
  };

  return (
    <div>
      <section className="vh-100 gradient-custom">
        {loading ? <LoaderComponent /> : ""}
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        placeholder="Email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="form-label">Email</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        placeholder="Password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        value={password}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") handleLogin();
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label">Password</label>
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      onClick={() => handleLogin()}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
