//comunicação com o banco de dados e suas tabelas
const connection = require('../database/connection');

module.exports = {
    async index(resquest, response){
        const ong_id = resquest.headers.authorization;

        const incidents = await connection('incidentes')
        .where('ong_id', ong_id)
        .select('*');

        return response.json({incidents})
    }
}