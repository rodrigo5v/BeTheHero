import React, {useEffect,useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';//fi - feather icons

import logoImg from '../../assets/logo.svg';
import './style.css';

import api from '../../services/api';

export default function Pofile(){
    const history = useHistory();
    /*o valor de um state é imutável, então mudalo diretamente não é possível, sendo assim:
    const[valor, defino esse valor no state] dessa maneira alteramos o valor de forma indireta*/
    const [incidents, setIncidents] = useState([]);
    //resgato informações da ong para caso ela crie ou exclua casos
    const ongName = localStorage.getItem('nome_ong');
    const ongId = localStorage.getItem('ong_id');

    //atualizo automaticamente a lista com os casos
    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    },[ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
            headers:{
                Authorization: ongId,
            }
        });
        setIncidents(incidents.filter(incident => incident.id != id));
        }catch(err){
            alert('Erro ao deletar, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        //direciono o cliente para a pagina de logon
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                 <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="e02041"/>
                </button>
            
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key ={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                )) }
            </ul>
        </div>
    ); 
}