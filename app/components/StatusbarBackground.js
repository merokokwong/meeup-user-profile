import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  statusbarBackground: {
    height: 20,
  },
});
export default class StatusbarBackground extends Component {
  render() {
    return (
      <View style={styles.statusbarBackground} />
    );
  }
}
