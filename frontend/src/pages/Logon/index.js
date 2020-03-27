import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';//fi - feather icons

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){
    /*o valor de um state é imutável, então mudalo diretamente não é possível, sendo assim:
    const[valor, defino esse valor no state] dessa maneira alteramos o valor de forma indireta*/
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions', {id});
            //guardo as informações da ong para o caso de a ong criar ou excluir casos
            localStorage.setItem('ong_id',id);
            localStorage.setItem('nome_ong', response.data.name);
            //direciono o cliente para o seu perfil
            history.push('/profile');
        }
        catch(err){
            alert('Falha no login tente novamente.');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={18} color="#e02041"/>
                        Registrar-se
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}