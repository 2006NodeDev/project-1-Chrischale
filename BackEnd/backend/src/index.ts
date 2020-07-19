import express, { Response, Request, NextFunction } from 'express'
import { uRouter } from './routers/user-router' 
import { sessionMiddleware } from './middleware/session-middleware'
import { BadCredError } from './errors/Bad CredentialsErr'
import { getUserByUsernamePassword } from './dao/users-dao'
import { corsFilter } from './middleware/cors-filter'
import { loggingMiddleware } from './middleware/logging-middleware'


const app = express()


//to ensure a body parser is used. <- middleware!
app.use(express.json())

app.use(loggingMiddleware)

app.use(corsFilter)

// to track server connections
app.use(sessionMiddleware)


app.use('/users', uRouter)



//Login Endpoint
app.post('/login', async (req:Request, res:Response, next:NextFunction) => {
    //assign request's username and password to variables to compare
    let uname = req.body.username
    let pwd = req.body.password
    console.log("login request sent from: " + uname)

    if(!(uname || pwd)){
        throw new BadCredError()
    } else {
        try{
            console.log("hellooooooooo we are in the try block")
            let result_user = await getUserByUsernamePassword(uname,pwd)
            req.session.user = result_user
            res.json(result_user)

        }catch (err){
            next(err)

        }        
    }    

  
})




app.use((err, req, res, next) => {
    if (err.statusCode){
        res.status(err.statusCode).send(err.message)
    }else{
        console.log(err)
        res.status(500).send('Something Went Wrong')

    }
})


app.listen(2020, ()=>{
    console.log("Server has started")
})








