import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//Import Libraries Extern
import { io } from "socket.io-client";
//Import Models
import { ResponseRequestInterface } from 'src/app/core/interfaces/responseRequest-interface';
//Import Services
import { NotificationsPushService } from '../notificationsPush/notifications-push.service';
//Import Models
import { GeneralModel } from '../../models/general.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: any;
  baseUrlConnectWithSocketIo = this.generalModel.urlWebSocket || "";

  constructor(
    private _httpClient: HttpClient,
    private notificationsPushService: NotificationsPushService,
    private generalModel: GeneralModel
  ) {

  }

  connectToWebSocketWithTokenUser(accessTokenUser: string):void {
    accessTokenUser = (accessTokenUser) ? accessTokenUser : localStorage.getItem('accessToken') || "";
    if(accessTokenUser){
      this.webSocket = io(this.baseUrlConnectWithSocketIo);
      this.webSocket.on('connect', () => {
        this.webSocket
        .on('authenticated', () => {
          this.notificationsPushService.requestPermission();
        })
        .emit('authenticate', {token: accessTokenUser})
      });
    }
  }

  notificacion(titleAlert: string, contentAlert: string) {
    let notification: Array<any> = [];
    notification.push({
      'title': titleAlert,
      'alertContent': contentAlert
    });
    this.notificationsPushService.generateNotification(notification);
  }

}
