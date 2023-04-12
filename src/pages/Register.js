import { useState } from "react";
import { useHistory } from "react-router-dom";
import authService from "../services/AuthService";

export default function Register({ onRegister }) {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name:"",
    image_url: "",
    tos:0
  });

  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  

  const handleChange = (e) => {
    setCredentials({...credentials, tos: !credentials.tos})
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setInvalidCredentials(false);

    try {
      await authService.register(credentials);
      history.push("/");
      onRegister();
      console.log("logged in successfully");
    } catch(err) {
      setInvalidCredentials(true);
      // alert("invalid credentials");
      console.log(err.response.data.message)
      setErrMessage(err.response.data.message);
    }
    
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
          value={credentials.firstName}
          placeholder="First Name"
          onChange={({ target }) =>
            setCredentials({ ...credentials, first_name: target.value })
          }
        />

        <input
          required
          value={credentials.lastName}
          placeholder="Last Name"
          onChange={({ target }) =>
            setCredentials({ ...credentials, last_name: target.value })
          }
        />

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
        <input
          required
          value={credentials.password_confirmation}
          type="password"
          placeholder="Confirm password"
          onChange={({ target }) =>
            setCredentials({
              ...credentials,
              password_confirmation: target.value,
            })
          }
        />
        {invalidCredentials && (
          <p style={{ color: "red" }}>{errMessage}</p>
        )}
        <input
          value={credentials.image_url}
          type="url"
          placeholder="Image_URL"
          onChange={({ target }) =>
            setCredentials({
              ...credentials,
              image_url: target.value,
            })
          }
        />

        <div>
          <input
          id="tosCheckbox"
          value={ credentials.tos }
          type="checkbox"
          onChange={(e)=> handleChange(e)}
          />
          <label htmlFor="tosCheckbox">Terms And Conditions</label>
        </div>
        
        <button>Register</button>
      </form>
    </div>
  );
}