const formatCurrency = (value: number) => {
    if (isNaN(value)) {
        return 'Invalid number';
    }

    const formattedNumber = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

    return formattedNumber;
};

interface FormatDateProps {
    date: string;
    showHours?: boolean;
}

const formatDate = ({ date, showHours }: FormatDateProps) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: showHours ? 'numeric' : undefined,
        minute: showHours ? 'numeric' : undefined,
    };

    return new Date(date).toLocaleString('pt-BR', options);
};

const formatDateForQuery = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export { formatCurrency, formatDate, formatDateForQuery };