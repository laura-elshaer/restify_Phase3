// import React from 'react';

// const PropertyCard = ({ property }) => {
//   return (
//     <div className="property-card">
//       {/* <img src={property.image} alt="property" /> */}
//       <img src={property.cover_image} alt="property" />
//       <h2>{property.address}</h2>
//       <h3>{property.description}</h3>
//       <p>Rooms: {property.rooms}</p>
//       <p>Bathrooms: {property.baths}</p>
//       <p>Parking: {property.parking}</p>
//       <p>Maximum Number of Guests: {property.max_guests}</p>
//       {/* Add more details here as required */}
//     </div>
//   );
// };

// export default PropertyCard;

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      {/* <img src={property.image} alt="property" /> */}
      {/* <img src={property.cover_image} alt="property" />
      <h2>{property.address}</h2>
      <h3>{property.description}</h3>
      <p>Rooms: {property.rooms}</p>
      <p>Bathrooms: {property.baths}</p>
      <p>Parking: {property.parking}</p>
      <p>Maximum Number of Guests: {property.max_guests}</p> */}
      {/* Add more details here as required */}

      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        image = {property.cover_image}
      />
      <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {property.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {property.description}
          </Typography>
          <p>Rooms: {property.rooms}</p>
          <p>Bathrooms: {property.baths}</p>
          <p>Parking: {property.parking}</p>
        </CardContent>
        <CardActions>
          <Button size="small">Reserve</Button>
          <Button size="small">Share</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default PropertyCard;

