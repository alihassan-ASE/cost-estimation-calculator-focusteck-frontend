// pages/index.js

'use client'

import React, { useEffect, useState } from "react";
import { getUserData } from "../../lib/api/getData";

const Home = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User Data</h1>
      <ul>
        {userData.map((user) => 
          <li key={user._id}>
            Name: {user.name}, Email: {user.email}, Phone: {user.phone}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Home;
