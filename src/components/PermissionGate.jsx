import React from 'react';

export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer'
};

const PermissionGate = ({ requiredRole, userRole, children }) => {
  if (!userRole) return null;

  // Admin always passes
  if (userRole === ROLES.ADMIN) return children;

  // Exact match check
  if (userRole === requiredRole) {
    return children;
  }
  
  return null;
};

export default PermissionGate;