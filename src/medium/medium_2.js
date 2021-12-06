import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
function avgCityMpg() {
    let sum = 0;
    mpg_data.forEach( item => {
        sum += item.city_mpg;
    });
    return sum/mpg_data.length;
}
function avgHwyMpg() {
    let sum = 0;
    mpg_data.forEach( item => {
        sum += item.highway_mpg;
    });
    return sum/mpg_data.length;
}
function yearStats() {
    let array = [];
    mpg_data.forEach( item => {
        array.push(item.year);
    });
    return getStatistics(array);
}
function ratioHybridStats() {
    let sum = 0;
    mpg_data.forEach( item => {
        if(item.hybrid){
            sum++;
        }
    });
    return sum/mpg_data.length;
}
export const allCarStats = {
    avgMpg: {
        city: avgCityMpg(),
        highway: avgHwyMpg()
    },
    allYearStats: yearStats(),
    ratioHybrids: ratioHybridStats(),
};

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
function makerHybridStats() {
    let result = [];
    mpg_data.forEach( item => {
        if(result[item.make]==undefined && item.hybrid) {
            let hybridarray = [];
            hybridarray.push(item.id);
            let temp = {
                make: item.make,
                hybrids: hybridarray
            };
            result.push(temp);
        } else if (result[item.make]!==undefined && item.hybrid) {
            object["hybrids"].push(item.id);
        }
    });
    result.sort(function(a,b) {b.hybrids.length - a.hybrids.length} );
    return result;
}
function avgMpgYearHybrid() {
    let result = {};
    mpg_data.forEach( item => {
        // if the year doesn't exist yet
        if(result[item.year] == undefined){
            result[item.year] = {
                hybrid: {
                    city: [],
                    highway: []
                },
                notHybrid: {
                    city:[],
                    highway:[]
                }
            }
        }
        // input specific mileages based on hybrid or not
        if(item.hybrid) {
            result[item.year]["hybrid"]["city"].push(item.city_mpg);
            result[item.year]["hybrid"]["highway"].push(item.highway_mpg);
        } else {
            result[item.year]["notHybrid"]["city"].push(item.city_mpg);
            result[item.year]["notHybrid"]["highway"].push(item.highway_mpg);
        }
    });
    // convert raw array data into averages
    for(let key in result){
        result[key]["hybrid"]["city"] = getStatistics(result[key]["hybrid"]["city"]).mean;
        result[key]["hybrid"]["highway"] = getStatistics(result[key]["hybrid"]["highway"]).mean;
        result[key]["notHybrid"]["city"] = getStatistics(result[key]["notHybrid"]["city"]).mean;
        result[key]["notHybrid"]["highway"] = getStatistics(result[key]["notHybrid"]["highway"]).mean;
    }
    return result;
}
export const moreStats = {
    makerHybrids: makerHybridStats(),
    avgMpgByYearAndHybrid: avgMpgYearHybrid()
};
