import React from 'react';

const MessageBar = ({ message, loading }) => (
    <div className={`mt-4 mb-6 p-3 rounded-lg text-sm text-center font-medium ${
        message.includes('ERROR') || message.includes('Denied') || message.includes('Failed') 
        ? 'bg-red-100 text-red-700' 
        : 'bg-blue-100 text-blue-700'
    }`}>
        {loading && <span className="animate-pulse mr-2">...</span>}
        {message || 'Ready.'}
    </div>
);

export default MessageBar;