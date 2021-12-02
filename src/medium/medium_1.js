import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    array.forEach(value => {
        sum += value;
     });
     return sum;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array = array.sort(function(a,b)
    {
        return a-b;
    });
    let midpoint = Math.floor(array.length/2);
    if(array.length%2 !== 0){
        return array[midpoint];
    } 
    return (array[midpoint]+array[midpoint-1]) / 2;

}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let _length = array.length;
    let _sum = getSum(array);
    let _mean = _sum/length;
    let _median = getMedian(array);
    let _min = Math.min(...array);
    let _max = Math.max(...array);
    let _variance = variance(array,_mean);
    let _standard_deviation = Math.sqrt(_variance);
    return {
        length: _length,
        sum: _sum,
        mean: _mean,
        median: _median,
        min: _min,
        max: _max,
        variance: _variance,
        standard_deviation: _standard_deviation

    };


}

