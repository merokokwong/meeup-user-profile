import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ViewContainer from '../components/ViewContainer';
import StatusbarBackground from '../components/StatusbarBackground';
import { getUser } from '../actions/userActions';
import { getProfile } from '../actions/profileActions';
import firebaseRef from '../services/Firebase';

export const styles = StyleSheet.create({
  profilePageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  profilePicture: {
    marginTop: 80,
    marginBottom: 20,
  },
  profilePictureBorder: {
    borderWidth: 1,
    borderColor: '#2C0F66',
    height: 140,
    width: 140,
    borderRadius: 80,
    overflow: 'hidden',
  },
  iconStyle: {
    height: 140,
    width: 140,
  },
  nameStyle: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    color: '#2C0F66',
    paddingLeft: 5,
  },
  personalDescription: {
    marginTop: 60,
    marginBottom: 20,
    marginLeft: 60,
    flexDirection: 'row',
  },
  personalDescriptionText: {
    fontSize: 12,
    marginBottom: 20,
  },
  columnOne: {
    marginRight: 40,
  },
  columnTwo: {
    marginRight: 40,
  },
  edit: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  editButton: {
    borderWidth: 1,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  editButtonText: {
    padding: 11,
  },
});

const mapStateToProps = state => ({
  user: state.userState.result,
  profile: state.profileState.result,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => {
    dispatch(getUser());
  },
  getProfile: () => {
    dispatch(getProfile());
  },
});

const Profile = class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      department: '',
      jobPosition: '',
    };
    this.goToEditPage = this.goToEditPage.bind(this);
    this.goLogout = this.goLogout.bind(this);
  }
  goToEditPage() {
    Actions.editProfile({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      company: this.state.company,
      department: this.state.department,
      jobPosition: this.state.jobPosition,
    });
  }
  goLogout() {
    firebaseRef.auth().signOut().then(() => {
      Actions.login();
    });
    // .catch((error) => {
    //   // An error happened.
    // });
  }
  componentWillMount() {
    this.props.getUser();
    this.props.getProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user && nextProps.user) {
      this.props.getProfile();
    }
    if (this.props.profile !== nextProps.profile && nextProps.profile) {
      this.setState({
        firstName: nextProps.profile.firstName,
        lastName: nextProps.profile.lastName,
        email: nextProps.profile.email,
        company: nextProps.profile.company,
        department: nextProps.profile.department,
        jobPosition: nextProps.profile.jobPosition,
      });
    }
  }
  render() {
    return (
      <ViewContainer>
        <StatusbarBackground />
        <View style={styles.profilePageStyle}>
          <View style={styles.profilePicture}>
            <View style={styles.profilePictureBorder}>
              <Image source={require('../resources/user-icon.png')} style={styles.iconStyle} />
            </View>
          </View>

          <View>
            { this.state.firstName !== '' || this.state.lastName !== ''
                ?
                  <View style={styles.nameStyle}>
                    <Text style={styles.nameText}>{this.state.firstName}</Text>
                    <Text style={styles.nameText}>{this.state.lastName}</Text>
                  </View>
                :
                  <View style={styles.nameStyle}>
                    <Text style={styles.nameText}>Name</Text>
                  </View>
              }

          </View>


          <View style={styles.email}>
            { this.state.email !== ''
                ?
                  <Text style={styles.emailText}>{this.state.email}</Text>
                :
                  <Text style={styles.emailText}>email</Text>
              }
          </View>

          <View style={styles.personalDescription}>
            <View style={styles.columnOne}>
              <Text style={styles.personalDescriptionText}>Company</Text>
              <Text style={styles.personalDescriptionText}>Department</Text>
              <Text style={styles.personalDescriptionText}>Position</Text>
            </View>
            <View style={styles.columnTwo}>
              <Text style={styles.personalDescriptionText}>{this.state.company !== '' ? this.state.company : 'null'}</Text>
              <Text style={styles.personalDescriptionText}>{this.state.department !== '' ? this.state.department : 'null'}</Text>
              <Text style={styles.personalDescriptionText}>{this.state.jobPosition !== '' ? this.state.jobPosition : 'null'}</Text>
            </View>
          </View>

          <View style={styles.edit}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => { this.goToEditPage(); }}
            >
              <Text style={styles.editButtonText}>Edit your Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => { this.goLogout(); }}
            >
              <Text style={styles.editButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ViewContainer>
    );
  }
};
const ProfileConnected = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileConnected;
