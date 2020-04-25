import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const Preload = (props) => {
    if(!props.jwt) {
        // LOGIN
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        }));
    } else {
        // HOME
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'PrincipalTabs'})
            ]
        }));
    }

    return null;
}

const mapStateToProps = (state) => {
    return {
        jwt:state.userReducer.jwt
    };
}
export default connect(mapStateToProps)(Preload);