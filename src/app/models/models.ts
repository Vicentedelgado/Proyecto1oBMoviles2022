export interface UserI{
    uid:string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    rol: 'turista' | 'admin' | 'propietario'
}