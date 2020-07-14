import { HttpError } from "./httpErr";

export class TypeError extends HttpError{
    constructor(){
        super(400, 'Please Fill Out Appropriate Types')
    }
}