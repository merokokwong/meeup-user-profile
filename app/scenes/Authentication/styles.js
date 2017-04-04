import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    height: 20,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 12,
  },
  hairline: {
    height: 1,
    backgroundColor: 'black',
    marginBottom: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 350,
    height: 300,
  },
  reactLogo: {
    width: 100,
    height: 100,
  },
  login: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  loginButton: {
    borderWidth: 1,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  loginButtonText: {
    padding: 11,
  },
  register: {
    alignItems: 'center',
  },
});

export default styles;
