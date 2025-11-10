import React from 'react';
import { User, Edit, Trash2 } from 'lucide-react';
import PermissionGate, { ROLES } from './PermissionGate';

const PostCard = ({ post, user, handleUpdate, handleDelete }) => {
    const isOwner = post.authorId === user.userId;
    // Admin can edit ALL. Editor can edit OWN.
    const canEdit = user.role === ROLES.ADMIN || (user.role === ROLES.EDITOR && isOwner);
    const isDraft = post.status === 'draft';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-slate-100 p-2 rounded-full">
                            <User size={20} className="text-slate-500" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-700">{post.authorName || 'Unknown Author'}</p>
                            <p className="text-xs text-slate-400">ID: {post.authorId}</p>
                        </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border ${
                        isDraft 
                            ? 'bg-amber-50 text-amber-700 border-amber-100' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                        {post.status}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{post.title}</h3>
                <p className="text-slate-600 leading-relaxed">{post.content}</p>
            </div>
            
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  onClick={() => handleUpdate(post.id, user)}
                  disabled={!canEdit}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    canEdit ? 'text-indigo-600 hover:bg-indigo-50' : 'text-slate-400 cursor-not-allowed opacity-50'
                  }`}
                  title={!canEdit ? 'Permission Denied' : 'Edit Post'}
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>

                <PermissionGate requiredRole={ROLES.ADMIN} userRole={user.role}>
                    <button 
                        onClick={() => handleDelete(post.id)}
                        className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete Post (Admin Only)"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                </PermissionGate>
            </div>
        </div>
    );
};

export default PostCard;