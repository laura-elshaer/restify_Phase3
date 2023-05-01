
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationForm.css';

function CommentsForm() {
    const [users, setUsers] = useState([]);
  const [reservation, setReservation] = useState({
    // user: "",
    content_object: "",
    name: "",
    email: "",
    content: "",
    isComment: "",
    rating: "",    
  });

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get('http://localhost:8000/accounts/users/');
      setUsers(response.data);
    }
    fetchUsers();
  }, []);

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [content, setcontent] = useState('');
//   const [reservation, setReservation] = useState({
//     User: "",
//     name: "",
//     email: "",
//     content: "",
//     isComment: "",
//     rating: "",
    
//   });
 // const [rating, setRating] = useState(0);

 const handleChange = (event) => {
    setReservation({
      ...reservation,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ ...reservation });

  }
 
  const handleReserve = async(reservation) => {
    //setIsReserving(true);
  
    
      const payload = {
        //User: reservation.User,
        content_object : reservation.content_object,
        name: reservation.name,
        email: reservation.email,
        content: reservation.content,
        isComment: reservation.isComment,
        rating: reservation.rating,
        
      };
  
      const response = await fetch(`http://localhost:8000/comments/add/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);
     // setIsReserving(false);

      if (response.ok) {
        alert("Comment made successfully!");
        
        setReservation({
         content_object: "",
          name: "",
          email: "",
          content: "",
          isComment: "",
          rating: "",
        });
      } else {
       // setIsReserving(false);
        alert("Error making Comment.");
      }
     
  
};
return (
    <div className="reservation-container new">
      <div className="reservation-box ">
        <h1>Reservation</h1>
        <form className="reservation-form" onSubmit={handleSubmit}>
          <table>
            <tbody>
            <tr>
                <th><label htmlFor="content_object">User:</label></th>
                <td>
                  <select id="content_object" name="content_object" value={reservation.content_object} onChange={handleChange} required>
                    {/* <option value="">Select a user</option> */}
                    {users.map(content_object => (
                      <option key={content_object.id} value={content_object.id}>{content_object.username}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <th><label htmlFor="name">Name:</label></th>
                <td><input type="text" id="name" name="name" value={reservation.name} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="email">Email:</label></th>
                <td><input type="text" id="email" name="email" value={reservation.email} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="content">Content:</label></th>
                <td><input type="text" id="content" name="content" value={reservation.content} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="isComment">Is Comment:</label></th>
                <td><input type="boolean" id="isComment" name="isComment" value={reservation.isComment} onChange={handleChange} required /></td>
              </tr>

      <tr>
        <th><label htmlFor="rating">Rating:</label></th>
        <td><input type="number" id="rating" name="rating" min="0"  value={reservation.rating} onChange={handleChange} required /></td>
      </tr>
      
    </tbody>
  </table>
  <tr>
        <td colSpan="2"><button className = 'create'onClick={() => handleReserve(reservation)}>Create Comment</button></td>
        {/* <td colSpan="2"><button onClick={() => handleCancel(reservation)} >Cancel Reservation</button></td> */}
      </tr>
</form>
</div>
</div>


   );

}

export default CommentsForm;