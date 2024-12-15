export interface entertainemtData {
    _id: string,
    name: string,
    description: string,
    image: string,
    genera: [string],
    comment: [string]
    rating:number
    totalRatingCount:number

}


export interface commentArray{
   
        id: string,
        commets: string,
        userId: string,

}

export interface userData{
    id: string,
    username:string,
    name: string,
    password: string,
    isAdmin: boolean,
    watchList:[entertainemtData]
    
}