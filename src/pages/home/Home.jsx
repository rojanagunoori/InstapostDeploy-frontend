import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/heroSection/HeroSection';
import PostPostCard from '../../components/postPostCard/PostPostCard';
import Footer from '../../components/footer/Footer';
import UserList from '../../components/userList/UserList';
import Chat from '../../components/Chat/Chat'; // Adjust path as needed
import { auth } from '../../firebase/FirebaseConfig'; // Adjust path as needed

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const currentUser = auth.currentUser;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setSelectedUser(null);
  };

  return (
    <Layout>
      <HeroSection />
      <div className="flex flex-col lg:flex-row lg:space-x-4 p-4">
        <main className="flex-grow lg:w-3/4">
          <PostPostCard />
        </main>
        <aside className="lg:w-1/4 mt-4 lg:mt-0">
          <UserList onUserSelect={handleUserSelect} />
        </aside>
      </div>
      {showChat && selectedUser && (
        <Chat currentUser={currentUser} selectedUser={selectedUser} onClose={handleCloseChat} />
      )}
      <Footer />
    </Layout>
  );
};

export default Home;
