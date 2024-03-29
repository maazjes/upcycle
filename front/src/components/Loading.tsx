import { View, StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { dpw } from 'util/helpers';
import Text from './Text';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flexGrow: 1
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  spinnerContainer: {
    marginVertical: height / 3,
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    marginTop: dpw(0.02)
  }
});

const Loading = (): JSX.Element => (
  <View style={styles.container}>
    <View style={styles.spinnerContainer}>
      <ActivityIndicator color="#00ff00" size="large" />
      <Text style={styles.text}>Loading</Text>
    </View>
  </View>
);

export default Loading;
