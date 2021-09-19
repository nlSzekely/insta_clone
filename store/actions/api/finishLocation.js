import finishLocationReqObj from '../../../utils/apiRequestObjects/finishLocationRequestObj';
import baseApi from './baseApi';
import {setLoading} from '../loadingActions';

const finishLocation = (location, bags) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await baseApi.post('/finish-location', finishLocationReqObj(location, bags));
      if (response) {
        dispatch(setLoading(false));
        return true;
      }
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error('Finish Location request failed');
    }
  };
};

export default finishLocation;
