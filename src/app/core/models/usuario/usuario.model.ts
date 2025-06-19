import { UsuarioInterface } from "../../interfaces/usuario/usuario-interface";

export class UsuarioModel implements UsuarioInterface{
    usuaRegistId: string;
    usuaId: string;
	usuaEmail: string;
	usuaEstado: string;
	usuaFecha: string;
	usuaPassword: string;
	usuaUsername: string;
	usuaNombres: string;
	usuaApellidos: string;
    usuaNumeroIdentificacion: string;
    usuaTipoIdentificacion: any;
    rolId: string;

    constructor(){
        this.usuaRegistId = "";
        this.usuaId = "";
        this.usuaEmail = "";
        this.usuaEstado = "";
        this.usuaFecha = "";
        this.usuaPassword = "";
        this.usuaUsername = "";
        this.usuaNombres = "";
        this.usuaApellidos = "";
        this.usuaNumeroIdentificacion = "";
        this.usuaTipoIdentificacion = "";
        this.rolId = "";
    }
}