import { useState } from 'react';

const INITIAL_FORM = {
  nome: '',
  CRM: '',
  UFCRM: '',
};

export function MedicoForm({
  onSubmit,
  loading,
  initialValues = INITIAL_FORM,
  submitLabel = 'Cadastrar médico',
  onCancel,
}) {
  const [formData, setFormData] = useState({
    nome: initialValues.nome ?? '',
    CRM: initialValues.CRM ?? '',
    UFCRM: initialValues.UFCRM ?? '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const success = await onSubmit(formData);

    if (success) {
      setFormData(INITIAL_FORM);
    }
  }

  return (
    <form className="grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-sm text-slate-700" htmlFor="medico-nome">
          Nome
        </label>
        <input
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
          id="medico-nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-700" htmlFor="medico-crm">
          CRM
        </label>
        <input
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
          id="medico-crm"
          name="CRM"
          value={formData.CRM}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-700" htmlFor="medico-ufcrm">
          UFCRM
        </label>
        <input
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase outline-none ring-blue-500 focus:ring-2"
          id="medico-ufcrm"
          name="UFCRM"
          value={formData.UFCRM}
          onChange={handleChange}
          maxLength={2}
          required
        />
      </div>

      <div className="mt-1 flex gap-2 md:col-span-2">
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Salvando...' : submitLabel}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
