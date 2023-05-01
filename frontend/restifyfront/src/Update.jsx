import React, { useState } from 'react';
import './Update.css';
function Update() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/accounts/update/${userId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName,
      }),
    })
    .then(response => {
        if (response.ok) {
            alert("User updated!");
            return response.json();
            
        } else {
            alert("Error occured");
        }
    })
      .then(data => setResponse(JSON.stringify(data)))
      .catch(error => console.error(error));
  };

  return (
    
    <div  className="update-container">
      <h2>Update Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          First name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
