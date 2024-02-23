export const formatCurrency = (value: number) => {
  if (isNaN(value)) return 'Invalid number';

  return value.toLocaleString('pt-BR', {
    currency: 'BRL',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
  });
};

type FormatDateProps = {
  date: string;
  showHours?: boolean;
};

export const formatDate = ({ date, showHours }: FormatDateProps) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    hour: showHours ? 'numeric' : undefined,
    minute: showHours ? 'numeric' : undefined,
    month: '2-digit',
    year: 'numeric',
  };

  return new Date(date).toLocaleString('pt-BR', options);
};

export const formatDateForQuery = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};