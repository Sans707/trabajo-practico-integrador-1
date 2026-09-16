import { Article } from '../models/Article.js';

export const ownerMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Si es administrador, tiene acceso directo
    if (userRole === 'admin') {
      return next();
    }

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado.' });
    }

    if (article.user_id !== userId) {
      return res.status(403).json({ message: 'Acceso denegado. No eres el autor de este artículo.' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error al verificar la propiedad del recurso.', error: error.message });
  }
};