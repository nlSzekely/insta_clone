import timeTrackReqObj from '../../../utils/apiRequestObjects/timeTrackReqObj';
import baseApi from './baseApi';
import {getNextPersonnelToScan} from '../../../utils';
import {setLoading} from '../loadingActions';

const timeTrack = (barcode, personnelType, routeId, startTracking, personnelCount) => {
  return async (dispatch, getState) => {
    const skipAuth = getState().settingsState.skipAuth;
    if (skipAuth) {
      const result = getNextPersonnelToScan(personnelType, !startTracking, personnelCount);
      return result;
    }
    try {
      dispatch(setLoading(true));
      const result = getNextPersonnelToScan(personnelType, !startTracking, personnelCount);
      console.log('🚀 ~ file: timeTrack.js ~ line 16 ~ return ~ result', result);
      const response = await baseApi.post('/time-track', timeTrackReqObj(barcode, personnelType, routeId, startTracking));
      if (response.data.resultField === 0 || response.data.resultField === 4) {
        dispatch(setLoading(false));
        return result;
      } else {
        const timeTrackResult = {
          0: 'Ok',
          1: 'InvalidCode',
          2: 'AlreadyStarted',
          3: 'NotOnRoute',
          4: 'NotStarted',
        };
        throw new Error(timeTrackResult[response.data.resultField]);
      }
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error(error.message);
    }
  };
};

export default timeTrack;
