const initialState = {
    MeusEnderecos:[],
    EnderecoAtivo:[],
    GeoEndereco:[]
}

export default (state = initialState, action) =>{
    
    switch(action.type){
        case 'SET_MEUSENDERECOS':
            return {...state, MeusEnderecos:action.payload.MeusEnderecos};
            break;
        case 'SET_ENDERECOATIVO':
            return {...state, EnderecoAtivo:action.payload.EnderecoAtivo};
            break;
        case 'SET_GEOENDERECO':
            return {...state, GeoEndereco:action.payload.GeoEndereco};
            break;
    }   

    return state;
}