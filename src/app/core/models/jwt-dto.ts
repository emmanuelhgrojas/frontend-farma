export class JwtDto {
    token: string;
    type: string;
    nombreusuario: string;
    authorities: string[];

    constructor(token: string, type: string, nombreusuario: string,
        authorities: string[]) {
            this.token = token;
            this.type = type;
            this.nombreusuario = nombreusuario;
            this.authorities = authorities; 
    }
}
