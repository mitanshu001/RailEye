var js;
var acttime;
var actdate;
var stlat, stlng;
var mylat;
var mylng;
var ads;
var stn_time;
var cur_time;
var trn_time;
var final;
var f = 0;
var trn_date;
var pre;
var dif;
var currentdate;
var time;
// var flag = 0;
// var flaginternal = 0;
var refreshIntervalId;

function convert(p1) {
    final = p1.substring(7, ) + '-';
    if (p1.substring(3, 6) == "Jan") {
        final += "01-";
    }
    if (p1.substring(3, 6) == "Feb") {
        final += "02-";
    }
    if (p1.substring(3, 6) == "Mar") {
        final += "03-";
    }
    if (p1.substring(3, 6) == "Apr") {
        final += "04-";
    }
    if (p1.substring(3, 6) == "May") {
        final += "05-";
    }
    if (p1.substring(3, 6) == "Jun") {
        final += "06-";
    }
    if (p1.substring(3, 6) == "Jul") {
        final += "07-";
    }
    if (p1.substring(3, 6) == "Aug") {
        final += "08-";
    }
    if (p1.substring(3, 6) == "Sep") {
        final += "09-";
    }
    if (p1.substring(3, 6) == "Oct") {
        final += "10-";
    }
    if (p1.substring(3, 6) == "Nov") {
        final += "11-";
    }
    if (p1.substring(3, 6) == "Dec") {
        final += "12-";
    }

    final += p1.substring(0, 2);
    return final;


}


function ToMinutes(p1) {
    //return Number(p1.substring(0,2));
    return 60 * parseInt(p1.substring(0, 2)) + parseInt(p1.substring(3, ));
}
document.addEventListener("volumeupbutton", callbackFunction, false);

function callbackFunction() {
    // alert('Volume Up Button is pressed!');
}
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    cordova.plugins.backgroundMode.enable();
/*    cordova.plugins.backgroundMode.setDefaults({
        title: String,
        text: String,
        icon: 'icon' // this will look for icon.png in platforms/android/res/drawable|mipmap
        color: String // hex format like 'F14F4D'
        resume: Boolean,
        hidden: Boolean,
        bigText: Boolean
    });*/
    cordova.plugins.backgroundMode.overrideBackButton();
/*    cordova.plugins.backgroundMode.wakeUp();
// Turn screen on and show app even locked
    cordova.plugins.backgroundMode.unlock();*/
    alert("device ready ho gaya");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            alert("2");
            mylat = pos["lat"];
            mylng = pos["lng"];
        });
    }
    $("button").click(function() {
        var trainNo = document.getElementById("trainnumber").value;
        var date = document.getElementById("date").value;
        var stn = document.getElementById("stfrom").value;
        var str = "https://api.railwayapi.com/v2/live/train/" + trainNo + "/date/" + date + "/apikey/0wzmjhtydk/";
       
        function myfunction() {           
            // //alert("chal gaya behenchod");
           //alert("fukka" +f);
            if (f === 1) {
                //alert("khatam1");
            }else{
            $.getJSON(str).done(function(data) {
                //alert("station me lat lng lene gya");
                js = data;
                for (var x in js["route"]) {
                    if (js["route"][x]["station"]["code"] == stn) {
                        //alert("aya");
                        acttime = js["route"][x]["actdep"];
                        actdate = js["route"][x]["actarr_date"];
                        stlat = js["route"][x]["station"]["lat"];
                        stlng = js["route"][x]["station"]["lng"];
                        // alert(stlat + ", " + stlng + ',' + acttime + ',' + actdate);
                    }
                }
                trn_date = new Date(convert(actdate));
                trn_time = Number(trn_date.getTime()) / 60000 + Number(ToMinutes(acttime));
                currentdate = new Date();
                cur_time = Number(currentdate.getTime()) / 60000 + 330;
                //alert("tominutes " + Number(ToMinutes(acttime)));
                //alert(trn_time + "*********");
                var timeurl = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + String(mylat) + "," + String(mylng) + "&destinations=" + String(stlat) + "," + String(stlng) + "&key=AIzaSyDIA2sanaz4DfVqxcDhVce6ctTholsQaNo";
                $.getJSON(timeurl, function(data) {
                    ads = data;
                    stn_time = Number(ads["rows"][0]["elements"][0]["duration"]["value"]) / 60;
                    // alert("times  " + trn_time + ' , ' + stn_time + ' ,  ' + cur_time);
                    // alert(trn_time - stn_time - cur_time); 
                    time = trn_time - stn_time - cur_time;
                    if (trn_time - stn_time - cur_time <= 10) {
                        // flag = 1;
                        f=1;
                        //alert("Nikal BC");
                        cordova.plugins.notification.local.schedule({
                            title: 'RailEye',
                            text: 'NIkal mc'+trainNo,
                            /*sound:'file://beep-02.wav',*/
                            led: "FFF333",
                            foreground: true
                        });
                        
                    }
                    else if (trn_time - stn_time - cur_time <= 25) {
                        //alert("tyaar hoja BC");
                        cordova.plugins.notification.local.schedule({
                            title: 'GET READY BETICHOD',
                            text: String(time -10) + ' mins left to leave',
                            /*sound:'file://beep-02.wav',*/
                            led: "FFF333",
                            foreground: true
                        });
                        setTimeout(myfunction,300000);
                    }
                    
                    else{
                        cordova.plugins.notification.local.schedule({
                            title: 'Chalega ',
                            text: 'Next notification in '+Number(String(time/2)) +' mins',
                            foreground: true
                        });
                        //alert("vapis chal");
                        setTimeout(myfunction,(time/2)*60*1000);
                    }
                    // flaginternal = 1;
                });

            }).fail(function() {
                cordova.plugins.notification.local.schedule({
                            title: 'Maa chud gyi',
                            text: 'Net nhi chal rha aapka',
                            foreground: true
                });
                // alert("Net nhi chal rha aapka");
            });

        }

          //alert("khatam ho gya bc");
        }
        //window.open("second.html");
        setTimeout(myfunction,0);
    });
}
