import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotificationList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      window.location.href = '';
      return;
    }
    const config = {
      headers: { "Authorization": 'Bearer '  +localStorage.getItem('token') },
      mode: "cors"
    };
    
    axios.get(`http://localhost:8000/notif/list?page=${currentPage}&page_size=${pageSize}`, config)
      .then((response) => {
        setNotifications(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, pageSize]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDeleteNotification = (notificationId) => {
    const accessToken = localStorage.getItem('token');
    const config = {
      headers: { "Authorization": 'Bearer '  + accessToken },
      mode: "cors"
    };

    axios.delete(`http://localhost:8000/notif/delete/${notificationId}`, config)

    .then(() => {
        // Remove the deleted notification from the notifications state
        const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
        setNotifications(updatedNotifications);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="notification-container">
      <h1 className="notification-title">
      <FontAwesomeIcon icon={faBell}  /> Notifications 
      </h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <div className="notification-box">
            {notification.message}
            <button className='clear-button' onClick={() => handleDeleteNotification(notification.id)}> Clear</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default NotificationList;
