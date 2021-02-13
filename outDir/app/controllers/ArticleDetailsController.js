"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _ArticleDetails = require('../models/ArticleDetails'); var _ArticleDetails2 = _interopRequireDefault(_ArticleDetails);

class ArticleDetailsController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { limit = 40 } = req.query;
    await _ArticleDetails2.default.paginate(
      { idArtigo: req.params.idArtigo },
      { select: "idArtigo subTitulo corpoSubTitulo url", page, limit, sort: "createdAt" }
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
    _ArticleDetails2.default.findOne(
      { _id: req.params.id },
      "_id idArtigo subTitulo corpoSubTitulo createdAt updatedAt originalName key url"
    )
      .then((articledetail) => {
        const {
          _id,
          idArtigo,
          subTitulo,
          corpoSubTitulo,
          createdAt,
          updatedAt,
          originalName,
          key,
          url,
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
            key,
            url,
          },
          url,
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
    const checkArticle = await _ArticleDetails2.default.findOne(
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

    const articledetail = await _ArticleDetails2.default.create(dados, (err) => {
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

    const checkArticles = await _ArticleDetails2.default.findOne({ _id: _id });

    if (!checkArticles) {
      return res.status(400).json({
        error: true,
        code: 109,
        message: "Erro: SubTitulo não encontrado!",
      });
    }

    if (subTitulo != checkArticles.subTitulo) {
      const checkArticles = await _ArticleDetails2.default.findOne({ subTitulo });
      if (checkArticles) {
        return res.status(400).json({
          error: true,
          code: 110,
          message: "Erro: Este SubTitulo já está cadastrado em nossa Base!",
        });
      }
    }

    var dados = req.body;

    await _ArticleDetails2.default.updateOne({ _id: dados._id }, dados, (err) => {
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
    const checkArticles = await _ArticleDetails2.default.findOne({ _id: req.params.id });

    if (!checkArticles) {
      return res.status(400).json({
        error: true,
        code: 104,
        message: "Erro: Subtitulo não encontrado",
      });
    }

    const articledetail = await _ArticleDetails2.default.deleteOne(
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

exports. default = new ArticleDetailsController();
