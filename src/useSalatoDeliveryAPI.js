import qs from 'qs';
import { StackActions, NavigationActions } from 'react-navigation';
import { SignOut } from './helpers/AuthHandler';

//const URL = 'http://192.168.1.65';
const URL = 'http://138.99.15.234:20003';
const BASEAPI = URL+'/backEndSalato/';
export const BASEAPIIMAGE = URL+'/images/';

const apiFetchFile = async (endpoint, body) => {
    /*if (body.jwt){
        let jwt = AsyncStorage.getItem('jwt');
        if(jwt) {
            body.jwt = jwt;
        }
    }

    if (body.hash){
        let hash = AsyncStorage.getItem('hash');
        if(hash) {
            body.hash = hash;
        }
    }*/

    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        body
    });
    const json = await res.json();

    if (json.error){
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        })); 
        return (dispatch) =>{
            dispatch({
                type:'SET_JWT',
                    payload:{
                        jwt:''
                    }
            });
        }
    }
    return json;
}
const apiFetchPost = async (endpoint, body, props) => {

    /*if (body.jwt){
        let jwt = AsyncStorage.getItem('jwt');
        if(jwt) {
            body.jwt = jwt;
        }
    }

    if (body.hash){
        let hash = AsyncStorage.getItem('hash');
        if(hash) {
            body.hash = hash;
        }
    }*/

    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    if (json.error){
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        })); 

        return (dispatch) =>{
            dispatch({
                type:'SET_JWT',
                    payload:{
                        jwt:''
                    }
            });
        }
    }

    return json;
}
const apiFetchPostSignin = async (endpoint, body, props) => {

    /*if (body.jwt){
        let jwt = AsyncStorage.getItem('jwt');
        if(jwt) {
            body.jwt = jwt;
        }
    }

    if (body.hash){
        let hash = AsyncStorage.getItem('hash');
        if(hash) {
            body.hash = hash;
        }
    }*/

    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    return json;
}
const apiFetchGet = async (endpoint, body = [], props) => {

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();
    
    if (json.error){
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        })); 
        return (dispatch) =>{
            dispatch({
                type:'SET_JWT',
                    payload:{
                        jwt:''
                    }
            });
        }
    }
    return json;
}
const apiFetchGetEnd = async (endpoint, body = []) => {
   
    const res = await fetch(`${endpoint}`);
    const json = await res.json();

    return json;
}
const apiFetchDelete = async (endpoint, body = []) => {
    /*if (body.jwt){
        let jwt = AsyncStorage.getItem('jwt');
        if(jwt) {
            body.jwt = jwt;
        }
    }

    if (body.hash){
        let hash = AsyncStorage.getItem('hash');
        if(hash) {
            body.hash = hash;
        }
    }*/

    const res = await fetch(BASEAPI+endpoint, {
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        },
        body:JSON.stringify(body)
    });
    
    const json = await res.json();

    if (json.error){
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        })); 
        return (dispatch) =>{
            dispatch({
                type:'SET_JWT',
                    payload:{
                        jwt:''
                    }
            });
        }
    }
    return json;
}
const apiFetchPut = async (endpoint, body = [], props) => {
    /*if (body.jwt){
        let jwt = AsyncStorage.getItem('jwt');
        if(jwt) {
            body.jwt = jwt;
        }
    }

    if (body.hash){
        let hash = AsyncStorage.getItem('hash');
        if(hash) {
            body.hash = hash;
        }
    }*/

    const res = await fetch(BASEAPI+endpoint, {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(body)
    });
    
    const json = await res.json();
    
    if (json.error){
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        })); 
        
        SignOut();
    }

    return json;
} 
const useSalatoDeliveryAPI = (props) => ({    

    signin:async(email, pass) => {
       const json = await apiFetchPostSignin(
            '/user/getlogin',
            {email, pass},
       )
       return json;
    },

    signup:(name, email, password) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:''
                };

                if(email == 'erro@hotmail.com') {
                    json.error = 'E-mail já existe!';
                } else {
                    json.token = '123';
                    json.name = 'Paulo da Silva';
                }

                resolve(json);
            }, 1000);
        });
    },

    getRequestPrice:(distance) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:''
                };

                json.price = distance * 7;

                resolve(json);
            }, 1000);
        });
    },

    findDriver:(options) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:''
                };

                json.driver = {
                    name:'Gabriel Medina',
                    avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTD7KQgGrjEypO18u-rlm_-kSNnaSGXTH3dBTKV4jQVA72Qqizf',
                    stars:4,
                    carName:'Honda Civic',
                    carColor:'Branco',
                    carPlate:'AAA-0000'
                };

                resolve(json);
            }, 3000);
        });
    },

    setRating:(rating)=>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:''
                };

                resolve(json);
            }, 1000);
        }); 
    },

    getCategoria:async (jwt, hash)=>{
        const json = await apiFetchGet(
            '/pedidos/getGrupoProduto',
            {jwt, hash}
        )
        return json;
    },

    getProdutoBanner:async (NmProduto, IdPreco, per_pages, StPaginaInicial, offset, idGrupoProduto, IdProduto) => {
        const json = await apiFetchGet(
            '/pedidos/getProdutoBanner',
            {NmProduto, IdPreco, per_pages, StPaginaInicial, offset, idGrupoProduto, IdProduto}
        )
        return json;
    },

    getCarCompra:async (jwt, hash) => {
        const json = await apiFetchGet(
            '/pedidos/getCarCompra',
            {jwt,hash},
            props
        )
        return json;
        
    },

    getGrupoProduto:async () => {
        const json = await apiFetchGet(
            '/pedidos/getGrupoProduto'
        )
        return json;
    },

    senEmail:async (NmPessoa, DsEmail, DsMsg, DsAssunto) => {
        const json = await apiFetchPost(
            '/user/sendemail',
            {NmPessoa, DsEmail, DsMsg, DsAssunto}
        )
        return json;
    },

    insertCarCompra:async (jwt, hash, IdProduto, QtProduto) => {
        const json = await apiFetchPost(
            '/pedidos/InsertCarCompras',
            {jwt, hash, IdProduto, QtProduto},
            props
        )
        return json;
    },

    deleteCarCompra:async (jwt,hash, IdProduto) => {
        const json = await apiFetchDelete(
            '/pedidos/deleteCarCompra',
            {jwt, hash, IdProduto},
            props
        )
        return json;
    },

    updateCarCompra:async (jwt, hash, IdProduto, QtProduto) => {
        const json = await apiFetchPut(
            '/pedidos/InsertCarCompras',
            {jwt, hash, IdProduto, QtProduto},
            props
        )

        return json;
    },

    getCountCar:async (jwt, hash) => {
        const json = await apiFetchGet(
            '/pedidos/InsertCarCompras',
            {jwt, hash},
            props
        )
        return json;
    },

    getEnderecoCEP:async (cep) => {
        const json = await apiFetchGetEnd(
            'http://cep.republicavirtual.com.br/web_cep.php?cep=' + cep +'&formato=json'
        )
        return json;
    },

    getEndereco:async (jwt) => {
        const json = await apiFetchGet(
            '/user/getEndereco',
            {"jwt":jwt}
        )
        return json;
    },

    insertEndereco:async (jwt, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, TpEndereco = '', NmEndereco = '', DsPontoDeReferencia = '', NmDestinatario = '') => {
        const json = await apiFetchPost(
            '/user/insertEndereco',
            {jwt, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, TpEndereco, NmEndereco, DsPontoDeReferencia, NmDestinatario}
        )
        return json;
    },

    updateEndereco:async (jwt, IdEndereco, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, StEntrega, TpEndereco = '', NmEndereco = '', DsPontoDeReferencia = '', NmDestinatario = '') => {
        const json = await apiFetchPost(
            '/user/updateEndereco',
            {jwt, IdEndereco, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, StEntrega, TpEndereco, NmEndereco, DsPontoDeReferencia, NmDestinatario}
        )
        return json;
    },

    updateStEndereco:async (jwt, IdEndereco, StEntrega) => {
        const json = await apiFetchPost(
            '/user/updateStEndereco',
            {jwt, IdEndereco, StEntrega}
        )
        return json;
    },

    deleteEndereco:async (jwt, IdEndereco, hash) => {
        const json = await apiFetchDelete(
            '/user/delEndereco',
            {jwt, IdEndereco, hash}
        )
        return json;
    },

    getFormaDePagamento:async () =>{
        return new Promise((resolve, reject) =>{
            setTimeout(()=>{
                let json = {ListFormaDePagamento:[
                    {IdFormaDePagamento:1, NmFormaDePagamento:'Cartao de Credito' , url:'https://b2egroup.com.br/wp-content/uploads/2019/02/WhatsApp-Image-2019-02-01-at-14.29.23.jpeg'},
                    {IdFormaDePagamento:2, NmFormaDePagamento:'Dinheiro',  url:'https://empreendadentista.com.br/wp-content/uploads/2016/01/formas-de-pagamento.png'},
                    {IdFormaDePagamento:3, NmFormaDePagamento:'Motoboy com maquina',  url:'https://blog.drivetrue.com.br/wp-content/uploads/2017/11/147641-servico-de-entregas-5-dicas-para-lidar-com-motoboys.jpg'}
                ]};
                resolve(json);
            },1000)
        })
    },

    getUsuario:async (jwt, hash) => {
        const json = await apiFetchGet(
            '/user/getUsuario',
            {jwt, hash},
            props
        )
        return json;
    },

    updatePass:async (jwt, hash, email, pass, newPass) =>{
        const json = await apiFetchPost(
            '/user/updatePass',
            {jwt,hash, email, pass, newPass},
            props
        )
        return json;
    }
    
});

export default useSalatoDeliveryAPI;