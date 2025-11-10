import React, { useState, useEffect, useCallback } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const API_BASE_URL = 'http://localhost:3001/api';

const App = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // --- Auth & State Management ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    if (token && role && userId) {
      const currentUser = { token, role, userId };
      setUser(currentUser);
      fetchPosts(currentUser);
    }
  }, []);

  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);
        const currentUser = { token: data.token, role: data.role, userId: data.userId };
        setUser(currentUser);
        setMessage(`Welcome, ${data.role}!`);
        fetchPosts(currentUser);
      } else {
        setMessage(`Login Failed: ${data.message}`);
      }
    } catch (error) {
      setMessage('Login error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setPosts([]);
    setMessage('Logged out.');
  };

  // --- Data Actions ---
  const fetchPosts = useCallback(async (currentUser) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/posts`, {
        headers: { 'Authorization': `Bearer ${currentUser.token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
        setMessage(`Loaded ${data.posts.length} posts.`);
      } else {
        setMessage(`Access Denied: ${data.message}`);
        setPosts([]);
      }
    } catch (error) {
      setMessage('Error fetching posts.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreatePost = async () => {
    // --- NEW: Prompt for user input ---
    const title = prompt("Enter post title:");
    if (!title) return;
    const content = prompt("Enter post content:");
    if (!content) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
        body: JSON.stringify({ title, content })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Post created!');
        fetchPosts(user);
      } else {
        setMessage(`Create Failed: ${data.message}`);
      }
    } catch (error) {
      setMessage('Network error.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminCheck = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (res.ok) setMessage(`ADMIN SUCCESS: ${data.totalUsers} users found.`);
      else setMessage(`ADMIN DENIED (403): ${data.message}`);
    } catch(error) { setMessage('Admin check error.'); }
    finally { setLoading(false); }
  }

  const handleUpdatePost = async (postId, currentUser) => {
    // --- NEW: Prompt for update input ---
    const newTitle = prompt("Enter new title (leave blank to keep current):");
    
    // Only send title if user entered something
    const body = {};
    if (newTitle) body.title = newTitle;
    
    if (Object.keys(body).length === 0 && !window.confirm("Keep current title?")) return;

    const res = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}` },
        body: JSON.stringify(body)
    });

    if (res.ok) alert(`SUCCESS: Post ${postId} updated!`);
    else if (res.status === 403) alert(`FORBIDDEN (403): You don't own this post.`);
    else alert('Update failed.');
    fetchPosts(currentUser);
  }

  // --- NEW: Delete Post Handler ---
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (res.ok) {
        setMessage(`SUCCESS: Post ${postId} deleted.`);
        fetchPosts(user);
      } else if (res.status === 403) {
        alert("FORBIDDEN: You do not have permission to delete this post.");
      } else {
        const data = await res.json();
        alert(`Failed to delete: ${data.message}`);
      }
    } catch (error) {
      setMessage('Network error during delete.');
    } finally {
      setLoading(false);
    }
  };

  // --- Main Render ---
  if (!user) {
    return <Login loginForm={loginForm} handleChange={handleLoginChange} handleLogin={handleLogin} loading={loading} message={message} />;
  }

  return <Dashboard 
    user={user} 
    posts={posts} 
    loading={loading} 
    message={message} 
    handleLogout={handleLogout} 
    handleCreatePost={handleCreatePost} 
    handleAdminCheck={handleAdminCheck} 
    fetchPosts={fetchPosts} 
    handleUpdatePost={handleUpdatePost}
    handleDeletePost={handleDeletePost} 
  />;
};

export default App;