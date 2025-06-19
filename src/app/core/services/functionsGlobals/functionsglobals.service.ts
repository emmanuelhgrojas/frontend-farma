//Import Libraries Interns
import { Injectable } from '@angular/core';

//Import Libraries Externs
import Swal, { SweetAlertIcon } from 'sweetalert2'
import { MENSAJES_APP } from '../../constants/mensajes-app';
import { ObjectArchivo } from '../../models/objeto-archivo.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class FunctionsGlobalsService {

        sweetAlert: any;
        codeSuccess: number = 200;
        codeError: number = 400;
        codeWarning: number = 20;
        codeInfo: number = 21;
        codeQuestion: number = 22;

        constructor() { }


        closeAlertRequest(){
                Swal.close();
        }

        showListErrorsMessageRequest(message: string): string {
                let listErrors: Array<string> = [];
                let newMessage = '';
                if(message) {
                        listErrors = message.split(";");
                        (listErrors).map((error, index) => {
                                let separatorError = (index < (listErrors.length - 1)) ? ', ' : '';
                                newMessage += error + separatorError;
                        });
                }
                return newMessage;
        }

        showMessageRequest(typeMessage: number, title: string, message: string, stateRequest: number, callback: any){
                title = (title) ? title : 'Procesando Petición';
                message = (message) ? message : 'Por favor espere...';
                typeMessage = (typeMessage) ? typeMessage : 1;
                callback = (callback) ? callback : () => {};
                let state: SweetAlertIcon = 'error';
                switch(stateRequest){
                        case this.codeSuccess:
                                state = 'success';
                                break;
                        case this.codeError:
                        case 404:
                        case 409:
                                state = 'error';
                                break;
                        case this.codeWarning:
                                state = 'warning';
                                break;
                        case this.codeInfo:
                                state = 'info';
                                break;
                        case this.codeQuestion:
                                state = 'question';
                                break;
                        default:
                                state = 'error';
                                break;
                }

                if(typeMessage == 1){
                        Swal.fire(title, message, state).then(() => { callback(); });
                }else if(typeMessage == 2){                 
                        Swal.fire({
                        title: title,
                        showConfirmButton: false,
                        text: message,
                        imageUrl: './assets/images/spinners/spinner-v1_1.gif',
                        imageWidth: 80,
                        imageHeight: 80,
                        imageAlt: 'Loading...',
                        allowOutsideClick: false,
                        });
                }
        }

        showMessageConsole(mensaje: string, typeMessage: string) {
                switch (typeMessage) {
                        case 'warn':
                                console.warn(mensaje);
                                break;
                }
        }

        showMessageErrorAlert(metodoPrincipal: string, metodoPeticion: string, responseRequestError: any) {
                let mensajeError = (responseRequestError.name == "HttpErrorResponse") ? MENSAJES_APP.errorConnectionRefusedServer : MENSAJES_APP.errorServidor; 
                this.showMessageRequest(1, MENSAJES_APP.tituloError, mensajeError, responseRequestError.status, null);
                this.showMessageConsole(MENSAJES_APP.errorServidor + " MetodoPrincipal => ["+ metodoPrincipal +"] MetodoPeticion => ["+ metodoPeticion +"]", "warn");
        }

        

        completarObjetoFecha(objetoFecha: number){
                return (objetoFecha < 10) ? 0 + objetoFecha : objetoFecha;                
        }

        formatearNgbDatepickerToFecha(fechaNgbDateStruct: NgbDateStruct){
                let monthFull = this.completarObjetoFecha(fechaNgbDateStruct.month);
                let dateFull = this.completarObjetoFecha(fechaNgbDateStruct.day);
                return fechaNgbDateStruct.year + "-" + monthFull + "-" + dateFull;
        }



        completarObjetoFechaString(objetoFecha: number){
                return (objetoFecha < 10) ? "0" + objetoFecha : objetoFecha;                
        }

        formatearNgbDatepickerToFechaString(fechaNgbDateStruct: NgbDateStruct){
                let monthFull = this.completarObjetoFechaString(fechaNgbDateStruct.month).toString();
                let dateFull = this.completarObjetoFechaString(fechaNgbDateStruct.day).toString();
                return fechaNgbDateStruct.year + "-" + monthFull + "-" + dateFull;
        }

        formatearFechaToNgbDatepicker(fechaString:string){
                const fechaDate: Date = new Date(fechaString);
                let monthFull = this.completarObjetoFecha(fechaDate.getMonth()+1);
                let dateFull = this.completarObjetoFecha(fechaDate.getDate());
                return { "year": fechaDate.getFullYear(), "month": monthFull, "day": dateFull }
        }

        formatearFecha(fecha: Date){
                const dt = new Date(fecha);
                const padL = (nr: any, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);            
                return `${dt.getFullYear()}-${padL(dt.getMonth()+1)}-${padL(dt.getDate())}`;
        }

        formatearFechaConHora(fecha: Date){
                const dt = new Date(fecha);
                const padL = (nr: any, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);            
                return `${
                        padL(dt.getMonth()+1)}/${
                        padL(dt.getDate())}/${
                        dt.getFullYear()} ${
                        padL(dt.getHours())}:${
                        padL(dt.getMinutes())}:${
                        padL(dt.getSeconds())}`;
        }

        getFormattedDateTimeWithAmPm(offsetString: string): string | null {
                let offsetInMinutes = 0;

                if (offsetString.trim().toUpperCase() === 'UTC Z') {
                offsetInMinutes = 0;
                } else {
                const match = offsetString.match(/UTC\s*([+-])(\d{2}):(\d{2})/);
                if (!match) return 'Formato inválido';

                const sign = match[1] === '+' ? 1 : -1;
                const hours = parseInt(match[2], 10);
                const minutes = parseInt(match[3], 10);
                offsetInMinutes = sign * (hours * 60 + minutes);
                }

                const now = new Date();
                const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
                const targetTime = new Date(utcTime + offsetInMinutes * 60000);

                const pad = (n: number) => n.toString().padStart(2, '0');

                const year = targetTime.getFullYear();
                const month = pad(targetTime.getMonth() + 1);
                const day = pad(targetTime.getDate());

                let hour = targetTime.getHours();
                const minute = pad(targetTime.getMinutes());
                const second = pad(targetTime.getSeconds());
                const ampm = hour >= 12 ? 'PM' : 'AM';

                hour = hour % 12;
                hour = hour === 0 ? 12 : hour;

                return `${year}-${month}-${day} ${pad(hour)}:${minute}:${second} ${ampm}`;
        }



}
