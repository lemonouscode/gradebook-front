import { useState } from "react";
import { useHistory } from "react-router-dom";
import authService from "../services/AuthService";

export default function Login({onLogin}) {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setInvalidCredentials(false);

    try {
      const res = await authService.login(credentials);
      if(res.status == 'error'){
        setInvalidCredentials(true);
        alert("invalid credentials");
        return
      }
      onLogin();
      history.push("/");
    } catch {
      setInvalidCredentials(true);
      alert("invalid credentials");
    }
    console.log("logged in successfully");
  }

  return (
    <div>
      <h2>Login</h2>
      <form
        style={{ display: "flex", flexDirection: "column", width: 300 }}
        onSubmit={handleSubmit}
      >
        <input
          required
          value={credentials.email}
          type="email"
          placeholder="Email"
          onChange={({ target }) =>
            setCredentials({ ...credentials, email: target.value })
          }
        />
        <input
          required
          value={credentials.password}
          type="password"
          placeholder="Password"
          onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
          }
        />
        {invalidCredentials && (
          <p style={{ color: "red" }}>Invalid credentials</p>
        )}
        <button>Login</button>
      </form>
    </div>
  );
}