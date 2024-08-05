import { requireRole } from '@/lib/middleware';

export default function handler(req, res) {
  requireRole('admin')(req, res, () => {
    res.status(200).json({ message: 'This is a protected route for admins' });
  });
}
