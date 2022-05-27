import {StyleSheet} from 'react-native';
import COLORS from '../common/Color';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  aroundContainer: {
    backgroundColor: 'white',
    marginTop: 15,
  },
  bold: {fontWeight: '500', color: 'black'},
  iconSize: {
    fontSize: 20,
  },
  textColor: {
    color: 'black',
  },
  btnContainer: {
    width: 80,
    backgroundColor: COLORS.backgroundWeak,
    alignItems: 'center',
    borderRadius: 10,
    height: 25,
    justifyContent: 'center',
  },
  btnCompletePayment: {
    width: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
  },
  addressContain: {
    flex: 1,
    marginStart: 20,
    marginEnd: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  moreAddressContainer: {
    backgroundColor: 'white',
    paddingStart: 20,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    flex: 1,
  },
  optionContainer: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 200,
    borderRadius: 10,
  },
  hiddenItem: {
    flex: 1,
    margin: 10,
    marginTop: 5,
    alignItems: 'flex-end',
  },
  optionsText: {color: 'white', fontWeight: '500'},
});
