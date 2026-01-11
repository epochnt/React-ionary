const JSON_SERVER_PORT = import.meta.env.VITE_JSON_SERVER_PORT || '8000';
const MOCK_JSON_API = `http://localhost:${JSON_SERVER_PORT}/cities`;

export { MOCK_JSON_API };