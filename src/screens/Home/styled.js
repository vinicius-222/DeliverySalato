import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex:1;
    background-color:#FFF;
`;
export const HeaderCategoria = styled.ScrollView`
    width:100%;
`;
export const BodyArea = styled.View`
    flex:1;
    justify-content:center;
    align-items:flex-start;
    flex-direction:row;
`;

export const Imagen = styled.Image`
    height:390px;
    width:390px;
    resizeMode:center;
    border-radius:5px;
    margin:10px 12px;
`;
export const Logo = styled.Image`
    height:90px;     
    width:90px;
    resizeMode:contain;
`;
export const Texto = styled.Text``;