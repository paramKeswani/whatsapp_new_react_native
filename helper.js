export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp.toMillis());
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`; // Corrected method names
};

export const generateKey = () => {
    return Math.random().toString(36).substr(2, 10);
};

export const sortMessagesByTimestamp = (messages) => {
    return messages.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
};
