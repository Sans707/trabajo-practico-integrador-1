import { Article, Tag, User } from '../models/index.js';

export const createArticle = async (req, res) => {
  try {
    const { title, content, excerpt, status } = req.body;
    const article = await Article.create({
      title,
      content,
      excerpt,
      status,
      user_id: req.user.id
    });
    return res.status(201).json({ message: 'Artículo creado exitosamente', article });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el artículo', error: error.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { status: 'published' },
      include: [
        { model: User, as: 'author', attributes: ['id', 'username'] },
        { model: Tag, as: 'tags', through: { attributes: [] } }
      ]
    });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los artículos', error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) return res.status(404).json({ message: 'Artículo no encontrado' });

    await article.destroy();
    return res.status(200).json({ message: 'Artículo eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el artículo', error: error.message });
  }
};