import {setLoading, setLoadingText} from '../loadingActions';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
const print = content => {
console.log("🚀 ~ file: print.js ~ line 5 ~ content", content)
  return async dispatch => {
    try {
      // checking if bt is enabled
      dispatch(setLoading(true));
      const isEnabledBluetooth = await BluetoothStateManager.getState();
      if (isEnabledBluetooth === 'PoweredOn') {
        // searching for devices
        dispatch(setLoadingText('Scanning for devices...'));
        // const devices = await RNZebraBluetoothPrinter.scanDevices();
        const pairedDevices = await RNZebraBluetoothPrinter.pairedDevices();
        console.log('🚀 ~ file: print.js ~ line 15 ~ print ~ pairedDevices', pairedDevices);
        // // filtering by device name
        const deviceAddress = pairedDevices.find(device => device?.name === 'z325' || device?.name === 'XXZFJ203201762')?.address;

        dispatch(setLoadingText('Connecting to device...'));
        const printResult = await RNZebraBluetoothPrinter.print(deviceAddress, content);
        dispatch(setLoading(false));
        return printResult;
      } else {
        //  turning on bluetooth
        BluetoothStateManager.enable();
        dispatch(setLoadingText('Turning on bluetooth...'));
        // listening on bt state changes
        BluetoothStateManager.onStateChange(bluetoothState => {
          // calling self if bt powered on
          if (bluetoothState === 'PoweredOn') {
            dispatch(print());
          }
        }, true);
      }
    } catch (error) {
      console.log('🚀 ~ file: print.js ~ line 60 ~ print ~ error', error);
      dispatch(setLoading(false));
      throw new Error(error.message);
    }
  };
};

export default print;
