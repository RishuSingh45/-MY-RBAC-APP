import React from 'react';
import { Lock, PlusCircle, Globe } from 'lucide-react';
import Header from '../components/Header';
import MessageBar from '../components/MessageBar';
import PostCard from '../components/PostCard';
import PermissionGate, { ROLES } from '../components/PermissionGate';

const Dashboard = ({ user, posts, loading, message, handleLogout, handleCreatePost, handleAdminCheck, fetchPosts, handleUpdatePost, handleDeletePost }) => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <Header user={user} handleLogout={handleLogout} />

      <main className="max-w-4xl mx-auto">
        <MessageBar message={message} loading={loading} />

        {/* Action Bar with Route Guards */}
        <div className="flex flex-wrap gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
          
          <PermissionGate requiredRole={ROLES.EDITOR} userRole={user.role}>
            <button onClick={handleCreatePost} disabled={loading} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition disabled:opacity-50 font-medium">
              <PlusCircle size={18} /> <span>Create Post</span>
            </button>
          </PermissionGate>
          
          <PermissionGate requiredRole={ROLES.ADMIN} userRole={user.role}>
            <button onClick={handleAdminCheck} disabled={loading} className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg shadow-sm hover:bg-pink-700 transition disabled:opacity-50 font-medium">
              <Lock size={18} /> <span>Admin Panel</span>
            </button>
          </PermissionGate>

          <PermissionGate requiredRole={ROLES.VIEWER} userRole={user.role}>
            <button onClick={() => fetchPosts(user)} disabled={loading} className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition disabled:opacity-50 font-medium">
              <Globe size={18} /> <span>Refresh Posts</span>
            </button>
          </PermissionGate>
        </div>

        {/* Content Area */}
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">Content List</h2>
            <span className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-medium rounded-full">
                {user.role === ROLES.EDITOR ? 'Showing: Published + Your Drafts' : 'Showing: All Published'}
            </span>
        </div>
        
        <div className="space-y-6">
          {posts.length === 0 && !loading && (
              <div className="p-8 bg-white rounded-xl border border-slate-200 text-slate-500 text-center">
                  No posts available for your role.
              </div>
          )}
          {posts.map(post => (
            <PostCard 
                key={post.id} 
                post={post} 
                user={user} 
                handleUpdate={handleUpdatePost} 
                handleDelete={handleDeletePost} 
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;