import React, { useState, useEffect, useRef } from 'react';
import { Modal, Platform } from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import styled from 'styled-components/native';
import EditModal from '../../components/Address/EditModal';
import InsertAddressModal from './InsertAddressModal';
import { MapsAPI } from '../../config';
import { connect } from 'react-redux';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';

const ModalArea = styled.SafeAreaView`
    flex:1;
    background-color:#FFF;
`;
const Container = styled.View`
    flex:1;
    padding:5px 15px;
`;
const ModalHeaderTitle = styled.Text`
    color:#CCC;
    text-align:center;
`;
const ModalHeader = styled.View`
    margin-top:10px;
    flex-direction:column;
`;
const HeaderAreaInfo = styled.View`
    flex-direction:row;
    align-items:center;
    justify-content:flex-start;
`;
const ModalClose = styled.TouchableHighlight`
    width:25px;
    height:25px;
    justify-content:center;
    align-items:center;
    background-color:#FF0000;
    border-radius:20px;
`;
const ModalResultImage = styled.Image`
    height:20px;
    width:20px;
    resizeMode:contain;
`;

const ModalCloseText = styled.Text`
    color:#FFF;
    font-weight:bold;
`;

const ModalButtonText = styled.Text`
    font-size:14px;
    color:#000;
`;
const ButtonLocalizacaoEndereco = styled.TouchableHighlight`
    margin-left:10px;
    width:80%;
    background-color:#EEEEEE;
    height:40px;
    border-radius:5px;
    justify-content:center;
    align-items:center;
`;
const ModalResults = styled.ScrollView``;

const ModalResult = styled.TouchableHighlight`
    flex:1;
`;

const ModalResultTitleArea = styled.View`

`;
const ModalResultTitle =  styled.Text`
    font-size:18px;
    margin-top:5px;
`;

const ModalResultArea = styled.View`
    height:120px;
    margin:5px 10px;
    border:0.5px solid ${props=>props.active ? '#FF0000' : '#CCCCCC'};
    border-radius:5px;
    justify-content:space-between;
    align-items:center;
`;

const ModalResultItem = styled.View`
    justify-content:center;
    align-items:center;
`;

const ModalResultItemArea = styled.View`
    padding:0px 0px;
    flex-wrap:wrap;
    flex-direction:row;
    justify-content:space-between;
`;
const ModalResultInfo = styled.View`
    flex-wrap:wrap;
    width:85%;
    margin-top:${props=>props.plataforma.OS === 'ios' ? '10px' : '0px'};
`;
const ModalResultoActions = styled.View`
    flex-direction:column;
    align-items:center;
    width:30px;
`;
const ModalResultText = styled.Text`
    color:#999;
    font-size:${props=>props.plataforma.OS === 'ios' ? '16px' : '14px;'};
`;

const ModalLocalizacaoAtual = styled.TouchableHighlight`
   padding:5px;
`;
const ModalLocalizacaoAtualArea = styled.View`
    border-radius:5px;
    height:40px;
    justify-content:center;
    flex-direction:row;
    align-items:center;
    margin-bottom:20px;
`;

const ModalLocalizacaoAtualImage = styled.Image`
    height:25px;
    width:25px;
    resizeMode:contain;

`;
const ModalLocalizacaoAtualText = styled.Text`
    padding-left:10px;
`;

const HeaderTitleArea = styled.View`
    justify-content:center;
    align-items:center;
    margin-top:20px;
`;
const HeaderTitleText = styled.Text`
    font-size:14px;
    color:#CCC;
    text-align:center;
`;
const ButtonActionModalResult = styled.TouchableHighlight``;
const ButtonActionModalCircle = styled.View`
    height:4px;
    width:4px;
    border-radius:2px;
    resizeMode:contain;
    background-color:#FF0000;
    margin:2px;
`;
const ButtonActionModalCircleArea = styled.View`
    flex-direction:row;
    margin:25px 0px;
`;

let timer;

