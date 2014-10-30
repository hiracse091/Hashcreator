/**
 * Created with JetBrains PhpStorm.
 * User: Naher
 * Date: 10/22/13
 * Time: 6:51 PM
 * To change this template use File | Settings | File Templates.
 */
 
cordova.define("cordova/plugin/hashgenerator", function (require, exports, module) {
    var exec = require("cordova/exec");
    module.exports = {
        get: function (message, win, fail) {
            exec(win, fail, "BMSHAHashing", "get", [message]);
        }
    };
});


function gethash(str) {
    var fileTransfer = new FileTransfer();
    var hashcoder = cordova.require("cordova/plugin/hashgenerator");
    hashcoder.get({psw:str},
        function(data) {
            console.log("PhoneGap Plugin: hashgenerator: callback success");
            var hash = data;
            if(hash.length>0){
                console.log('after hashing  -'+hash);
                var val = $("#gerandValue").val().trim() 
                console.log(hash +' , '+val);
                if(val && hash){
                    $('#btnDiv').hide()
                    setStorage('gerantId',val)   
                    if (navigator.onLine){
                        try{
                             /*$.ajax({
                                url: authUrl,
                                data: { GLM_GERANT_ID: val, pass_word : hash} ,
                                success:function(data){
                                    if(data =='TRUE'){                             
                                        console.log("Authentication successfull.");
                                        setStorage('pass',hash)   
                                        try{
                                            if (navigator.onLine){
                                                $('body').append('<div class="laodingWrapper"><div class="loadingDiv"><img id="loading-image" src="image/LoadingIcon.gif" alt="Loading" />'+language[langValue].sync_msg+'</div></div>')                                           
                                                getDBtoStartApp()
                                            }else if(!navigator.onLine){
                                                setStorage('gerantId',0)
                                                $('#mainBody').html('<div  align ="center" class="loginDiv"><div align="center">You are not connected to internet! Connect to internet.<span class="input-label"><div  class="text" onclick="setGerandId()" >Try Again</div></span></div></div>')
                                            }
                                            else{
                                                alert('Something went wrong launching app!')
                                                setGerandId()
                                            }
                                        }
                                        catch(e){
                                            alert('Error in seting gerant ID. Try again.')
                                        }                     
                                    }else{
                                        alert('Authentication failed.')
                                        console.log('Authentication failed.');
                                        setStorage('gerantId',0)
                                        $('#btnDiv').show()
                                    }
                                },
                                error: function(error,timeout){
                                    alert('Error in seting gerant ID. Check internet and Try again.')
                                    $('#btnDiv').show()
                                }
                            });*/
                            $.post( authUrl, {GLM_GERANT_ID:val,pass_word:hash}).done(function( data ) {
                               
                                if(data =='TRUE'){
                                 
                                    console.log("Authentication successfull.");
                                    setStorage('pass',hash)   
                                    try{
                                       //gotoApp()
                                        if (navigator.onLine){
                                            $('body').append('<div class="laodingWrapper"><div class="loadingDiv"><img id="loading-image" src="image/LoadingIcon.gif" alt="Loading" />'+language[langValue].sync_msg+'</div></div>')
                                            //$('.loadingDiv').css('left', (window.innerWidth/2)-210)
                                            //getData()
                                            getDBtoStartApp()
                                        }else if(!navigator.onLine){
                                            setStorage('gerantId',0)
                                            $('#mainBody').html('<div  align ="center" class="loginDiv"><div align="center">You are not connected to internet! Connect to internet.<span class="input-label"><div  class="text" onclick="setGerandId()" >Try Again</div></span></div></div>')
                                        }
                                        else{
                                            alert('Something went wrong launching app')
                                            setGerandId()
                                        }
                                    }
                                    catch(e){
                                        alert('Something went wrong launching app')
                                            setGerandId()
                                    }                     
                                }else{
                                    alert('Authentication failed.')
                                    console.log('Authentication failed.');
                                    setStorage('gerantId',0)
                                    $('#btnDiv').show()
                                }
                            }).fail(function() {
                                alert('Something went wrong launching app')
                                    $('#btnDiv').show()
                              });
                        }catch(e){
                            alert('Something went wrong launching app')
                            setGerandId()
                        }
                    }else{
                        setStorage('gerantId',0)
                        $('#mainBody').html('<div  align ="center" class="loginDiv"><div align="center">You are not connected to internet! Connect to internet.<span class="input-label"><div  class="text" onclick="setGerandId()" >Try Again</div></span></div></div>')
                    } 
                }else{
                    alert('Provide empyt fields values.')
                    $('#btnDiv').show()
                }
            }
        },
        function(error) {   
        return '';         
            console.log("PhoneGap Plugin: hashgenerator: callback error "+error);            
        }
    );
}

