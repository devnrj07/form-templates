const CAMPAIGN_UUID = process.env.REACT_APP_CAMPAIGN_UUID || ""
const SIGNUP_URL = process.env.REACT_APP_SIGNUP_URL || ""

type IRequestBody = {
  firstName: string,
  lastName: string,
  email : string,
  password : string
    
}

type IRequest = {
    campaignUuid:string ,
    data: IRequestBody
}

export const signupApiRequest = async (data: IRequestBody)=>{
    console.log('data', data)
    const request = {
        campaignUuid:CAMPAIGN_UUID,
        data
    }
    console.log('Request', request)
    const response = await(await fetch(SIGNUP_URL,{
        'method' : 'POST',
        'body' : JSON.stringify(request)
    })).json()
    return response
}

