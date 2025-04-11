import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";
import { UserRole } from "src/enums/user.enum";

export class EditUserDto{
    /**
     * El nombre no debe estar vacío
     * @example nombre_cualquiera
     */
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    name: string

    /**
     * Debe ser un email valido
     * @example  nombre@dominio.com
     */
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    /**
     * La contraseña debe ser mayor a 8 caracteres y debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*
     * @example Contra12@#.123
     */
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,{
        message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*'
    })
    @IsNotEmpty()
    @Length(8,100)
    password: string

    /**
     * Asigna por default al momento de creación del usuario, no se debe incluir en el cuerpo de la petición
     * @default STUDENT
     */
    @IsEmpty()
    role: UserRole
}