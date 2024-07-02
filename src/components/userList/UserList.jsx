import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireDb } from '../../firebase/FirebaseConfig'; // Adjust path as needed

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(fireDb, 'users');
        const querySnapshot = await getDocs(usersCollection);
        
        if (!querySnapshot.empty) {
          const usersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(usersData);
        } else {
          console.log("No users found in the 'users' collection.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">Registered Users</h2>
      {users.length > 0 ? (
        users.map(user => (
          <div
            key={user.id}
            onClick={() => onUserSelect(user)}
            className="cursor-pointer mb-4 p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200"
          >
            <p className="text-gray-800 font-semibold">Name: {user.name || 'No name provided'}</p>
            <p className="text-gray-600">Email: {user.email || 'No email provided'}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No users found</p>
      )}
    </div>
  );
};

export default UserList;