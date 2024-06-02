import { useState } from "react";
import LoginButton from "../component/LoginButton";
import LogoutButton from "../component/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]); // Get the first selected file
  };

  return (
    <>
      <nav>
        <div className="logo">
          <h2>GIF.io</h2>
        </div>
        <ul>
          <li>Home</li>
          <li>Service</li>
          <li>About Us</li>
        </ul>
        <div className="customize">
          <input type="file" onChange={handleFileUpload} />
          <button className="btn">Create</button>
        </div>
        <div className="auth">
          {isAuthenticated && <p>{user.name}</p>}
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
