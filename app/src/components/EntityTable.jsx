export function EntityTable({ columns, rows, emptyMessage, renderActions }) {
  if (!rows.length) {
    return <p className="text-sm text-slate-500">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm font-semibold text-slate-700"
              >
                {column.label}
              </th>
            ))}
            {renderActions && (
              <th className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm font-semibold text-slate-700">
                Ações
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td
                  key={`${row.id}-${column.key}`}
                  className="border-b border-slate-200 px-3 py-2 text-sm text-slate-800"
                >
                  {row[column.key]}
                </td>
              ))}
              {renderActions && (
                <td className="border-b border-slate-200 px-3 py-2 text-sm text-slate-800">
                  {renderActions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
