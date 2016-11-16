'use strict';
app
  .factory('socketService', function($rootScope, $cookieStore, $interval, $timeout) {
    var wsUrl       = "URLHERE";
    var Service     = {};
    var Handlers    = {};
    var ws;
    Service.message = {};
    var interval    = undefined;
    var reconect    = false;

    Handlers.reconect    = function(){
       $rootScope.$apply(function() {
          Service.opened = false;
        });
      interval       = $interval(function() {
          ws              = new WebSocket(wsUrl);
          ws.onmessage    = Handlers.onmessage;
          ws.onclose      = Handlers.onclose;
          ws.onopen       = Handlers.onopen;
          ws.onerror      = Handlers.onerror;
      }, 5000);
    }

    Handlers.onclose = function(e){
      if (reconect) {
        Handlers.reconect();
      }else{
        reconect = true;
      };
    }

    Handlers.onopen = function(e) {
        reconect = true;
        $rootScope.$apply(function() {
            Service.opened = true;
          });
        $interval.cancel(interval);
        interval = undefined;
    }
    Handlers.onmessage = function(event) {
      console.log(event.data);
        $rootScope.$apply(function() {
          Service.message = event.data;
        });
    }

    Handlers.onerror = function(e){
        reconect();
    }

    var sendMessage = function(message){
       ws.send(message);
    }

    var closeSocket = function(){
        reconect = false;
        ws.close();
    }

    Handlers.connect = function(){
      if (Service.opened === undefined || Service.opened === false) {
        ws              = new WebSocket(wsUrl);
        ws.onmessage    = Handlers.onmessage;
        ws.onclose      = Handlers.onclose;
        ws.onopen       = Handlers.onopen;
        ws.onerror      = Handlers.onerror;
      };
    }



    return {
      closeSocket : closeSocket,
      Handlers    : Handlers,
      Service     : Service,
      sendMessage : sendMessage
    }
  });
