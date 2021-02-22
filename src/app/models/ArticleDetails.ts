import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ArticleDetails = new mongoose.Schema(
  {
    idArtigo: {
      type: String,
      required: true,
    },
    subTitulo: {
      type: String,
      required: true,
    },
    corpoSubTitulo: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
    },
    key: {
      type: String,
    },
    size: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
ArticleDetails.plugin(mongoosePaginate);

export default mongoose.model("articledetails", ArticleDetails);
