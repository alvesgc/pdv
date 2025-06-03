export default function formatterPrice ({value}) {
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
