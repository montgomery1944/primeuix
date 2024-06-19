import isNotEmpty from './isNotEmpty';

/**
 * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
 * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
 */
export default function findLastIndex(arr, callback) {
    let index = -1;

    if (isNotEmpty(arr)) {
        try {
            index = arr.findLastIndex(callback);
        } catch {
            index = arr.lastIndexOf([...arr].reverse().find(callback));
        }
    }

    return index;
}
