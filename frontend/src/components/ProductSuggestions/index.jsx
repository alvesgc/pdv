export default function ProductSuggestions({ suggestions, onSelect }) {
 if (!Array.isArray(suggestions) || suggestions.length === 0) return null;

  return (
    <ul className="border border-gray-300 rounded max-h-48 overflow-auto mb-4">
      {suggestions.map((p) => (
        <li
          key={p.id}
          className="p-2 cursor-pointer hover:bg-gray-200"
          onClick={() => onSelect(p)}
        >
          {p.code} - {p.name} - R$ {p.price.toFixed(2)}
        </li>
      ))}
    </ul>
)};