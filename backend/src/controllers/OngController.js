//comunicação com o banco de dados e suas tabelas
const connection = require('../database/connection');
//biblioteca usada para criação de criptografia
const crypto = require('crypto');

module.exports = {
    async index(request,response){
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },
    //uma nova ong se cadastra
    async create(request, response) {
        //uma variavel para cada valor evita que ele digite algo não válido
        const { name, email, whatsapp, city, uf} = request.body;
        //criação do id para a ong
        const id = crypto.randomBytes(4).toString('HEX');
        //inserção dela no banco de dados
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        //retorno o id para que a ong consiga entrar na aplicação
        return response.json({ id });
    }
};