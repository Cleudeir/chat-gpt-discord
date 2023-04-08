import OpenAi from "../class/OpenAi";
async function nextjscoder(body: any) {
  
 const  prompt = `create a 2 files codes and suggest changed a ideal path name when exists Ideal Component Name.
 first file : ./ComponentName/index.js and his content: a  Nextjs 13 page include in this pages that features : "${body.feature}".
 second file : ./ComponentName/index.module.css  and his content: pretty and modern CSS.
 pls, response in code form`

  return await OpenAi.davinci_003(prompt)
}

export default nextjscoder;

