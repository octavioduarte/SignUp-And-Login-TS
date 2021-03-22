import { LoginControllerRequestType } from "./object";

export interface MakeLogin {
    makeLogin: (propsLogin: LoginControllerRequestType) => Promise<boolean>
}