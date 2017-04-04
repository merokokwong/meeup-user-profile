import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ViewContainer from '../components/ViewContainer';
import StatusbarBackground from '../components/StatusbarBackground';
import { getUser } from '../actions/userActions';
import { getProfile, writeData } from '../actions/profileActions';

export const styles = StyleSheet.create({
  editPageStyle: {
    marginTop: 100,
  },
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
  save: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  saveButton: {
    borderWidth: 1,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  saveButtonText: {
    padding: 11,
  },
});
const mapStateToProps = state => ({
  user: state.userState.result,
  profile: state.profileState.result,
  writeDataStatus: state.profileState.status,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => {
    dispatch(getUser());
  },
  getProfile: () => {
    dispatch(getProfile());
  },
  writeData: (firstName, lastName, email, company, department, jobPosition) => {
    dispatch(writeData(firstName, lastName, email, company, department, jobPosition));
  },
});

const EditProfile = class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      company: this.props.company,
      department: this.props.department,
      jobPosition: this.props.jobPosition,

    };
    this.saveEdit = this.saveEdit.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
  }
  saveEdit() {
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const company = this.state.company;
    const department = this.state.department;
    const jobPosition = this.state.jobPosition;
    this.props.writeData(firstName, lastName, email, company, department, jobPosition);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.writeDataStatus !== nextProps.writeDataStatus && nextProps.writeDataStatus === 'WRITE_SUCCESS') {
      this.props.getProfile();
      Actions.profile();
    }
    // if (this.props.profile !== nextProps.profile && nextProps.profile !== null) {
    //   console.log("in set State");
    //   this.setState({
    //     firstName: this.props.profile.firstName,
    //     lastName: this.props.profile.lastName,
    //     email: this.props.profile.email,
    //     company: this.props.profile.company,
    //     department: this.props.profile.department,
    //     jobPosition: this.props.profile.jobPosition,
    //   });
    // }
  }
  render() {
    return (
      <ViewContainer>
        <StatusbarBackground />
        <View style={styles.editPageStyle}>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            autoCorrect={false}
            value={this.state.firstName}
            onChangeText={(text) => {
              this.setState({
                firstName: text,
              });
            }}
          />
          <View style={styles.hairline} />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            autoCorrect={false}
            value={this.state.lastName}
            onChangeText={(text) => {
              this.setState({
                lastName: text,
              });
            }}
          />
          <View style={styles.hairline} />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            autoCorrect={false}
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
            placeholder="Company"
            autoCorrect={false}
            value={this.state.company}
            onChangeText={(text) => {
              this.setState({
                company: text,
              });
            }}
          />
          <View style={styles.hairline} />
          <TextInput
            style={styles.textInput}
            placeholder="Department"
            autoCorrect={false}
            value={this.state.department}
            onChangeText={(text) => {
              this.setState({
                department: text,
              });
            }}
          />
          <View style={styles.hairline} />
          <TextInput
            style={styles.textInput}
            placeholder="Position"
            autoCorrect={false}
            value={this.state.jobPosition}
            onChangeText={(text) => {
              this.setState({
                jobPosition: text,
              });
            }}
          />
          <View style={styles.hairline} />

          <View style={styles.save}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => { this.saveEdit(); }}
            >
              <Text style={styles.saveButtonText}>Save your Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ViewContainer>
    );
  }
};
const EditProfileConnected = connect(mapStateToProps, mapDispatchToProps)(EditProfile);

export default EditProfileConnected;
