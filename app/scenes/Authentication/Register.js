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
import { createUser } from '../../actions/userActions';

const mapStateToProps = state => ({
  logInState: state.userState.status,
});


const mapDispatchToProps = dispatch => ({
  createUser: (email, password) => {
    dispatch(createUser(email, password));
  },
});

const Register = class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      verifyPassword: '',
    };
    this.register = this.register.bind(this);
  }
  register() {
    if (this.state.email && this.state.password && this.state.verifyPassword) {
      if (this.state.password === this.state.verifyPassword) {
        this.props.createUser(this.state.email, this.state.password);
      } else {
        console.log('password not match');
      }
    } else {
      console.log('missing input');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.logInState !== nextProps.logInState && nextProps.logInState === 'SUCCCESS_CREATE_USER') {
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
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            placeholderTextColor="black"
            autoCorrect={false}
            returnKeyType="go"
            secureTextEntry
            value={this.state.verifyPassword}
            onChangeText={(text) => {
              this.setState({
                verifyPassword: text,
              });
            }}
          />
          <View style={styles.hairline} />
        </View>

        <View style={styles.login}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => { this.register(); }}
          >
            <Text style={styles.loginButtonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
        </View>

      </ViewContainer>
    );
  }
};

const RegisterConnected = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterConnected;
