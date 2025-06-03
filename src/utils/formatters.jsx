export default function FormatterPrice ({value}) {
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  return (
    <span>
      {formatted.format(value)}
    </span>
  );
}
