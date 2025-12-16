// RBAC authorization middleware
// Roles: Admin, ProjectMember, Viewer

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: { message: 'Authentication required' } });
    }

    const userRoles = Array.isArray(req.user.roles) ? req.user.roles : [req.user.roles];
    const hasRole = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      return res.status(403).json({
        error: {
          message: 'Insufficient permissions',
          required: allowedRoles,
          current: userRoles,
        },
      });
    }

    next();
  };
}

export function requireProjectMember(req, res, next) {
  return requireRole('Admin', 'ProjectMember')(req, res, next);
}

export function requireAdmin(req, res, next) {
  return requireRole('Admin')(req, res, next);
}
