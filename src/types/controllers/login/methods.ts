import { LoginControllerRequestType, MakeLoginResponse } from "./object";

export interface MakeLogin {
    makeLogin: (propsLogin: LoginControllerRequestType) => Promise<MakeLoginResponse>
}