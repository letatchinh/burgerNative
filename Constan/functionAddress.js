 export const convertAddressFirst = (address) => {
    let result = '';
    for(let i = 0 ; i <address.length ; i++){
        if(address[i] === ','){
            result=address.slice(0,i)
            break
        }
    }
    return result
}