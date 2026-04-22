const medicosBaseUrl =
  import.meta.env.VITE_MEDICOS_API_URL || 'http://localhost:8000/api/v1/medicos';

const pacientesBaseUrl =
  import.meta.env.VITE_PACIENTES_API_URL || 'http://localhost:3000/api/v1/pacientes';

export const API_URLS = {
  medicos: medicosBaseUrl,
  pacientes: pacientesBaseUrl,
};
