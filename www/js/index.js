/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();*/

var js;
/*function myFunction() {
    var trainNo=document.getElementById("trainnumber").value;
    var date=document.getElementById("date").value;
    var stn=document.getElementById("stfrom").value; 
    var str="https://api.railwayapi.com/v2/live/train/"+trainNo+"/date/"+date+"/apikey/g2ha0kir7f/";
    var js;
    $(document).ready(function(){
    $.getJSON(str, function(data) {
        alert("gya");
        js=data;
    }
    );
    alert(typeof(js));
    for ( var x in js["route"]){ 
        if(js["route"][x]["station"]["code"]==stn){
            alert("aaya");
            alert(js["route"][x]["latemin"]);
        }
        console.log(js["route"][x]);
    }    

    });
    
}*/

$(document).ready(function(){
    //var js;
        $.getJSON("https://api.railwayapi.com/v2/live/train/12346/date/26-03-2018/apikey/g2ha0kir7f/", function(data) {
         js=data;
        }
        );
        /*for ( var x in js["route"]){ 
            if(js["route"][x]["station"]["code"]=="BWN"){
                alert(js["route"][x]["latemin"]);
            }
        }*/    
    });
alert(js);
/*
var js;
$(document).ready(function(){

    $("button").click(function(){
        alert("dabaya");
        var trainNo=document.getElementById("trainnumber").value;
        var date=document.getElementById("date").value;
        var stn=document.getElementById("stfrom").value; 
        var str="https://api.railwayapi.com/v2/live/train/"+trainNo+"/date/"+date+"/apikey/g2ha0kir7f/";
       // var js;
        
        $.getJSON(str, function(data) {
            alert("gya");
            js=data;
        }
        );
        //alert(typeof(js));
        console.log(js);
        for ( var x in js["route"]){ 
            if(js["route"][x]["station"]["code"]==stn){
                alert("aaya");
                alert(js["route"][x]["latemin"]);
            }
            console.log(js["route"][x]);
        }    
        $.getJSON("https://api.railwayapi.com/v2/live/train/12346/date/26-03-2018/apikey/g2ha0kir7f/", function(data) {
         js=data;
        }
        );
        for ( var x in js["route"]){ 
            if(js["route"][x]["station"]["code"]=="BWN"){
                alert(js["route"][x]["latemin"]);
            }
        }    
        });       
            
    });
*/
