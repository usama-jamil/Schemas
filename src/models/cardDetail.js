const mongoose = require("mongoose");
const validator = require("validator");

const cardDetailSchema = new mongoose.Schema({
  CreditCardNumber: {
    type: String,
    validate(value) {
      if (!validator.isCreditCard(value)) {
        throw new Error("Credit Card Number is invalid");
      }
    }
  },
  NameOnCard: {
    type: String,
    validate(value) {
      if (!validator.isAlpha(value)) {
        throw new Error("Name On Card is invalid");
      }
    }
  },
  ExpireDate: Date,
  CVC: {
    type: Number,
    validate(value) {
      if (!validator.isNumeric(value)) {
        throw new Error("CVC is invalid");
      }
    }
  },
  BankName: {
    type: String,
    validate(value) {
      if (!validator.isAlpha(value)) {
        throw new Error("Name On Card is invalid");
      }
    }
  },
  BankNumber: {
    type: String,
    validate(value) {
      if (!validator.isNumeric(value)) {
        throw new Error("CVC is invalid");
      }
    }
  },
  Balance: { type: Number },
  Available: { type: Number },
  LastPayment: { type: Number },
  LastPayDate: Date,
  DuePayment: { type: Number },
  DuePayDate: Date,
  InterestRate: { type: Number }
});


cardDetailSchema.methods.getPublicCardDetail = function (){
    const cardDetailObject = this.toObject()

    delete cardDetailObject

    return cardDetailObject
}
const CardDetail = mongoose.model("CardDetail", cardDetailSchema);

module.exports = CardDetail;
