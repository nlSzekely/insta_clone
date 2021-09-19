import updateRouteParamReqObj from '../../../utils/apiRequestObjects/updateRouteParamObj';
import baseApi from './baseApi';
import {setLoading} from '../loadingActions';
const updateRouteParam = (routeId, start, km) => {
  return async (dispatch, getState) => {
    const skipAuth = getState().settingsState.skipAuth;

    if (skipAuth) {
      return true;
    }
    try {
      dispatch(setLoading(true));
      const response = await baseApi.post('/update-route-param', updateRouteParamReqObj(routeId, start, km));
      dispatch(setLoading(false));
      return true;
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error(error.message);
    }
  };
};

export default updateRouteParam;
