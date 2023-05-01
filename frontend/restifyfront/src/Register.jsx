import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Check if password is at least 8 characters long and includes characters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('Password must be at least 8 characters long and include both letters and numbers.');
      return;
    }
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('avatar', avatar);
  
    fetch('http://localhost:8000/accounts/register/', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };
  
  

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  }

  const handleUsernameChange = (event) => {
    const input = event.target.value;
    if (/^[a-zA-Z]+$/.test(input)) {
      setUsername(input);
      setErrorMessage(null);
    } else {
      setErrorMessage('Username must contain only letters.');
    }
  }
  

  return (
    <div className="register-form register-background">
      <form onSubmit={handleSubmit}>
      {avatar && (
          <div className="avatar-preview">
            <img src={URL.createObjectURL(avatar)} alt="Avatar Preview" />
          </div>
        )}
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="firstName">First name:</label>
          <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last name:</label>
          <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="avatar">Avatar:</label>
          <input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} />
        </div>
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
  
}

export default Register;
