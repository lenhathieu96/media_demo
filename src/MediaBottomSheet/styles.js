import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'black',
    alignContent: 'flex-end',
    padding: 0,
    margin: 0,
  },
});

export default styles;
