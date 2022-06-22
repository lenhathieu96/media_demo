import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'black',
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
    height,
    backgroundColor: 'black',
    opacity: 0.6,
    position: 'absolute',
    zIndex: 99999,
  },

  placeHolderContainer: {
    width: '100%',
    height: 0.9 * height,
    justifyContent: 'center',
    alignItems: 'center',
  },

  seekbarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: 'white',
  },

  videoPositionContainer: {
    flex: 0.2,
  },

  videoDurationContainer: {
    flex: 0.2,
    alignItems: 'flex-end',
  },

  timerTxt: {
    color: 'white',
  },

  seekbar: {
    flexGrow: 1,
  },
});

export default styles;
