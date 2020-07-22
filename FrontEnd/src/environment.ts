

export let p1BaseUrl:string
if(process.env['NODE_ENV'] === 'production'){
    p1BaseUrl='http://35.190.10.193'

}else{
    p1BaseUrl='http://localhost:2020'
}