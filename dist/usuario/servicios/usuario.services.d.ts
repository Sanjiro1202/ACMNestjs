import { Repository } from 'typeorm';
import { usuario } from '../entidades/usuario.entity';
import { crearUsuarioDto, actualizarUsuarioDto } from '../dto/usuario.dto';
export declare class usuarioService {
    private usuarioRepo;
    constructor(usuarioRepo: Repository<usuario>);
    prueba(): string;
    login(correo: string, password: string): Promise<{
        statusCode: number;
        message: string;
        user?: undefined;
        Response?: undefined;
    } | {
        statusCode: number;
        user: usuario[];
        Response: boolean;
        message?: undefined;
    }>;
    crearUsuario(data: crearUsuarioDto): Promise<{
        statusCode: number;
        message: string;
        response?: undefined;
    } | {
        statusCode: number;
        message: string;
        response: usuario;
    }>;
    consultarTodos(): Promise<usuario[]>;
    consultarTodosCedula(cedula: string): Promise<usuario>;
    actualizarUsuario(cedula: string, data: actualizarUsuarioDto): Promise<{
        statusCode: number;
        message: string;
        response: usuario;
    } | {
        statusCode: number;
        message: string;
        response?: undefined;
    }>;
    eliminarUsuario(cedula: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}
