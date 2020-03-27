//comunicação com o banco de dados e suas tabelas
const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        const { page = 1} = request.query;

        //o metodo count retorna um array, entao fazendo a var [count] mostra o valor do vetor
        const [count] = await connection('incidentes').count();

        const incidentes = await connection('incidentes')
        .join('ongs','ongs.id', '=', 'incidentes.ong_id')
        .limit(5)   //limito a quantidade de casos 
        .offset((page - 1) * 5) //faço uma quebra de página quando atingir o limite
        .select(['incidentes.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf']);
        //mostro os casos totais 
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidentes);
    },

    async create(request, response){
        const { title, description, value} = request.body;
        /**
         * headers guarda informações do contexto da requisição,
         * como por exemplo qual usuário está logado, de onde ele é
         * etc.
         */
        const ong_id = request.headers.authorization;
        //insiro o novo caso no banco
        const [id] = await connection('incidentes').insert({
            title,
            description,
            value,
            ong_id,
        });
        
        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params; 
        const ong_id = request.headers.authorization;
        //procuro o id do caso no banco
        const incident = await connection('incidentes')
        .where('id', id)
        .select('ong_id')
        .first();
        
        if(incident.ong_id != ong_id){
            return response.status(401).json({error: "Operation not permited"});
        }

        await connection('incidentes').where('id', id).delete();

        return response.status(204).send();
    }
};