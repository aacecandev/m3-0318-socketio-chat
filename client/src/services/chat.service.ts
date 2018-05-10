import { Injectable } from "@angular/core";
import io from 'socket.io-client';

const BASE_URL = "http://localhost:3000";
interface ChatMessage{
  type:string;
  text:string;
}


@Injectable()
export class ChatService {
  socket:any;
  messages:Array<ChatMessage> = new Array();
  constructor(){
    console.log("Constructed Service");
    this.socket = io(BASE_URL);
    this.socket.on('chatmessage', this.receiveMessageFromServer.bind(this));
  }

  private receiveMessageFromServer(msg){
    console.log("MESSAGE RECEIVED");
    console.log(msg);
    this.messages.push({text:msg.message, type:'received'});
  }

  sendMessage(msg){
    console.log(`Sending message: ${msg}`)
    this.socket.emit('chatmessage',{message:msg});
    this.messages.push({text:msg, type:'emitted'});
  }
}
