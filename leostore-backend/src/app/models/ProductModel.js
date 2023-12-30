const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: { type: String, require: true },
    image: [{ type: String, require: true }],
    subtitle: { type: String, require: true },
    dicription: { type: String, require: true },
    price: { type: Number, require: true },
    sizes: [{ type: String, require: true }],
    colors: [{ type: String, require: true }],
    catagory: [{ type: String, require: true }],
    tag: [{ type: String, require: true }],
    count: { type: Number, require: true },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);

Product.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Product", Product);
