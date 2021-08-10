import * as Yup from "yup";
import config from "../../config/config.js";
import ArticleDetails from "../models/ArticleDetails.js";

class ArticleDetailsController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { limit = 40 } = req.query;
    await ArticleDetails.paginate(
      { idArtigo: req.params.idArtigo },
      { select: "idArtigo subTitulo", page, limit, sort: "createdAt" }
    )
      .then((articledetails) => {
        return res.json({
          error: false,
          articledetails: articledetails,
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
    ArticleDetails.findOne(
      { _id: req.params.id },
      "_id idArtigo subTitulo corpoSubTitulo createdAt updatedAt originalName fileName"
    )
      .then((articledetail) => {
        if (articledetail.fileName) {
          var url = config.url + "/files/article/" + articledetail.fileName;
        }
        const {
          _id,
          idArtigo,
          subTitulo,
          corpoSubTitulo,
          createdAt,
          updatedAt,
          originalName,
          fileName,
        } = articledetail;
        return res.json({
          error: false,
          articledetail: {
            _id,
            idArtigo,
            subTitulo,
            corpoSubTitulo,
            createdAt,
            updatedAt,
            originalName,
            fileName,
            url: url,
          },
          url: url,
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
      idArtigo: Yup.string().required(),
      subTitulo: Yup.string().required(),
      corpoSubTitulo: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 103,
        message: "Error: Dados inválidos!",
      });
    }
    const { idArtigo } = req.params.idArtigo;
    const checkArticle = await ArticleDetails.findOne(
      { idArtigo: req.body.idArtigo } && { subTitulo: req.body.subTitulo }
    );
    if (checkArticle) {
      return res.status(400).json({
        error: true,
        code: 102,
        message: "Error: Esta parte do Artigo já foi cadastrada!",
      });
    }

    var dados = req.body;

    const articledetail = await ArticleDetails.create(dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 101,
          message: "Error: Subtitulo não foi cadastrado com sucesso!",
        });

      return res.status(200).json({
        error: false,
        message: "SubTitulo cadastrado com sucesso!",
        dados: articledetail,
      });
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      _id: Yup.string().required(),
      idArtigo: Yup.string().required(),
      subTitulo: Yup.string().required(),
      corpoSubTitulo: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 103,
        message: "Error: Dados inválidos!",
      });
    }

    const { _id, subTitulo } = req.body;

    const checkArticles = await ArticleDetails.findOne({ _id: _id });

    if (!checkArticles) {
      return res.status(400).json({
        error: true,
        code: 109,
        message: "Erro: SubTitulo não encontrado!",
      });
    }

    if (subTitulo != checkArticles.subTitulo) {
      const checkArticles = await ArticleDetails.findOne({ subTitulo });
      if (checkArticles) {
        return res.status(400).json({
          error: true,
          code: 110,
          message: "Erro: Este SubTitulo já está cadastrado em nossa Base!",
        });
      }
    }

    var dados = req.body;

    await ArticleDetails.updateOne({ _id: dados._id }, dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 111,
          message: "Erro: Subtitulo não foi editado com sucesso!",
        });

      return res.json({
        error: false,
        message: "Subtitulo editado com sucesso!",
      });
    });
  }

  async delete(req, res) {
    const checkArticles = await ArticleDetails.findOne({ _id: req.params.id });

    if (!checkArticles) {
      return res.status(400).json({
        error: true,
        code: 104,
        message: "Erro: Subtitulo não encontrado",
      });
    }

    const articledetail = await ArticleDetails.deleteOne(
      { _id: req.params.id },
      (err) => {
        if (err)
          return res.status(400).json({
            error: true,
            code: 105,
            message: "Error: Subtitulo não foi apagado com sucesso!",
          });
      }
    );

    return res.json({
      error: false,
      message: "Subtitulo apagado com sucesso!",
    });
  }
}

export default new ArticleDetailsController();
