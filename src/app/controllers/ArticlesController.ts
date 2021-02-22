import * as Yup from "yup";
import Articles from "../models/Articles";

class ArticlesController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { limit = 40 } = req.query;
    await Articles.paginate(
      {},
      { select: "titulo categoria autor", page, limit, sort: "-createdAt" }
    )
      .then((articles) => {
        return res.json({
          error: false,
          articles: articles,
        });
      })
      .catch((erro) => {
        return res.status(400).json({
          error: true,
          code: 106,
          message: "Erro: Não foi possível executar a solicitação!",
        });
      });
  }

  async list(req, res) {
    const { page = 1 } = req.query;
    const { limit = 40 } = req.query;
    await Articles.paginate(
      { idAutor: req.params.idAutor },
      { select: "idAutor titulo categoria", page, limit, sort: "-createdAt" }
    )
      .then((articles) => {
        return res.json({
          error: false,
          articles: articles,
        });
      })
      .catch((erro) => {
        return res.status(400).json({
          error: true,
          code: 106,
          message: "Erro: Não foi possível executar a solicitação!",
        });
      });
  }

  async show(req, res) {
    Articles.findOne(
      { _id: req.params.id },
      "idAutor autor titulo introducao indice bibliografia categoria createdAt updatedAt"
    )
      .then((article) => {
        return res.json({
          error: false,
          article: article,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: true,
          code: 107,
          message: "Erro: Não foi possível executar a solicitação!",
        });
      });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      idAutor: Yup.string().required(),
      autor: Yup.string().required(),
      titulo: Yup.string().required(),
      introducao: Yup.string().required(),
      indice: Yup.string(),
      bibliografia: Yup.string(),
      categoria: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 103,
        message: "Error: Dados inválidos!",
      });
    }

    const checkArticle = await Articles.findOne(
      { titulo: req.body.titulo } && { autor: req.body.autor } && {
          categoria: req.body.categoria,
        }
    );
    if (checkArticle) {
      return res.status(400).json({
        error: true,
        code: 102,
        message: "Error: Artigo já existe em nossa lista!",
      });
    }

    var dados = req.body;

    const article = await Articles.create(dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 101,
          message: "Error: Artigo não foi cadastrado com sucesso!",
        });

      return res.status(200).json({
        error: false,
        message: "Artigo cadastrado com sucesso!",
        dados: article,
      });
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      idAutor: Yup.string().required(),
      autor: Yup.string().required(),
      titulo: Yup.string().required(),
      introducao: Yup.string().required(),
      indice: Yup.string(),
      bibliografia: Yup.string(),
      categoria: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 103,
        message: "Error: Dados inválidos!",
      });
    }

    const { _id, titulo, categoria } = req.body;

    const checkArticles = await Articles.findOne({ _id: _id });

    if (!checkArticles) {
      return res.status(400).json({
        error: true,
        code: 109,
        message: "Erro: Artigo não encontrado!",
      });
    }

    if (
      titulo != checkArticles.titulo &&
      categoria != checkArticles.categoria
    ) {
      const checkArticles = await Articles.findOne({ titulo } && { categoria });
      if (checkArticles) {
        return res.status(400).json({
          error: true,
          code: 110,
          message: "Erro: Este Artigo já está cadastrado em nossa Base!",
        });
      }
    }

    var dados = req.body;

    await Articles.updateOne({ _id: dados._id }, dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 111,
          message: "Erro: Artigo não foi editado com sucesso!",
        });

      return res.json({
        error: false,
        message: "Artigo editado com sucesso!",
      });
    });
  }

  async delete(req, res) {
    const checkArticles = await Articles.findOne({ _id: req.params.id });

    if (!checkArticles) {
      return res.status(400).json({
        error: true,
        code: 104,
        message: "Erro: Artigo não encontrado",
      });
    }

    const article = await Articles.deleteOne({ _id: req.params.id }, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 105,
          message: "Error: Artigo não foi apagado com sucesso!",
        });
    });

    return res.json({
      error: false,
      message: "Artigo apagado com sucesso!",
    });
  }
}

export default new ArticlesController();
