const generateRandomId = () => {
    const randomPart = Math.floor(Math.random() * 1000000).toString(16);
    const timestampPart = Date.now().toString(16);
    const randomId = randomPart + timestampPart;

    return randomId;
};

export { generateRandomId };