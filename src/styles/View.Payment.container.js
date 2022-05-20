import {StyleSheet} from 'react-native';
import COLORS from '../common/Color';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  aroundContainer: {
    backgroundColor: 'white',
    marginTop: 15,
  },
  bold: {fontWeight: '500', color: 'black'},
  iconSize: {
    fontSize: 20,
  },
  btnContainer: {
    width: 80,
    backgroundColor: COLORS.backgroundWeak,
    alignItems: 'center',
    borderRadius: 10,
    height: 25,
    justifyContent: 'center',
  },
});
