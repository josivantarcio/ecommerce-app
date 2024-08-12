// Exemplo de modelo de usuário
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // outros campos
});

const User = mongoose.model('User', userSchema);

// Exporta o modelo
module.exports = {
  User,
  // outros modelos exportados aqui
};
