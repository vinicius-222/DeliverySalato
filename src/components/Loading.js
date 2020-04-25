import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const LoadingArea = styled.View`
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    justify-content:center;
    align-items:center;
`;

const Loading = () =>{
    return(
        <LoadingArea>
            <ActivityIndicator size="large" color="#CCC"/>
        </LoadingArea>
    )
}

export default Loading;