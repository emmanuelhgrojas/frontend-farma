import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationPush } from '../../interfaces/notificationPush/notifications-push-interface';

@Injectable({
    providedIn: 'root'
  })
export class NotificationsPushService {
    public permission: Permission;

    constructor() {
        this.permission = this.isSupported() ? 'default' : 'denied';
    }
    
    public isSupported(): boolean {
        return 'Notification' in window;
    }
    
    requestPermission(): void {
        let self = this;
        if ('Notification' in window) {
            Notification.requestPermission(function(status) {
                return self.permission = status;
            });
        }
    }
    
    create(title: string, options ? : NotificationPush): any {
        let self = this;
        return new Observable(function(obs) {
            if (!('Notification' in window)) {
                console.log('Las notificaciones no están disponibles en este entorno.');
                obs.complete();
            }
            if (self.permission !== 'granted') {
                console.log("El usuario no le ha concedido permiso para enviar notificaciones push");
                obs.complete();
            }
            let _notify = new Notification(title, options);
            _notify.onshow = function(e) {
                return obs.next({
                    notification: _notify,
                    event: e
                });
            };
            _notify.onclick = function(e) {
                return obs.next({
                    notification: _notify,
                    event: e
                });
            };
            _notify.onerror = function(e) {
                return obs.error({
                    notification: _notify,
                    event: e
                });
            };
            _notify.onclose = function() {
                return obs.complete();
            };
        });
    }
    
    generateNotification(source: Array <any>): void {
        let self = this;
        source.forEach((item) => {
            let options = {
                body: item.alertContent,
                icon: "../../assets/icons/notifications-push-v1_1.png"
            };
            let notify = self.create(item.title, options).subscribe();
        })
    }
}
export declare type Permission = 'denied' | 'granted' | 'default';