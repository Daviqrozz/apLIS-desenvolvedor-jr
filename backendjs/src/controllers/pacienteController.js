const PacienteModel = require('../models/pacienteModel');

const PacienteController = {
  index: async (req, res) => {
    try {
      const pacientes = await PacienteModel.getAll();
      res.json(pacientes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  show: async (req, res) => {
    try {
      const paciente = await PacienteModel.getById(req.params.id);
      if (!paciente) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }
      res.json(paciente);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  store: async (req, res) => {
    try {
      const { nome, cpf } = req.body;
      if (!nome || !cpf) {
        return res.status(422).json({ message: 'nome e cpf são obrigatórios' });
      }
      await PacienteModel.create(req.body);
      res.status(201).json({ message: 'Paciente criado com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  update: async (req, res) => {
    try {
      const { nome, cpf } = req.body;
      if (!nome || !cpf) {
        return res.status(422).json({ message: 'nome e cpf são obrigatórios' });
      }
      const affected = await PacienteModel.update(req.params.id, req.body);
      if (!affected) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }
      res.json({ message: 'Paciente atualizado com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  destroy: async (req, res) => {
    try {
      const affected = await PacienteModel.delete(req.params.id);
      if (!affected) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }
      res.json({ message: 'Paciente removido com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};

module.exports = PacienteController;