import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import styles from './styles';
import { getUser, loginUser } from '../../actions/userActions';

const mapStateToProps = state => ({
  logInState: state.userState.status,
  user: state.userState.result,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => {
    dispatch(loginUser(email, password));
  },
  getUser: () => {
    dispatch(getUser());
  },
});

const Login = class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }
  login() {
    if (this.state.email && this.state.password) {
      this.props.loginUser(this.state.email, this.state.password);
    } else {
      console.log('input missing');
    }
  }
  componentDidMount() {
    this.props.getUser();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.logInState !== nextProps.logInState && nextProps.logInState === 'SUCCCESS_LOGIN') {
      Actions.profile();
    }
    if (this.props.user !== nextProps.user && nextProps.user !== null) {
      Actions.profile();
    }

  }
  render() {
    return (
      <ViewContainer>
        <StatusbarBackground />
        <View style={styles.logoContainer}>
          <Image source={require('../../resources/react-logo.png')} style={styles.reactLogo} />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="black"
            autoCorrect={false}
            returnKeyType="next"
            value={this.state.email}
            onChangeText={(text) => {
              this.setState({
                email: text.toLowerCase().replace(/\s/g, ''),
              });
            }}
          />
          <View style={styles.hairline} />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="black"
            autoCorrect={false}
            returnKeyType="go"
            secureTextEntry
            value={this.state.password}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <View style={styles.hairline} />
        </View>

        <View style={styles.login}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => { this.login(); }}
          >
            <Text style={styles.loginButtonText}>LOG IN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.register}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={Actions.register}
          >
            <Text style={styles.registerButtonText}>create account</Text>
          </TouchableOpacity>
        </View>
      </ViewContainer>
    );
  }
};

const LoginConnected = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginConnected;
