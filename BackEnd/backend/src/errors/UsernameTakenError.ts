import { HttpError } from "./httpErr";

export class UsernameTakenError extends HttpError{
    constructor(){
        super(405, 'Username Already Taken')
    }
}