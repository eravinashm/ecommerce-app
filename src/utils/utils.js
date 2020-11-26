export function validate(val){
    if(val != undefined && val != null && val != "")
        return true;
    return false;
}