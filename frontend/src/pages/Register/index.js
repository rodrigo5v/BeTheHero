import React, {useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeftCircle} from 'react-icons/fi'; //fi = feathericons

import logoImg from '../../assets/logo.svg';
import './style.css'

import api from '../../services/api';

export default function Register(){
    /*o valor de um state é imutável, então mudalo diretamente não é possível, sendo assim:
    const[valor, defino esse valor no state] dessa maneira alteramos o valor de forma indireta*/
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[whatsapp, setWhastapp] = useState('');
    const[city, setCity] = useState('');
    const[uf,setUf] = useState('');
    
    //useHistory serve para mudar o a página web que o cliente está
    const history = useHistory();

    //async e await é uma maneira de a página não ter que recarregar a cada evento
    async function handleRegister(e){
        //evita que a página de um refresh automatico apos o submit
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try{
            const response = await api.post('/ongs', data);
            alert(`Seu id de acesso: ${response.data.id}`);
            //direciono o cliente para pagina de logon
            history.push('/');
        }
        catch (err){
            alert('Erro no cadastro, tente novamente.');
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, para que a plataforme 
                    encontre pessoas dispostas a ajudar sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeftCircle size={18} color="#e02041"/>
                        Talvez mais tarde...
                    </Link>
                    
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" 
                    value={name} 
                    onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="E-mail"
                    value={email} 
                    onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="Whatsapp"
                    value={whatsapp}
                    onChange={e => setWhastapp(e.target.value)}/>

                    <div className="input-group">
                        <input placeholder="Cidade"
                        value={city} 
                        onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" style={{width:80}}
                        value={uf} 
                        onChange={e => setUf(e.target.value)}/>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>               
                </form>
            </div>
        </div>
    );
}