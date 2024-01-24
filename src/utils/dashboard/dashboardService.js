import { API_SERVER } from "config/constant"
import { getMethod, urls } from "utils/url/urls"



export async function noofCompany(){
    try{
        const response = await fetch(`${API_SERVER}${urls.noofCompany}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch(err)
    {
        console.log('noofCompany Error:',err.message)
    }
}