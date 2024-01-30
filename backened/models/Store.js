const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  storeName: {
    type: String, // Daraz, Shopify, or WooCommerce
    required: true,
  },
  storeInfo: {
    type: Object,
    required: true,
  },
  User: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  connectedAt: {
    type: Date,
    default: Date.now,
  },
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
