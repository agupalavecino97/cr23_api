export default {
    jwtSecret: process.env.JSW_SECRET || 'secretCode123',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cr23',
        USER: process.env.MONGODB_USER || '',
        PASSWORD: process.env.MONGODB_PASSWORD || ''
    }
}