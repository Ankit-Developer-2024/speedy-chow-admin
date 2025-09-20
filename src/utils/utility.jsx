 
export const getFormatedDate=(currDate)=>{
    const date = new Date(currDate);
     return  new Intl.DateTimeFormat('en-US',{year:"numeric", month:"short",day:"2-digit"}).format(date);
     
}

export const getCaptilizeFirstLatter=(input)=>{
  return input.trim().substring(0,1).toUpperCase()+input.trim().substring(1,);
}

export const getImageUrlFromBuffer=(buffer,imageType)=>{
   const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64String = btoa(binary);

  return `data:${imageType};base64,${base64String}`;
  // const base64String = btoa(String.fromCharCode(...new Uint8Array(base64)));
  // return `data:${imageType};base64,${base64String}`
}