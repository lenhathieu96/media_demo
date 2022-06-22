import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
    alignContent: 'flex-end',
    padding: 0,
    margin: 0,
  },

  itemContainer: {
    height: 'auto',
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  controlContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});

export default styles;
