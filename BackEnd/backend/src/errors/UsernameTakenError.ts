import { HttpError } from "./httpErr";

export class UsernameTakenError extends HttpError{
    constructor(){
        super(400, 'Username Already Taken')
    }
}