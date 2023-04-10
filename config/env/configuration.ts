export const configuration = () => ({
    PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
    JWT_FRONTEND_ENCRYPTION_KEY: process.env.JWT_FRONTEND_ENCRYPTION_KEY,
    ENABLE_CORS: process.env.ENABLE_CORS,
    ENABLE_DOCS: process.env.ENABLE_DOCS,
    APP_VERSION: process.env.APP_VERSION,
    NOSQL_CONNECTION_STRING: process.env.NOSQL_CONNECTION_STRING,
});
