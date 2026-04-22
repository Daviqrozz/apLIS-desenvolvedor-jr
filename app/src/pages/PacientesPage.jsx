import { useState } from 'react';
import { EntityTable } from '../components/EntityTable';
import { FeedbackMessage } from '../components/FeedbackMessage';
import { PacienteForm } from '../components/PacienteForm';
import { usePacientes } from '../hooks/usePacientes';

const COLUMNS = [
  { key: 'id',             label: 'ID' },
  { key: 'nome',           label: 'Nome' },
  { key: 'dataNascimento', label: 'Data de nascimento' },
  { key: 'carteirinha',    label: 'Carteirinha' },
  { key: 'cpf',            label: 'CPF' },
];

export function PacientesPage() {
  const [editingPaciente, setEditingPaciente] = useState(null);
  const { pacientes, loading, error, success, createPaciente, updatePaciente, deletePaciente } = usePacientes();

  async function handleSubmit(formData) {
    if (editingPaciente) {
      const updated = await updatePaciente(editingPaciente.id, formData);
      if (updated) {
        setEditingPaciente(null);
      }
      return updated;
    }

    return createPaciente(formData);
  }

  async function handleDelete(paciente) {
    const confirmed = window.confirm(`Deseja excluir o paciente ${paciente.nome}?`);
    if (!confirmed) return;

    await deletePaciente(paciente.id);
    if (editingPaciente?.id === paciente.id) {
      setEditingPaciente(null);
    }
  }

  return (
    <section className="mx-auto w-full max-w-5xl">
      <h2 className="text-3xl font-semibold text-slate-900">Pacientes</h2>
      <p className="mb-6 mt-2 text-slate-600">Cadastro e listagem de pacientes.</p>

      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="mb-4 text-xl font-semibold text-slate-900">
          {editingPaciente ? 'Editar paciente' : 'Novo paciente'}
        </h3>
        <FeedbackMessage error={error} success={success} />
        <PacienteForm
          key={editingPaciente ? `edit-${editingPaciente.id}` : 'new-paciente'}
          onSubmit={handleSubmit}
          loading={loading}
          initialValues={editingPaciente ?? undefined}
          submitLabel={editingPaciente ? 'Salvar alterações' : 'Cadastrar paciente'}
          onCancel={editingPaciente ? () => setEditingPaciente(null) : undefined}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="mb-4 text-xl font-semibold text-slate-900">Lista de pacientes</h3>
        <EntityTable
          columns={COLUMNS}
          rows={pacientes}
          emptyMessage={loading ? 'Carregando...' : 'Nenhum paciente cadastrado.'}
          renderActions={(paciente) => (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditingPaciente(paciente)}
                className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(paciente)}
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