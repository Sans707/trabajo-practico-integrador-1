import { ArticleTag, Article, Tag } from '.index.js';

export const addTagToArticle = async (req, res) => {
  try {
    const { article_id, tag_id } = req.body;
    
    const article = await Article.findByPk(article_id);
    if (!article) return res.status(404).json({ message: 'Artículo no encontrado' });

    const tag = await Tag.findByPk(tag_id);
    if (!tag) return res.status(404).json({ message: 'Etiqueta no encontrada' });

    if (req.user.role !== 'admin' && article.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Acceso denegado. No eres el autor de este artículo' });
    }

    const articleTag = await ArticleTag.create({ article_id, tag_id });
    return res.status(201).json({ message: 'Etiqueta vinculada al artículo exitosamente', articleTag });
  } catch (error) {
    return res.status(500).json({ message: 'Error al vincular etiqueta', error: error.message });
  }
};

export const removeTagFromArticle = async (req, res) => {
  try {
    const { articleTagId } = req.params;
    const articleTag = await ArticleTag.findByPk(articleTagId);
    if (!articleTag) return res.status(404).json({ message: 'Asociación no encontrada' });

    const article = await Article.findByPk(articleTag.article_id);
    if (req.user.role !== 'admin' && article.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    await articleTag.destroy();
    return res.status(200).json({ message: 'Etiqueta desvinculada del artículo correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al remover etiqueta', error: error.message });
  }
};