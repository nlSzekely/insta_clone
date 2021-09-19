import finishLocationReqObj from './utils/finishLocationReqObj';
import baseApi from './baseApi';
import {removeFromUnsentLocation, setLoading} from '../redux/actions';
import {BAG_TYPES_ENUM} from '../utils/Constants';

const synchronize = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const {unsentLocations} = getState();
    const promises = unsentLocations.map(
      loc =>
        new Promise((resolve, reject) => {
          baseApi
            .post('/finish-location', finishLocationReqObj(loc.location, loc.bags))
            .then(result => {
              // const collectorBags = loc.bags?.filter((bag) => bag.bagTypeField === BAG_TYPES_ENUM.COLLECTOR && bag?.childBagsField?.some((code) => currentOperation?.bagsField?.includes(code)));
              // collectorbagekre is ugyan ezt megcsinalni

              dispatch(removeFromUnsentLocation(loc.location.locationIDField));
              resolve(result);
            })
            .catch(err => {
              const error = new Error('Sincronizarea rutei nu a reusit');
              reject(error);
            });
        }),
    );

    return Promise.all(promises)
      .then(results => {
        alert('Sincronizare reusita cu server');
        dispatch(setLoading(false));
        return true;
      })
      .catch(err => {
        dispatch(setLoading(false));
        alert(err.message);
        return false;
      });
  };
};

export default synchronize;
