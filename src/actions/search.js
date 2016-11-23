import {createAction} from 'redux-actions';

export const SEARCH_WITH_STRING = 'SEARCH_WITH_STRING';

const searchWithString = createAction(SEARCH_WITH_STRING);

export function fetchSearchWithString(searchText) {
    return async function(dispatch) {
        dispatch(searchWithString());

        try {
            const result = [
                {
                    _id: 1,
                    url: 'http://test.com/test',
                    title: 'test 1',
                    description: 'description 1'
                },
                {
                    _id: 2,
                    url: 'http://test.com/test2',
                    title: 'test 2',
                    description: 'description 2'
                }
            ];

            await Promise.resolve({
                then: function(resolve) {
                    setTimeout(function() {
                        resolve(true);
                    }, 1000);
                }
            });

            dispatch(searchWithString(result));
        }
        catch(e) {
            dispatch(searchWithString(e));
        }
    };
}