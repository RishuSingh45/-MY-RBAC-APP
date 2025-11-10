const ROLES = {
    ADMIN: 'admin',
    EDITOR: 'editor',
    VIEWER: 'viewer'
};

const PERMISSIONS_MATRIX = {
    [ROLES.ADMIN]: [
        'posts:read_all', 'posts:create', 'posts:update_all', 'posts:delete_all',
        'users:manage'
    ],
    [ROLES.EDITOR]: [
        'posts:read_own', 'posts:create', 'posts:update_own', 'posts:delete_own'
    ],
    [ROLES.VIEWER]: [
        'posts:read_all'
    ]
};

module.exports = { ROLES, PERMISSIONS_MATRIX };