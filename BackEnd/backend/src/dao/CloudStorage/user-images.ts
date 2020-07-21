import { imageBucket } from ".";

export async function saveProfilePicture(contentType:string, imageBase64Data:string, fileName:string){
    try{
        let newImage = imageBucket.file(fileName)

        await newImage.save(imageBase64Data, {
            metadata:{
                contentType
            }

        })

    }catch (err){
        console.log(err)
        throw err

    }

    
    
}