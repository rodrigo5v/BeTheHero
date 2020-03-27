import React, {useEffect, useState} from  'react';
import { Feather } from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';

import api from '../../services/api';

export default function Incidents() {
    //state para armazenar o valor de casos disponiveis na plataforma
    const [total, setTotal] = useState(0);
    const [incidents, setIcidents] = useState([]);
    //rolagem infinita dos casos
    const [page, setPage] = useState(1);
    //carregar os casos para a rolagem
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    function navigationToDetail(incident){
        navigation.navigate('Detaill', { incident });
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total>0 && incidents.length == total){
            return;
        }
        setLoading(true);

        const response = await api.get('incidents',{
            params:{ page }
        });
        //... faz a junção de dois vetores, para que assim a pagina seguintes sejam anexadas
        setIcidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>
            <FlatList
                data={incidents}
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incidents }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValeu}>{incidents.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incidents.description}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency', 
                                currency: 'BRL'
                                }).format(incidents.value)
                            }
                        </Text>

                        <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigationToDetail(incidents)}
                        >
                            <Text style={styles.detailsButtonText}>
                                Ver mais detalhes 
                            </Text>
                            <Feather name="arrow-right" size={16} color="#e02041"/>
                        </TouchableOpacity>
                        
                    </View>      
                )}
            />
        </View>
    );
}