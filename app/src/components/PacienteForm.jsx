import { useState } from 'react';

const INITIAL_FORM = {
  nome: '',
  dataNascimento: '',
  carteirinha: '',
  cpf: '',
};

export function PacienteForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState(INITIAL_FORM);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit(formData);
    setFormData(INITIAL_FORM);
  }

  return (
    <form className="grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-sm text-slate-700" htmlFor="paciente-nome">
          Nome
        </label>
        <input
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
          id="paciente-nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-700" htmlFor="paciente-dataNascimento">
          Data de nascimento
        </label>
        <input
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
          id="paciente-dataNascimento"
          name="dataNascimento"
          type="date"
          value={formData.dataNascimento}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-700" htmlFor="paciente-carteirinha">
          Carteirinha
        </label>
        <input
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
          id="paciente-carteirinha"
          name="carteirinha"
          value={formData.carteirinha}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-700" htmlFor="paciente-cpf">
          CPF
        </label>
        <input
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
          id="paciente-cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          maxLength={11}
          required
        />
      </div>
<div className="mt-1 flex gap-2 md:col-span-2">
      <button
        className="mt-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Salvando...' : 'Cadastrar paciente'}
      </button>
      </div>
    </form>
  );
}
