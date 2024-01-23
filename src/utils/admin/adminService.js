import { API_SERVER } from "config/constant";
import { urls } from "utils/url/urls";


export async function adminLogin(data){
    try{
       const response = await fetch(`${API_SERVER}${urls.adminLogin}`,{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
       });
       const result = await response.json();
       return result;
    }
    catch(err)
    {
        console.log('adminLogin Error:',err.message);
    }
}