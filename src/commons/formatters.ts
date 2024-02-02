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

export { formatCurrency };