import { API_SERVER } from 'config/constant';
import { getMethod, postMethod, putMethod , deleteMethod, putFormDataMethod, postFormDataMethod,urls} from 'utils/url/urls';
const person = localStorage.getItem('user');
const user = JSON.parse(person);

export async function addGameAsset(data, onProgress,type='') {
    try {
      
      const person = localStorage.getItem('user');
      const user = JSON.parse(person); 
      let routeType = '';
     
      if(type == "welcome"){
        routeType = urls.addgameassetwelcome; 
      }else if(type == "thankyou"){
        routeType = urls.addgameassetthankyou;
      }else if(type == "badge"){
        routeType = urls.addgameassetbadge;
      }else if(type == "reflection"){
        routeType = urls.addgameassetreflection;
      }else if(type == "completion"){
        routeType = urls.addgameassetcompletion;
      }else if(type == "leaderboard"){
        routeType = urls.addgameassetleaderboard;
      }else if(type == "takeaway"){
        routeType = urls.addgameassettakeaway;
      }else if(type == "audios"){
        routeType = urls.addgameassetaudio;
      }else{
        routeType = urls.addgameassetbackground; 
      }  
      console.log('typeupload1',type);
      console.log('routeType',routeType);
      console.log('Request URL:', `${API_SERVER}${routeType}`);
      const response = await fetch(`${API_SERVER}${routeType}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: user?.token,
        },
        body: data,
      });
      if (!response.ok) {
        console.error('Response Status:', response.status);
        const errorText = await response.text();
        console.error('Error Message:', errorText);
      } else {
        const result = await response.json();
        console.log('result123', result);
        return result;
      }
     
    } catch (err) {
      console.log('addgameAsset Error:', err);
    }
  }
export async function updateGameAsset(data, id,type = '') {
    try {
      const person = localStorage.getItem('user');
      const user = JSON.parse(person);
      let routeType = '';
      if(type == "welcome"){
        routeType = urls.updategameassetwelcome 
      }else if(type == "thankyou"){
        routeType = urls.updategameassetthankyou;
      }else if(type == "badge"){
        routeType = urls.updategameassetbadge;
      }else if(type == "reflection"){
        routeType = urls.updategameassetreflection;
      }else if(type == "completion"){
        routeType = urls.updategameassetcompletion;
      }else if(type == "leaderboard"){
        routeType = urls.updategameassetleaderboard;
      }else if(type == "takeaway"){
        routeType = urls.updategameassettakeaway;
      }else if(type == "audios"){
        routeType = urls.updategameassetaudio;
      }else{
        routeType = urls.updategameassetbackground; 
      }      
      const response = await fetch(`${API_SERVER}${routeType}/${id}`, putFormDataMethod(data));
  
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('addgameAsset Error:', err);
    }
  }
export async function deleteGameAsset(id, type='') {
    try {
      const person = localStorage.getItem('user');
      const user = JSON.parse(person); 
      let routeType = '';
      if(type == "welcome"){
        routeType = urls.deletegameassetwelcome 
      }else if(type == "thankyou"){
        routeType = urls.deletegameassetthankyou;
      }else if(type == "badge"){
        routeType = urls.deletegameassetbadge;
      }else if(type == "reflection"){
        routeType = urls.deletegameassetreflection;
      }else if(type == "completion"){
        routeType = urls.deletegameassetcompletion;
      }else if(type == "leaderboard"){
        routeType = urls.deletegameassetleaderboard;
      }else if(type == "takeaway"){
        routeType = urls.deletegameassettakeaway;
      }else if(type == "audios"){
        routeType = urls.deleteaddgameassetaudio;
      }else{
        routeType = urls.deletegameassetbackground 
      }    
      const response = await fetch(`${API_SERVER}${routeType}/${id}`, getMethod);
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('deletegameAsset Error:', err);
    }
  }

  export async function getGameAssets(type ="") {
    try {
      const person = localStorage.getItem('user');
      const user = JSON.parse(person);   
      let routeType = '';
      if(type == "welcome"){
        routeType = urls.getgameWelcomeasset; 
      }else if(type == "thankyou"){
        routeType = urls.getgamethankyouasset;
      }else if(type == "badge"){
        routeType = urls.getgamebadgeasset;
      }else if(type == "reflection"){
        routeType = urls.getgamereflectionasset;
      }else if(type == "completion"){
        routeType = urls.getgamecompletionasset;
      }else if(type == "leaderboard"){
        routeType = urls.getgameleaderboardasset;
      }else if(type == "takeaway"){
        routeType = urls.getgametakeawayasset;
      }else if(type == "audios"){
        routeType = urls.getaddgameaudio;
      }else{
        routeType = urls.getgamebackgroundasset; 
      } 
      const response = await fetch(`${API_SERVER}${routeType}`, getMethod);
  
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('getgameAsset Error:', err);
    }
  }

  export async function fetchImageBlob(data){
    try{
      const person = localStorage.getItem('user');
      const user = JSON.parse(person);    
      const response = await fetch(`${API_SERVER}${urls.getgameassetimage}`, postMethod(data));
      return response; 
    }
    catch(err){
      console.log('getgameAsset Error:', err);
    }
  }