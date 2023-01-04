export const imageUrl = "http://localhost:3000/images/";
export const apiUrl = "https://localhost:5001/api/";
export function convertDateTo1(date){
    if(date!==''){
        var a = date.split('/');
        return a[2]+"-"+a[1]+"-"+a[0];
    }
}
export function convertDate(date){
    if(date!==undefined && date instanceof Date){
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    }
    return "";
}
export function convertDate2(date){
    if(date!==undefined && date instanceof Date){
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    }
    return "";
}

