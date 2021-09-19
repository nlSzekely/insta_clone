import actionTypes from '../../actionTypes';
import beginRouteReqObj from '../../../utils/apiRequestObjects/beginRouteReqObj';
import baseApi from './baseApi';
import {setEndRoute, setCurrentPersonnelToScan} from '../authActions';
import {getCurrentLocAndOpData, sortByOpType, getCurrentPersonnelToScan} from '../../../utils/index';
import {setLoading} from '../loadingActions';
import {SCREEN_NAMES} from '../../../utils/constants';

const setBeginRoute = beginRoute => {
  return {
    type: actionTypes.SET_BEGIN_ROUTE,
    payload: beginRoute,
  };
};

const getBeginRoute = barcode => {
  return async (dispatch, getState) => {
    try {
      const skipAuth = getState().settingsState.skipAuth;
      dispatch(setLoading(true));
      // -------testing only if auth api calls turned off ------------------------
      if (skipAuth) {
        let endRoute = false;
        const data = {
          personnelCountField: 3,
          personnelToScanField: 2,
          dkmEntryNeededField: true,
        };
        const {nextPersonnelToScan, navigateTo} = getCurrentPersonnelToScan(
          endRoute,
          data.personnelCountField,
          data.personnelToScanField,
          data.kmEntryNeededField,
        );
        dispatch(setCurrentPersonnelToScan(nextPersonnelToScan));
        dispatch(setBeginRoute(data));
        dispatch(setLoading(false));
        return {
          navigateTo: navigateTo,
        };
      } else {
        const response = await baseApi.post('/begin-route', beginRouteReqObj(barcode));
        const {data} = response;
        const locations = response?.data?.locationsField;

        if (locations) {

          dispatch(setLoading(false));
          let endRoute = false;
          // sorting operations by operationType------------------------------------
          sortByOpType(locations);
          // evaluating if route has no more locations -------------------------------
          const {currentLocation} = getCurrentLocAndOpData(locations);

          if (!currentLocation) {
            endRoute = true;
            dispatch(setEndRoute(true));
          }
          const {nextPersonnelToScan, navigateTo} = getCurrentPersonnelToScan(
            endRoute,
            data.personnelCountField,
            data.personnelToScanField,
            data.kmEntryNeededField,
          );
          dispatch(setCurrentPersonnelToScan(nextPersonnelToScan));
          dispatch(setBeginRoute(data));
          return {
            navigateTo: navigateTo,
          };
        } else {
          throw new Error('InvalidCode');
        }
      }
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error(error.message);
    }
  };
};

export default getBeginRoute;
