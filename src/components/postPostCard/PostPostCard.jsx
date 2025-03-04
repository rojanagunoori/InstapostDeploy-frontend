import { Button } from '@material-tailwind/react';
import React, { useContext, useState, useEffect } from 'react';
import myContext from '../../context/data/MyContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { fireDb } from '../../firebase/FirebaseConfig';
import SocketContext from '../../context/data/SocketContext';
import socket from '../../socket/socket';

function PostPostCard() {
  const context = useContext(myContext);
  const { mode, getAllPost, user } = context;

  const [likeCounts, setLikeCounts] = useState({});
  const [dislikeCounts, setDislikeCounts] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [userLikes, setUserLikes] = useState({});
  const [userDislikes, setUserDislikes] = useState({});
  const [commentsVisibility, setCommentsVisibility] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const postData = {};
      for (const post of getAllPost) {
        const docRef = doc(fireDb, 'postPost', post.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          postData[post.id] = data;
        }
      }
      setLikeCounts(Object.fromEntries(Object.entries(postData).map(([id, data]) => [id, data.likes || 0])));
      setDislikeCounts(Object.fromEntries(Object.entries(postData).map(([id, data]) => [id, data.dislikes || 0])));
      setComments(Object.fromEntries(Object.entries(postData).map(([id, data]) => [id, data.comments || []])));
      // Initialize userLikes and userDislikes
      setUserLikes(Object.fromEntries(Object.entries(postData).map(([id, data]) => [id, data.userLikes?.[user?.uid] || false])));
      setUserDislikes(Object.fromEntries(Object.entries(postData).map(([id, data]) => [id, data.userDislikes?.[user?.uid] || false])));
    };

    fetchData();
  }, [getAllPost, user?.uid]);

  const handleLike = async (id) => {
    // Check if the user had disliked the post
    if (userDislikes[id]) {
      // Remove dislike
      await updateDoc(doc(fireDb, 'postPost', id), {
        dislikes: Math.max((dislikeCounts[id] || 0) - 1, 0),
        [`userDislikes.${user?.uid}`]: false
      });
      setDislikeCounts(prev => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
      setUserDislikes(prev => ({ ...prev, [id]: false }));
    }
  
    // Check if the user already liked the post
    if (!userLikes[id]) {
      // Add like
      await updateDoc(doc(fireDb, 'postPost', id), {
        likes: (likeCounts[id] || 0) + 1,
        [`userLikes.${user?.uid}`]: true
      });
      setLikeCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      setUserLikes(prev => ({ ...prev, [id]: true }));
    } else {
      // Remove like if already liked
      await updateDoc(doc(fireDb, 'postPost', id), {
        likes: Math.max((likeCounts[id] || 0) - 1, 0),
        [`userLikes.${user?.uid}`]: false
      });
      setLikeCounts(prev => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
      setUserLikes(prev => ({ ...prev, [id]: false }));
    }
  };
  
  const handleDislike = async (id) => {
    // Check if the user had liked the post
    if (userLikes[id]) {
      // Remove like
      await updateDoc(doc(fireDb, 'postPost', id), {
        likes: Math.max((likeCounts[id] || 0) - 1, 0),
        [`userLikes.${user?.uid}`]: false
      });
      setLikeCounts(prev => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
      setUserLikes(prev => ({ ...prev, [id]: false }));
    }
  
    // Check if the user already disliked the post
    if (!userDislikes[id]) {
      // Add dislike
      await updateDoc(doc(fireDb, 'postPost', id), {
        dislikes: (dislikeCounts[id] || 0) + 1,
        [`userDislikes.${user?.uid}`]: true
      });
      setDislikeCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      setUserDislikes(prev => ({ ...prev, [id]: true }));
    } else {
      // Remove dislike if already disliked
      await updateDoc(doc(fireDb, 'postPost', id), {
        dislikes: Math.max((dislikeCounts[id] || 0) - 1, 0),
        [`userDislikes.${user?.uid}`]: false
      });
      setDislikeCounts(prev => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
      setUserDislikes(prev => ({ ...prev, [id]: false }));
    }
  };
  

  const handleAddComment = async (id) => {
    if (newComment.trim() === '') return;

    const docRef = doc(fireDb, 'postPost', id);
    const currentComments = comments[id] || [];
    await updateDoc(docRef, {
      comments: [...currentComments, { text: newComment, likes: 0, dislikes: 0 }]
    });
    setComments(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), { text: newComment, likes: 0, dislikes: 0 }]
    }));
    setNewComment('');

    const post = getAllPost.find(post => post.id === id);
    const postOwner = post?.userId; 
    const postDescription = post?.description;
    socket.emit('comment', { user: user?.displayName || user?.email, postOwner, description: postDescription });
  };

  const handleCommentLike = async (postId, commentIndex) => {
    const docRef = doc(fireDb, 'postPost', postId);
    const currentComments = comments[postId] || [];
    const updatedComments = [...currentComments];
    updatedComments[commentIndex] = {
      ...updatedComments[commentIndex],
      likes: (updatedComments[commentIndex].likes || 0) + 1
    };
    await updateDoc(docRef, {
      comments: updatedComments
    });
    setComments(prev => ({
      ...prev,
      [postId]: updatedComments
    }));
  };

  const handleCommentDislike = async (postId, commentIndex) => {
    const docRef = doc(fireDb, 'postPost', postId);
    const currentComments = comments[postId] || [];
    const updatedComments = [...currentComments];
    updatedComments[commentIndex] = {
      ...updatedComments[commentIndex],
      dislikes: (updatedComments[commentIndex].dislikes || 0) + 1
    };
    await updateDoc(docRef, {
      comments: updatedComments
    });
    setComments(prev => ({
      ...prev,
      [postId]: updatedComments
    }));
  };

  const handleEditComment = (commentIndex) => {
    setEditCommentIndex(commentIndex);
    setEditedComment(comments[currentpostId][commentIndex].text);
  };

  const handleSaveEditComment = async (postId, commentIndex) => {
    const docRef = doc(fireDb, 'postPost', postId);
    const currentComments = comments[postId] || [];
    const updatedComments = [...currentComments];
    updatedComments[commentIndex] = {
      ...updatedComments[commentIndex],
      text: editedComment
    };
    await updateDoc(docRef, {
      comments: updatedComments
    });
    setComments(prev => ({
      ...prev,
      [postId]: updatedComments
    }));
    setEditCommentIndex(null);
    setEditedComment('');
  };

  const handleDeleteComment = async (postId, commentIndex) => {
    const docRef = doc(fireDb, 'postPost', postId);
    const currentComments = comments[postId] || [];
    const updatedComments = currentComments.filter((_, index) => index !== commentIndex);
    await updateDoc(docRef, {
      comments: updatedComments
    });
    setComments(prev => ({
      ...prev,
      [postId]: updatedComments
    }));
  };

  const toggleCommentsVisibility = (postId) => {
    setCommentsVisibility(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-3xl">
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {getAllPost.length > 0 ? (
              <>
                {getAllPost.map((item, index) => {
                  const { thumbnail, id, date } = item;
                  return (
                    <div className="p-4 w-full" key={index}>
                      <div
                        style={{
                          background: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'white',
                          borderBottom: mode === 'dark'
                            ? '4px solid rgb(226, 232, 240)'
                            : '4px solid rgb(30, 41, 59)',
                        }}
                        className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                        ${mode === 'dark' ? 'shadow-gray-700' : 'shadow-xl'} 
                        rounded-xl overflow-hidden`}
                      >
                        <img className="w-60" src={thumbnail} alt="post" />
                        <div className="p-6">
                          <h2
                            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                            style={{
                              color: mode === 'dark'
                                ? 'rgb(226, 232, 240)'
                                : 'rgb(30, 41, 59)',
                            }}
                          >
                            {date}
                          </h2>
                          <p
                            className="leading-relaxed mb-3"
                            style={{
                              color: mode === 'dark'
                                ? 'rgb(226, 232, 240)'
                                : 'rgb(30, 41, 59)',
                            }}
                          >
                            {item?.description}
                          </p>
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <button
                                onClick={() => handleLike(id)}
                                className={`mr-2 text-sm ${userLikes[id] ? 'text-blue-500' : 'text-gray-500'}`}
                                style={{
                                  backgroundColor: userLikes[id] ? 'rgba(0, 123, 255, 0.1)' : 'transparent'
                                }}
                              >
                                👍 {likeCounts[id] || 0}
                              </button>
                              <button
                                onClick={() => handleDislike(id)}
                                className={`mr-2 text-sm ${userDislikes[id] ? 'text-red-500' : 'text-gray-500'}`}
                                style={{
                                  backgroundColor: userDislikes[id] ? 'rgba(255, 0, 0, 0.1)' : 'transparent'
                                }}
                              >
                                👎 {dislikeCounts[id] || 0}
                              </button>
                            </div>
                            <Button className="bg-gray-500 text-white ml-auto" onClick={() => toggleCommentsVisibility(id)}>
  {commentsVisibility[id] ? 'Hide Comments' : 'Show Comments'}
</Button>
                          </div>
                         

                          {commentsVisibility[id] && <div className="mt-3">
                            <textarea
                              className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 outline-none mb-2"
                              placeholder="Add a comment"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button
                              onClick={() => handleAddComment(id)}
                              className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                              Add Comment
                            </button>
                            {comments[id] && comments[id].length > 0 && (
                              <ul className="mt-2">
                                {comments[id].map((comment, idx) => (
                                  <li key={idx} className="mt-2 p-2 border rounded">
                                    {editCommentIndex === idx ? (
                                      <>
                                        <textarea
                                          className="w-full p-1.5 border rounded"
                                          value={editedComment}
                                          onChange={(e) => setEditedComment(e.target.value)}
                                        />
                                        <button
                                          onClick={() => handleSaveEditComment(id, idx)}
                                          className="bg-green-500 text-white px-2 py-1 rounded mt-2"
                                        >
                                          Save
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <p>{comment.text}</p>
                                        <div className="flex mt-2">
                                          <button
                                            onClick={() => handleCommentLike(id, idx)}
                                            className="mr-2 text-sm"
                                          >
                                            👍 {comment.likes || 0}
                                          </button>
                                          <button
                                            onClick={() => handleCommentDislike(id, idx)}
                                            className="mr-2 text-sm"
                                          >
                                            👎 {comment.dislikes || 0}
                                          </button>
                                          <button
                                            onClick={() => handleEditComment(idx)}
                                            className="mr-2 text-sm text-yellow-500"
                                          >
                                            Edit
                                          </button>
                                          <button
                                            onClick={() => handleDeleteComment(id, idx)}
                                            className="text-sm text-red-500"
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <h1 className='text-xl font-bold'>Not Found</h1>
            )}
          </div>

          <div className="flex justify-center my-5">
            <Button
              style={{
                background: mode === 'dark'
                  ? 'rgb(226, 232, 240)'
                  : 'rgb(30, 41, 59)',
                color: mode === 'dark'
                  ? 'rgb(30, 41, 59)'
                  : 'rgb(226, 232, 240)',
              }}
            >
              See More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostPostCard;
