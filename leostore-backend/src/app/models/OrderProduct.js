const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const OrderProduct = new Schema(
  {
    orderItems: [
      {
        name: { type: String, require: true },
        amount: { type: Number, require: true },
        image: { type: String, require: true },
        price: { type: Number, require },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, require: true },
      address: { type: String, require: true },
      city: { type: String, require: true },
      country: { type: String, require: true },
      phone: { type: String, require: true },
    },
    paymentMethod: { type: String, require: true },
    itemsPrice: { type: Number, require: true },
    shippingPrice: { type: Number, require: true },
    taxPrice: { type: Number, require: true },
    totalPrice: { type: Number, require: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);

module.exports = mongoose.model("OrderProduct", OrderProduct);
