import styled from 'styled-components/native';

export const Safe = styled.SafeAreaView`
    flex:1;
`;
export const Container = styled.View`
    flex:1;
    padding:10px;
`;
export const HeaderArea = styled.TouchableHighlight`
    height:50px;
    border-bottom-color:#CCC;
    border-bottom-width:0.6px;
    justify-content:center;
    margin:0px 10px;
`;
export const HeaderTitle = styled.Text`
    font-size:18px;
    color:${props=>props.name == 'Sair' ? '#3574CB': '#FF0000'};
    margin-left:5px;
`;
export const Imagem = styled.Image`
    width:250px;
    resizeMode:contain;
`;

export const AreaLogo = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`;


