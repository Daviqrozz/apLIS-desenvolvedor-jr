import { useState } from 'react';
import { EntityTable } from '../components/EntityTable';
import { FeedbackMessage } from '../components/FeedbackMessage';
import { MedicoForm } from '../components/MedicoForm';
import { useMedicos } from '../hooks/useMedicos';

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'CRM', label: 'CRM' },
  { key: 'UFCRM', label: 'UFCRM' },
];

export function MedicosPage() {
  const [editingMedico, setEditingMedico] = useState(null);
  const { medicos, loading, error, success, createMedico, updateMedico, deleteMedico } = useMedicos();

  async function handleSubmit(formData) {
    if (editingMedico) {
      const updated = await updateMedico(editingMedico.id, formData);
      if (updated) {
        setEditingMedico(null);
      }

      return updated;
    }

    return createMedico(formData);
  }

  async function handleDelete(medico) {
    const confirmed = window.confirm(`Deseja excluir o médico ${medico.nome}?`);
    if (!confirmed) {
      return;
    }

    await deleteMedico(medico.id);
    if (editingMedico?.id === medico.id) {
      setEditingMedico(null);
    }
  }

  return (
    <section className="mx-auto w-full max-w-5xl">
      <h2 className="text-3xl font-semibold text-slate-900">Médicos</h2>
      <p className="mb-6 mt-2 text-slate-600">Cadastro e listagem de médicos.</p>

      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="mb-4 text-xl font-semibold text-slate-900">
          {editingMedico ? 'Editar médico' : 'Novo médico'}
        </h3>
        <FeedbackMessage error={error} success={success} />
        <MedicoForm
          key={editingMedico ? `edit-${editingMedico.id}` : 'new-medico'}
          onSubmit={handleSubmit}
          loading={loading}
          initialValues={editingMedico ?? undefined}
          submitLabel={editingMedico ? 'Salvar alterações' : 'Cadastrar médico'}
          onCancel={editingMedico ? () => setEditingMedico(null) : undefined}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="mb-4 text-xl font-semibold text-slate-900">Lista de médicos</h3>
        <EntityTable
          columns={COLUMNS}
          rows={medicos}
          emptyMessage={loading ? 'Carregando...' : 'Nenhum médico cadastrado.'}
          renderActions={(medico) => (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditingMedico(medico)}
                className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(medico)}
                className="rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          )}
        />
      </div>
    </section>
  );
}
