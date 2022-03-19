const { Router } = require('express');
const router = Router();

const { userAuth } = require('../../middlewares/auth.middlewares');

const ArticleControllers = require('../../controllers/article/article.controllers');

router.get('/:article_id', [userAuth], ArticleControllers.fetchArticle);

router.patch('/:article_id', [userAuth], ArticleControllers.updateArticle);

router.delete('/:article_id', [userAuth], ArticleControllers.deleteArticle);

router.post('/', [userAuth], ArticleControllers.createArticle);

module.exports = router;
