import React, { useState, useEffect } from 'react';
import { fireDb } from "../../firebase/FirebaseConfig";
import { collection, getDocs } from 'firebase/firestore';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDb, 'users'));
        const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.length > 0 ? (
        users.map(user => (
          <div key={user.id}>{user.name}</div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserList;
