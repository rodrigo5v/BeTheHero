//comunicação com o banco de dados e suas tabelas
const connection = require('../database/connection');

module.exports = {
    async index(resquest, response){
        const ong_id = resquest.headers.authorization;
        //query no banco para retornar todos incidentes de uma ong
        const incidents = await connection('incidentes')
        .where('ong_id', ong_id)
        .select('*');

        return response.json(incidents)
    }
}