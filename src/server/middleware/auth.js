// JWT authentication middleware
// For MVP, this is a placeholder - integrate with company SSO later

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: { message: 'Missing or invalid authorization header' } });
  }

  const token = authHeader.substring(7);

  // TODO: Verify JWT token with company SSO provider
  // For now, decode a simple mock token for development
  try {
    // Mock user extraction - replace with actual JWT verification
    const mockUser = {
      id: 'user-123',
      name: 'Test User',
      email: 'test@example.com',
      roles: ['ProjectMember'],
      team: 'Engineering',
    };

    req.user = mockUser;
    next();
  } catch (error) {
    return res.status(401).json({ error: { message: 'Invalid token' } });
  }
}
