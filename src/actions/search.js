import {createAction} from 'redux-actions';

import RNFetchBlob from 'react-native-fetch-blob';

import {
    SEARCH_TEXT_API_URL,
    SEARCH_FORMULA_IMAGE_API_URL
} from '../consts';

export const SEARCH_WITH_STRING = 'SEARCH_WITH_STRING';
export const SEARCH_WITH_FORMULA_IMAGE = 'SEARCH_WITH_FORMULA_IMAGE';

const searchWithString = createAction(SEARCH_WITH_STRING);
const searchWithFormulaImage = createAction(SEARCH_WITH_FORMULA_IMAGE);

export function fetchSearchWithString(searchText) {
    return async function(dispatch) {
        dispatch(searchWithString());

        try {
            const resp = await fetch(`${SEARCH_TEXT_API_URL}?text=${encodeURIComponent(searchText)}`, {
                method: 'GET'
            });

            const body = await resp.json();
            const {result: {result}} = body;

            dispatch(searchWithString(result));
        }
        catch(e) {
            dispatch(searchWithString(e));
        }
    };
}

export function fetchSearchWithFormulaImage(formulaImage) {
    return async function(dispatch) {
        dispatch(searchWithFormulaImage());

        try {
            const resp = await RNFetchBlob.fetch('POST', SEARCH_FORMULA_IMAGE_API_URL, {
                'Content-Type' : 'multipart/form-data'
            }, [
                { name: 'formulaImage', filename: formulaImage.fileName, type: formulaImage.type, data: RNFetchBlob.wrap('file://'+formulaImage.path)},
            ]);

            const body = await resp.json();
            const {result: {result}} = body;

            dispatch(searchWithFormulaImage(result));
        }
        catch(e) {
            dispatch(searchWithFormulaImage(e));
        }
    }
}