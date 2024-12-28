import jwt from "jsonwebtoken";

import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {

    public static async generateToken(payload: any, duration: string = "2h") {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
                if(error) return resolve(null);

                resolve(token);
            });
        });
    }

    public static validateToken(token: string) {
        throw new Error("Method not implemented.");
    }
}