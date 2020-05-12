import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { SignOut } from '../../helpers/AuthHandler';
import { StackActions, NavigationActions } from 'react-navigation';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import HeaderPerfil from '../../components/HeaderPerfil';
import {
    Safe,
    Container,
    HeaderArea,
    HeaderTitle,
    Imagem
} from './styled';

const Perfil = (props) =>{
    const api = useSalatoDeliveryAPI(props);
    //const [DtNascimento, setDtNascimento] = useState(props.infoUsuario[0].DtNascimento);
    const [sexo, setsexo] = useState(0);
    const [sexos, setsexos] = useState([
                                        {nome:'', id:0},
                                        {nome:'Sexo Masculino', id:1},
                                        {nome:'Sexo Feminino', id:2},
                                        {nome:'Outros', id:3}
                                        ]);

    const [EstadoCivil, setEstadoCivil] = useState(0);
    const [EstadoCivis, setEstadoCivis] = useState([
                                                    {nome:'', id:0},
                                                    {nome:'Solteiro', id:1},
                                                    {nome:'Casado', id:2},
                                                    {nome:'Desquitado', id:3},
                                                    {nome:'Viuvo', id:4},
                                                    {nome:'União Estavel', id:5},
                                                    {nome:'Outros', id:6}
                                                    ]);

    const getInfoUsuario = async () =>{
        const json = await api.getUsuario(props.jwt, props.hash);
        props.setInfoUsuario(json)

    }      
    useEffect(()=>{
        getInfoUsuario();
    },[])    

    useEffect(()=> {
        if (!props.jwt){
            props.navigation.dispatch(StackActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'Login'})
                ]
            }));
        }
    },[props.jwt]);

    useEffect(()=>{
        switch(props.infoUsuario.InfoUsuario[0].TpEstadoCivil){
            case 'C':
                setEstadoCivil(2);
                break;
            case 'S':
                setEstadoCivil(1);
                break;
            case 'D':
                setEstadoCivil(3);
                break;
            case 'V':
                setEstadoCivil(4);
                break;
            case 'U':
                setEstadoCivil(5);
                break;
            case 'O':
                setEstadoCivil(6);
                break;
        }
    },[EstadoCivil])

    return(
        <Safe>
            <Container>
                <HeaderArea onPress={()=>props.navigation.navigate('Senha')} underlayColor='#EEE'>
                    <HeaderTitle>Senha</HeaderTitle>
                </HeaderArea>
                <HeaderArea onPress={()=>props.navigation.navigate('Email')} underlayColor='#EEE'>
                    <HeaderTitle>Email</HeaderTitle>
                </HeaderArea>
                <HeaderArea onPress={()=>props.navigation.navigate('ContaItem')} underlayColor='#EEE'> 
                    <HeaderTitle>Perfil</HeaderTitle>
                </HeaderArea>
                <HeaderArea onPress={()=>props.navigation.navigate('Senha')} underlayColor='#EEE'>
                    <HeaderTitle>Pedidos</HeaderTitle>
                </HeaderArea>
                <HeaderArea onPress={()=>props.setSignOut()} underlayColor='#EEE'> 
                    <HeaderTitle name='Sair' >Sair</HeaderTitle>
                </HeaderArea>
                
            </Container>
        </Safe>
    )
}

Perfil.navigationOptions = (props) => {
    return{ 
        headerTitle:<HeaderPerfil />,
        headerStyle:{
        }

    }
}
const mapStateToProps = (state) => {
    return{
        jwt:state.userReducer.jwt,
        hash:state.userReducer.hash,
        Endereco:state.carReducer.Endereco,
        infoUsuario:state.userReducer.infoUsuario,

    }
} 
 
const mapDispatchToProps = (dispatch) =>{
    return{
        setInfoUsuario:(infoUsuario)=>dispatch({type:'SET_INFOUSUARIO', payload:{infoUsuario}}),
        setClearJwt:(jwt)=>dispatch({type:'SET_JWT', payload:{jwt}}),
        setEndereco:(Endereco)=>dispatch({type:'SET_ENDERECO', payload:{Endereco}}),
        setSignOut:()=>dispatch(SignOut()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Perfil);