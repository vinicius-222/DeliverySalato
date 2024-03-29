import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { Dimensions } from 'react-native';
import AddressModal from '../../components/Address/AddressModal';
import useSalatoDeliveryAPI, { BASEAPIIMAGE } from '../../useSalatoDeliveryAPI';
import { Button } from 'react-native';
import { SignOut } from '../../helpers/AuthHandler';


import { 
    Container,
    HeaderCategoria,
    BodyArea,
    Imagen,
    Logo,
    Texto
} from './styled';
 
const BASE = BASEAPIIMAGE;
const screenWidth = Math.round(Dimensions.get('window').width);
let thirdW = screenWidth / 1;

const Home = (props) =>{
    const api = useSalatoDeliveryAPI(props);
    const MonthRef = useRef();
    const [ProductsInfo, setProductsInfo] = useState('Teste');
    const [selectedMonth, setSelectedMonth] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [widthImagemPlatform, setwidthImagemPlatform] = useState(0);

    const handleScrollEnd = (e) => {
        let posX = e.nativeEvent.contentOffset.x;
        let targetMonth = Math.round( posX / thirdW );
        setSelectedMonth(targetMonth);
    }  


    
    const scrollToMonth = (m) => {
        let posX = m * thirdW;
        MonthRef.current.scrollTo({x:posX, y:0, animated:true});
    }

    const getInfoProduto = async () => {
        let Limit = 1000;
        let offset = (currentPage-1) * Limit + 1;
        const json = await api.getProdutoBanner(
            '',
            1,
            Limit,
            0,
            offset,
            36
        );
        props.setListProductsCategory(json.Produtos);  
    }
    
    const getCountCar = async () =>{
        const json = await api.getCountCar(
            props.jwt,
            props.hash
        );
        props.setQtProdutoCar(json.QtCartCompra);
    }

    const getCarrCompra = async () =>{
        const json = await api.getCarCompra(
            props.jwt,
            props.hash,
            props
        );
        props.setcarCompra(json.CarrinhoDeCompra);        
    }

    const getInfoUsuario = async () =>{
        const json = await api.getUsuario(props.jwt, props.hash);
        props.setInfoUsuario(json)

    }     

    const handleGetCategoria = async () => {
        const r = await api.getCategoria(props.jwt, props.hash);
        props.setListCategory(r.GrupoProduto);
    }

    const location = async () =>{
        const geo = await api.getCurrentLocation();
        props.setGeoLocation(geo);
    }

    const getMeusEnderecos = async () => {
        const json = await api.getEndereco(
            props.jwt
        )
        props.setMeusEnderecos(json.InfoEndereco);

        let key = json.InfoEndereco.findIndex((item)=> item.StEntrega == 1);

        if (key > -1){
            let item = json.InfoEndereco[key];
            let DsEndereco = `${item.DsLogradouro}, ${item.NrNumero} - ${item.DsBairro} , ${item.DsCidade} / ${item.CdUF} - CEP:${item.DsCEP}`;
            props.setEnderecoAtivo(DsEndereco);
        }

    }

    useEffect(() =>{ 
        getCountCar();
        getCarrCompra();
        handleGetCategoria();
        getInfoProduto();
        getInfoUsuario();
        location();
        getMeusEnderecos();
        let s  = screenWidth - 24;
        setwidthImagemPlatform(s);
    },[])

    return(
        <Container>
            <HeaderCategoria
                ref={MonthRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                snapToInterval={thirdW}
                contentContainerStyle={{}}
                onMomentumScrollEnd={handleScrollEnd}
            >
                <BodyArea>
                    <Imagen height={widthImagemPlatform} source={{uri:'http://138.99.15.234:20003/images/WhatsApp%20Image%202019-09-19%20at%2016.49.26.jpeg'}}/>
                    <Imagen height={widthImagemPlatform} source={{uri:'http://138.99.15.234:20003/images/WhatsApp%20Image%202019-09-19%20at%2016.49.26%20(1).jpeg'}}/>
                    <Imagen height={widthImagemPlatform} source={{uri:'http://138.99.15.234:20003/images/WhatsApp%20Image%202019-09-19%20at%2016.49.26%20(2).jpeg'}}/>
                </BodyArea>
            </HeaderCategoria>
        </Container>
    )   
}


Home.navigationOptions = ({navigation}) =>{

    return{
        headerTitle:<Logo source={require('../../assets/images/Logo.png')} />,
        headerStyle:{
            backgroundColor:'#FFF',
        },
        tabBarIcon:({focused, tintColor})=>{
            return <Imagen source={focused ? require('../../assets/images/home_active.png') : require('../../assets/images/home_inactive.png') }/>
        }
    }
}

const mapStateToProps = (state) => {
    return{
        jwt:state.userReducer.jwt,
        ListCarCompra:state.carReducer.ListCarCompra,
        hash:state.userReducer.hash,
        Endereco:state.carReducer.Endereco,
    }
}
 
const mapDispatchToProps = (dispatch) =>{
    return{
        setGeoLocation:(GeoEndereco)=>dispatch({type:'SET_GEOENDERECO', payload:{GeoEndereco}}),
        setMeusEnderecos:(MeusEnderecos)=>dispatch({type:'SET_MEUSENDERECOS', payload:{MeusEnderecos}}),
        setEnderecoAtivo:(EnderecoAtivo)=>dispatch({type:'SET_ENDERECOATIVO', payload:{EnderecoAtivo}}),
        setcarCompra:(ListCarCompra)=>dispatch({type:'SET_LISTCARCOMPRA', payload:{ListCarCompra}}),
        setClearJwt:(jwt)=>dispatch({type:'SET_JWT', payload:{jwt}}),
        setEndereco:(Endereco)=>dispatch({type:'SET_ENDERECO', payload:{Endereco}}),
        setQtProdutoCar:(QtProdutoCar)=>dispatch({type:'SET_QTPRODUTOCAR', payload:{QtProdutoCar}}),
        setSignOut:()=>dispatch(SignOut()),
        setListProductsCategory:(ListProductsCategory)=>dispatch({type:'SET_LISTPRODUCTSCATEGORY', payload:{ListProductsCategory}}),
        setListCategory:(ListCategory)=>dispatch({type:'SET_LISTCATEGORY', payload:{ListCategory}}),
        setNmCategoria:(NmCategoria)=>dispatch({type:'SET_NMCATEGORIA', payload:{NmCategoria}}),
        setIdategoria:(IdCategoria)=>dispatch({type:'SET_IDCATEGORIA', payload:{IdCategoria}}),
        setInfoUsuario:(infoUsuario)=>dispatch({type:'SET_INFOUSUARIO', payload:{infoUsuario}}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);