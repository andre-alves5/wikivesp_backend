import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Articles = new mongoose.Schema(
  {
    idAutor: {
      type: String,
      required: true,
    },
    autor: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    introducao: {
      type: String,
      required: true,
    },
    indice: {
      type: String,
    },
    bibliografia: {
      type: String,
    },
    categoria: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
Articles.plugin(mongoosePaginate);

export default mongoose.model("articles", Articles);
