export function FeedbackMessage({ error, success }) {
  if (error) {
    return (
      <p className="mb-3 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-800">
        {error}
      </p>
    );
  }

  if (success) {
    return (
      <p className="mb-3 rounded-lg bg-green-100 px-3 py-2 text-sm text-green-800">
        {success}
      </p>
    );
  }

  return null;
}
