const CAMPAIGN_UUID = process.env.REACT_APP_CAMPAIGN_UUID || ""
const EMAIL_VALIDATION_URL = process.env.REACT_APP_VALIDATE_MAIL || ""

type IRequestBody = {
    campaignUuid: string,
    data: {email :string}
}

  
  export const validateEmailRequest = async (email:string)=>{
    const request :IRequestBody = {
        campaignUuid:CAMPAIGN_UUID,
        data:{email}
    }   
    
    const response = await(await fetch(EMAIL_VALIDATION_URL,{
          'method' : 'POST',
          'body' : JSON.stringify(request)
      })).json()
      return response
  }
  
  