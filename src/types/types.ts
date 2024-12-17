export interface entertainemtData {
    _id: string,
    name: string,
    description: string,
    isMovie:boolean,
    image: string,
    genera: [string],
    comment: [string]
    isHidden:boolean,
    rating:number
    totalRatingCount:number

}



export interface commentArray{
   
    _id: string,
    value: string,
    UserName: string,
    entertainemtId:string

}

export interface userDataInterface{
    _id:string,
    isVerified:boolean,
    email: string,
    id: string,
    username:string,
    name: string,
    password: string,
    isAdmin: boolean,
    isBlocked:boolean,
    watchList: [string],
    createdAt:string
    
}


export type params = {
    id:string,
}