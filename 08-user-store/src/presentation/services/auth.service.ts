import { bcryptAdapter, JwtAdapter } from "../../config";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserModel } from "../../data";

export class AuthService {

    constructor() {}

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email });

        if(existUser) throw CustomError.badRequest("Email already exists");

        try {
            const user = new UserModel(registerUserDto);
            
            // Encriptar la contraseña
            user.password = bcryptAdapter.hash(registerUserDto.password);

            await user.save();

            // JWT para mantener la autenticación del usuario

            // Email de confirmación

            const { password, ...userEntity } = UserEntity.fromObject(user);

            return {
                user: userEntity,
                token: "ABC"
            };
        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {
        const user = await UserModel.findOne({ email: loginUserDto.email });

        if(!user) throw CustomError.badRequest("Email not exists");

        const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);

        if(!isMatching) throw CustomError.badRequest("Password is not valid");

        const { password, ...userEntity } = UserEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({ id: user._id });

        if(!token) throw CustomError.internalServer("Error while creating JWT");

        return {
            user: userEntity,
            token
        };
    }
}