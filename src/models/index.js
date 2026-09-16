import { sequelize } from '../config/database.js';
import { User } from '.User.js';
import { Profile } from '.profile.js';
import { Article } from '.Article.js';
import { Tag } from '.Tag.js';
import { ArticleTag } from '.ArticleTag.js';

// Relación 1:1 
User.hasOne(Profile, {
  foreignKey: 'user_id',
  as: 'profile',
  onDelete: 'CASCADE'
});
Profile.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Relación 1:N 
User.hasMany(Article, {
  foreignKey: 'user_id',
  as: 'articles'
});
Article.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'author'
});

// Relación N:M 
Article.belongsToMany(Tag, {
  through: ArticleTag,
  foreignKey: 'article_id',
  otherKey: 'tag_id',
  as: 'tags',
  onDelete: 'CASCADE'
});

Tag.belongsToMany(Article, {
  through: ArticleTag,
  foreignKey: 'tag_id',
  otherKey: 'article_id',
  as: 'articles',
  onDelete: 'CASCADE'
});

export { sequelize, User, Profile, Article, Tag, ArticleTag };