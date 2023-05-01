import React, { useState , useEffect} from "react";
import './PropertyForm.css';

function PropertyForm() {
    const [property, setProperty] = useState({
      description: "",
      prop_type: "",
      address: "",
      rooms: 1,
      baths: "",
      parking: "",
      max_guests: "",
      rate: "",
      
    });
    const handleChange = (event) => {
        setProperty({
          ...property,
          [event.target.name]: event.target.value,
        });
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log({ ...property });
  }
  const handleProp = async() => {
    //setIsReserving(true);
  
    
      const payload = {
        description: property.description,
      prop_type: property.prop_type,
      address: property.address,
      rooms: property.rooms,
      baths: property.baths,
      parking: property.parking,
      max_guests: property.max_guests,
      rate: property.rate,
        
      };
  
      const response = await fetch(`http://localhost:8000/property/property/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
    //   console.log(data);
    //   console.log(response);
     // setIsReserving(false);

      if (response.ok) {
        alert("Property made successfully!");
        //setTotalPrice(totalPrice);
        setProperty({
            description: "",
            prop_type: "",
            address: "",
            rooms: 1,
            baths: "",
            parking: "",
            max_guests: "",
            rate: "",
        });
      } else {
       // setIsReserving(false);
        alert("Error making reservation.");
      }
     
  
};

  return (
    <div className="reservation-container">
      <div className="reservation-box">
        <h1>Property</h1>
        <form className="reservation-form" onSubmit={handleSubmit}>
          <table>
            <tbody>
            <tr>
                <th><label htmlFor="description">Description:</label></th>
                <td><input type="text" id="description" name="description" value={property.description} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="address">Address:</label></th>
                <td><input type="text" id="address" name="address" value={property.address} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="prop_type">Property Type:</label></th>
                <td><input type="text" id="prop_type" name="prop_type" value={property.prop_type} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="rooms">Rooms:</label></th>
                <td><input type="number" id="rooms" name="rooms" value={property.rooms} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="baths">Baths:</label></th>
                <td><input type="number" id="baths" name="baths" min="1" value={property.baths} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="parking">Parking:</label></th>
                <td><input type="number" id="parking" name="parking"  value={property.parking} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="max_guests">Number of Guests:</label></th>
                <td><input type="number" id="max_guests" name="max_guests" min="1" value={property.max_guests} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="rate">Rate:</label></th>
                <td><input type="number" id="rate" name="rate" value={property.rate} onChange={handleChange} required /></td>
              </tr>
              
              

      {/* <tr>
        <th><label htmlFor="num_days">Number of Days:</label></th>
        <td><input type="number" id="num_days" name="num_days" min="1"  value={reservation.num_days} onChange={handleChange} required /></td>
      </tr> */}
      <tr>
        <td colSpan="2"><button onClick={() => handleProp()}>Create Property</button></td>
        
      </tr>
    </tbody>
  </table>
</form>
</div>
</div>


   );

}

export default PropertyForm;