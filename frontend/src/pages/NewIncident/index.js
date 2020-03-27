import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi'; //fi - feather icons

import logoImg from '../../assets/logo.svg'
import './style.css';
import api from '../../services/api';

const ongId = localStorage.getItem('ong_id');

export default function NewIncident(){
    const history = useHistory();
    /*o valor de um state é imutável, então mudalo diretamente não é possível, sendo assim:
    const[valor, defino esse valor no state] dessa maneira alteramos o valor de forma indireta*/
    const[title,setTitle] = useState('');
    const[description,setDescription] = useState('');
    const[value,setValue] = useState('');

    async function handleRegisterNewIncident(e){
        //evita que a página de um refresh automatico apos o submit
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };
        try{
            await api.post('/incidents', data,{
                headers:{
                    Authorization : ongId,
                }
            });
            alert('Seu caso foi cadastrado.')
            //direciono o cliente para seu perfil
            history.push('/profile');
        }
        catch(err){
            alert('Não foi possível cadastrar esse caso, tente novamente.');
        }
    }
    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para um herói resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeftCircle size={18} color="#e02041"/>
                        Home
                    </Link>
                    
                </section>
                <form onSubmit={handleRegisterNewIncident}>
                    <input placeholder="Título do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}/>
                    <textarea placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}/>
                    <input placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}/>
                    <button className="button" type="submit">Cadastrar</button>               
                </form>
            </div>
        </div>
    );
}