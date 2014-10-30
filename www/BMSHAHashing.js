/**
 * Created with sublime text.
 * User: Naher
 * Date: 10/30/14
 * Time: 11:20 PM
 */
 


var hashcreator = {
    get: function(parmas,successCallback, errorCallback) {
        cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'BMSHAHashing', // mapped to our native Java class called "BMSHAHashing"
            'get', // with this action name
            [parmas]
        ); 
     }
}
module.exports = hashcreator;