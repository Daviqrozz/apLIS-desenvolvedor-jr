const db = require('../database/db');

const PacienteModel = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM pacientes');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM pacientes WHERE id = ?', [id]);
    return rows[0] || null;
  },

  create: async ({ nome, dataNascimento, carteirinha, cpf }) => {
    await db.query(
      'INSERT INTO pacientes (nome, dataNascimento, carteirinha, cpf) VALUES (?, ?, ?, ?)',
      [nome, dataNascimento, carteirinha, cpf]
    );
  },

  update: async (id, { nome, dataNascimento, carteirinha, cpf }) => {
    const [result] = await db.query(
      'UPDATE pacientes SET nome = ?, dataNascimento = ?, carteirinha = ?, cpf = ? WHERE id = ?',
      [nome, dataNascimento, carteirinha, cpf, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM pacientes WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = PacienteModel;