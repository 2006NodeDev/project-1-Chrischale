import express, { Response, Request, NextFunction } from 'express'
import { uRouter } from './routers/user-router' 
import { sessionMiddleware } from './middleware/session-middleware'
import { BadCredError } from './errors/Bad CredentialsErr'
import { getUserByUsernamePassword } from './dao/SQL/users-dao'
import { corsFilter } from './middleware/cors-filter'
import { loggingMiddleware } from './middleware/logging-middleware'
import './event-listeners/new-user'
import { userTopic } from './messaging/index'

console.log(userTopic)
// userTopic.then((val) => {
//     console.log(val[0])
// })

const app = express()


//to ensure a body parser is used. <- middleware!
app.use(express.json({limit:'50mb'}))
//increased file size handling to be able to handle images

app.use(loggingMiddleware)

app.use(corsFilter)

// to track server connections
app.use(sessionMiddleware)


app.use('/users', uRouter)

app.get('/health', (req:Request, res:Response) => {
    res.sendStatus(200)
})

//Login Endpoint
app.post('/login', async (req:Request, res:Response, next:NextFunction) => {
    //assign request's username and password to variables to compare
    let uname = req.body.username
    console.log("req.body.username: " + uname)
    let pwd = req.body.password

    if(!(uname || pwd)){
        throw new BadCredError()
    } else {
        try{
            let result_user = await getUserByUsernamePassword(uname,pwd)
            console.log("we hit the index backend")
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








