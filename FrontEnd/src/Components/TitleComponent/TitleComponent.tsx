import React, { FunctionComponent } from 'react'

interface ITitleProps{
    title:string
    size: string
}

export const TitleComponent: FunctionComponent<ITitleProps> = (props) => {
    switch(props.size){
        case 'large':{
            return(
                <h1>{props.title}</h1>
            )

        }
        case 'medium':{
            return(
                <h3>{props.title}</h3>
            )

        }
        case 'small':{
            return(
                <h6>{props.title}</h6>
            )

        } 
        default:{
            return(
                <h2>{props.title}</h2>
            )
        }
    }
}