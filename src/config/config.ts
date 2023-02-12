export default {
    jwtSecret: process.env.JSW_SECRET || 'secretCode123',
    DB: {
        // URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cr23',
        URI: process.env.MONGODB_URI || 'mongodb+srv://aguapalavecino97:Palavecino+2015@cluster0.6rgje9z.mongodb.net/test',
        USER: process.env.MONGODB_USER || '',
        PASSWORD: process.env.MONGODB_PASSWORD || ''
    }
}