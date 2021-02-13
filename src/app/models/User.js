import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    polo: {
      type: String,
    },
    turma: {
      type: String,
    },
    curso: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    recuperarSenha: {
      type: String,
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
User.plugin(mongoosePaginate);

export default mongoose.model("user", User);
