# Angular-Socket-Service

set up the wss url on the service
then Add socketService to the controller and add socketService.Service to the scope to use.

message contains the socket server message

opened its a boolean that has the current connection with the socket server true for connected false for not connected

the service sends the current message and makes a rootscope apply to make the scope on the controller go trough the digest cycle and show the message from the socket server as soon as it gets a new message.

