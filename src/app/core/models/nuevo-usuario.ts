export class NuevoUsuario {
    nombreusuario: string;
    email: string;
    password: string;
    estado: string;
    fecha: Date;
    constructor(nombreusuario: string, email: string, password: string,
        estado: string, fecha: Date) {
            this.nombreusuario = nombreusuario;
            this.email = email;
            this.password = password;
            this.estado = estado;
            this.fecha = fecha;      
    }
}
