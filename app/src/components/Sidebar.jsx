import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/medicos', label: 'Médicos' },
  { path: '/pacientes', label: 'Pacientes' },
];

export function Sidebar() {
  return (
    <aside className="bg-slate-900 px-4 py-6 text-slate-50 md:px-5 md:py-8">
      <h1 className="mb-5 text-xl font-semibold">Prontuário App</h1>

      <nav className="flex gap-2 md:flex-col" aria-label="Menu principal">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                'rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