const AddressModal = (props) => {
    const map = useRef();
    const api = useSalatoDeliveryAPI(props);
    const [LocationActual, setLocationActual] = useState('');
    const [MeusEndereco, setMeusEndereco] = useState([]);
    const [IdEndereco, setIdEndereco] = useState([]);
    const [keyEndereco, setKeyEndereco] = useState(0);
    const [modalEditTitle, setModalEditTitle] = useState('Edite seu endereco');
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [modalInserVisible, setModalInsertVisible] = useState(false);
    const [stUsarGeoLocation, setStUsarGeoLocation] = useState(false);

    useEffect(async()=>{
        setMeusEndereco(props.MeusEnderecos);

        if(props.EnderecoAtivo.length > 0){
            props.clickAction(false, props.EnderecoAtivo);
        }else{
            let item = `${ props.GeoEndereco[0]} N:${ props.GeoEndereco[1]}, ${ props.GeoEndereco[2]} - ${ props.GeoEndereco[3]} / ${ props.GeoEndereco[4]}, CEP:${ props.GeoEndereco[5]}`
            props.clickAction(true, item);
        }
    
    }, []);

    const handleCloseAction = () => {
        props.visibleAction(false);
    }

    const handleClose = () => {
    }

    const handleResultClick = async(item) => {
        const json = await api.updateStEndereco(props.jwt, item.IdEndereco, item.StEntrega);
        if (!json.error){
            let arr = [];
            arr = MeusEndereco;

            for (let i in arr){
                if (arr[i].IdEndereco == item.IdEndereco){
                    arr[i].StEntrega = 1;
                }else{
                    arr[i].StEntrega = 0;
                }
            }

            const End = `${item.DsLogradouro}, ${item.NrNumero} - ${item.DsBairro} , ${item.DsCidade} / ${item.CdUF} - CEP:${item.DsCEP}`
            props.clickAction(props.field,End );
            props.visibleAction(false);
        } 
    }
    const handleCurrentInsert = () => {
        setStUsarGeoLocation(true);
        setModalInsertVisible(true);
        setLocationActual(props.GeoEndereco);
    }

    const DeleteEndereco = (k) =>{
        let arr = [];
        arr = MeusEndereco;
        arr.splice(k, 1);
        setMeusEndereco(arr);
        
        if (props.MeusEnderecos.length <= 0){
            let item = `${ props.GeoEndereco[0]} N:${ props.GeoEndereco[1]}, ${ props.GeoEndereco[2]} - ${ props.GeoEndereco[3]} / ${ props.GeoEndereco[4]}, CEP:${ props.GeoEndereco[5]}`
            props.setEndereco(item);
            props.visibleBalon(true)
        }
    }

    const UpdateEndereco = async(IdEndereco, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, StEntrega, TpEndereco, NmEndereco, DsPontoDeReferencia, NmDestinatario, k) => {
        let arr = [];
        arr = MeusEndereco;
        arr[k].DsLogradouro = DsLogradouro;
        arr[k].NrNumero = NrNumero;
        arr[k].DsBairro = DsBairro;
        arr[k].DsCidade = DsCidade;
        arr[k].DsCEP = DsCEP;
        arr[k].CdUF = CdUF;
        arr[k].TpEndereco = TpEndereco;
        arr[k].NmEndereco = NmEndereco;
        arr[k].DsPontoDeReferencia = DsPontoDeReferencia;
        arr[k].NmDestinatario = NmDestinatario;
        setMeusEndereco(arr);
        const json = await api.updateEndereco(props.jwt, IdEndereco, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, StEntrega, TpEndereco, NmEndereco, DsPontoDeReferencia, NmDestinatario );
        console.log(json);
        if (!json.error){
            alert("registor atulizado!!");
        }

    }
    
    const InsertEndereco = async(DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, TpEndereco, NmEndereco, DsPontoDeReferencia, NmDestinatario) =>{
        const json = await api.insertEndereco(props.jwt, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, TpEndereco, NmEndereco, DsPontoDeReferencia, NmDestinatario);
        if (!json.error){
            const json = await api.getEndereco(props.jwt);
            setMeusEndereco(json.InfoEndereco);
            props.setMeusEnderecos(json.InfoEndereco);

        }
    }
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
            onShow={handleClose}
            onDismiss={handleClose}
        >
            <ModalArea Platform={Platform}>
                <Container>
                    <EditModal 
                        title="Editar"
                        visible={modalEditVisible}
                        visibleAction={setModalEditVisible}
                        data={IdEndereco}
                        k={keyEndereco}
                        ActionDeleteClick={DeleteEndereco}
                        ActionUpdateClick={UpdateEndereco}
                    />
                    <InsertAddressModal 
                        visible={modalInserVisible}
                        visibleAction={setModalInsertVisible}
                        ActionInsertClick={InsertEndereco}
                        data={LocationActual}
                        StGeolocation={stUsarGeoLocation}
                    />
                    <ModalHeaderTitle>ENDEREÇO DE ENTREGA</ModalHeaderTitle>
                    <ModalHeader>
                        <HeaderAreaInfo>
                            <ModalClose onPress={handleCloseAction} underlayColor="#EEE">
                                <ModalCloseText>X</ModalCloseText>
                            </ModalClose>
                            <ButtonLocalizacaoEndereco onPress={()=>{
                                setStUsarGeoLocation(false);
                                setModalInsertVisible(true)
                            }} 
                                underlayColor="transparent">
                                <ModalButtonText>Clica aqui para inserir um endereco</ModalButtonText>
                            </ButtonLocalizacaoEndereco>
                        </HeaderAreaInfo>
                        <HeaderTitleArea>
                            <HeaderTitleText>USAR LOCALIZACAO ATUAL</HeaderTitleText>  
                        </HeaderTitleArea>
                        <ModalLocalizacaoAtual onPress={()=>handleCurrentInsert()} underlayColor="transparent">
                            <ModalLocalizacaoAtualArea>
                                <ModalLocalizacaoAtualImage  source={require('../../assets/images/Target.png')}/>
                                <ModalLocalizacaoAtualText>{`${ props.GeoEndereco[0]} N:${ props.GeoEndereco[1]}, ${ props.GeoEndereco[2]} - ${ props.GeoEndereco[3]} / ${ props.GeoEndereco[4]}, CEP:${ props.GeoEndereco[5]}`}</ModalLocalizacaoAtualText>
                            </ModalLocalizacaoAtualArea>
                        </ModalLocalizacaoAtual>
                    </ModalHeader>
                    <ModalResults>
                        {MeusEndereco.map((i,k)=>(
                            <ModalResultArea active={i.StEntrega == '1'}>
                                <ModalResult key={k} onPress={()=>handleResultClick(i)} underlayColor="transparent" >
                                    <ModalResultItem>
                                        <ModalResultTitleArea>
                                            <ModalResultTitle>{i.NmEndereco}</ModalResultTitle>
                                        </ModalResultTitleArea>
                                        <ModalResultItemArea>
                                            <ModalResultInfo plataforma={Platform}>
                                                <ModalResultText plataforma={Platform}>{i.DsLogradouro}, {i.NrNumero}</ModalResultText>
                                                <ModalResultText plataforma={Platform}>{i.DsBairro}</ModalResultText>
                                                <ModalResultText plataforma={Platform}>{i.DsCidade} / {i.CdUF}</ModalResultText>
                                                <ModalResultText plataforma={Platform}>{i.DsCEP}</ModalResultText>
                                            </ModalResultInfo>
                                            <ModalResultoActions> 
                                                {i.StEntrega == '1' && 
                                                    <ModalResultImage source={require('../../assets/images/check.png')}/>
                                                }
                                                <ButtonActionModalResult onPress={()=>{
                                                    setIdEndereco(i)
                                                    setKeyEndereco(k)
                                                    setModalEditVisible(true)}
                                                } underlayColor="transparent">
                                                    <ButtonActionModalCircleArea>
                                                        <ButtonActionModalCircle></ButtonActionModalCircle>
                                                        <ButtonActionModalCircle></ButtonActionModalCircle>
                                                        <ButtonActionModalCircle></ButtonActionModalCircle>
                                                    </ButtonActionModalCircleArea>
                                                </ButtonActionModalResult>
                                            </ModalResultoActions>
                                        </ModalResultItemArea>
                                    </ModalResultItem>
                                </ModalResult>
                            </ModalResultArea>
                        ))}
                    </ModalResults>
                </Container>
            </ModalArea>
        </Modal>
    );
}


const mapStateToProps = (state) => {
    return{
        jwt:state.userReducer.jwt,
        hash:state.userReducer.hash,
        Endereco:state.carReducer.Endereco,
        GeoEndereco:state.enderecoReducer.GeoEndereco,
        MeusEnderecos:state.enderecoReducer.MeusEnderecos,
        EnderecoAtivo:state.enderecoReducer.EnderecoAtivo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setEndereco:(Endereco)=>dispatch({type:'SET_ENDERECO', payload:{Endereco}}),
        setGeoLocation:(GeoEndereco)=>dispatch({type:'SET_GEOENDERECO', payload:{GeoEndereco}}),
        setMeusEnderecos:(MeusEnderecos)=>dispatch({type:'SET_MEUSENDERECOS', payload:{MeusEnderecos}}),
        setEnderecoAtivo:(EnderecoAtivo)=>dispatch({type:'SET_ENDERECOATIVO', payload:{EnderecoAtivo}}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddressModal);