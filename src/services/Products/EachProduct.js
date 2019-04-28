import {BASE_URL} from '../../constants/constants';

function status(response){
    if(response.status >=200 && response.status <300){
        return Promise.resolve(response);
    }else{
        return Promise.reject(new Error(response.statusText));
    }
}
function json(response){
    return response.json();
} 
const EachProduct = async(id) => {
    let responseData = null;
    await fetch(BASE_URL+'products/'+id)
        .then(status)
        .then(json)
        .then(function(data){
            responseData = data;
        }).catch(function(error){
            console.log('Request failed', error);
        })
        return responseData;
}

export default EachProduct;