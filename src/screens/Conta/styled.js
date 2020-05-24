import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
    flex:1;
`;
export const KeyBordAvoidView = styled.KeyboardAvoidingView`
    flex:1;
`;
export const ScrollArea = styled.ScrollView`
    flex:1;
`;
export const Container = styled.View`
    flex:1;
    padding:0px 15px;
`;
export const AreaCampos = styled.View`
    margin-top:10px;
    height:40px;
    width:100%;
    border-bottom-color:#FF0000;
    border-bottom-width:0.5px;
`;
export const TitleCampos = styled.Text`
    font-size:12px;
    color:#999;
`;
export const InputCampos = styled.TextInput`
    font-size:17px;
    padding:5px;
`;
export const AreaButtons = styled.View`
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;
    flex:1;
`;

export const ButtonSexo = styled.TouchableHighlight`
    justify-content:center;
    align-items:center;
    height:30px;
    width:30%;
    border-radius:5px;
    background-color:${props=>props.active ? '#FF0000' : '#999'};
    margin-top:10px;
`;
export const ButtonEstadoCivil = styled.TouchableHighlight`
    justify-content:center;
    align-items:center;
    height:30px;
    width:30%;
    border-radius:5px;
    background-color:${props=>props.active ? '#FF0000' : '#999'};
    margin-top:10px;
`;
export const TitleButton = styled.Text`
    color:#FFF;
`;

export const AreaButtonSalvar = styled.View`
    height:100px;
    width:100%;
    justify-content:center;
    align-items:center;
`;
export const ButtonSalvar = styled.TouchableHighlight`
    justify-content:center;
    align-items:center;
    height:50px;
    width:80%;
    border-radius:10px;
    color:#FFF;
    background-color:#32CD32;
`;