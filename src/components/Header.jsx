import React from 'react';
import { LogOut, Shield, UserCircle2 } from 'lucide-react';

const Header = ({ user, handleLogout }) => {
    // Color-code the role badge for quick visual ID
    const roleColors = {
        admin: 'bg-pink-500',
        editor: 'bg-indigo-500',
        viewer: 'bg-emerald-500'
    };

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Area */}
                    <div className="flex items-center">
                        <Shield className="h-8 w-8 text-indigo-600" />
                        <span className="ml-2.5 text-xl font-bold text-slate-900">RBAC Demo</span>
                    </div>

                    {/* User Profile Area */}
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-slate-900 leading-none mb-1">{user.userId}</p>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-white uppercase tracking-wider ${roleColors[user.role] || 'bg-slate-500'}`}>
                                    {user.role}
                                </span>
                            </div>
                            <UserCircle2 className="h-9 w-9 text-slate-300" />
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;