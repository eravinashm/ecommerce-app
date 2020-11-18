import { BASE_URL } from './constants/constants';

function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }
  
function json(response) {
    return response.json()
}

export default async function fetchService(api){
  let responseData = null;
  await fetch(`${BASE_URL}${api}`)
  .then(status)
  .then(json)
  .then(function(data){
    responseData = data;
  })
  .catch(function(error){
    console.log(" error in fetchService ", api, error);
  })
  console.log(" fetch ", responseData)
  return responseData;
}
