 
export const getFormatedDate=(currDate)=>{
    const date = new Date(currDate);
     return  new Intl.DateTimeFormat('en-US',{year:"numeric", month:"short",day:"2-digit"}).format(date);
     
}

export const getCaptilizeFirstLatter=(input)=>{
  return input.trim().substring(0,1).toUpperCase()+input.trim().substring(1,);
}