
import OpenAi from "../class/OpenAi";
async function htmlpage(body: any) {
  
 const  prompt = `create a html page similar Kodi program that describe:
 modern headerBar include links other pages, fixed top and responsive",
 modern main ,responsive and min-hight:100vh , include in this main that theme/features : "${body.main?.split("_").join(" ")}",
 modern FooterBar include contacts, link to social media with icons, copyright. 
 pls, the CSS style inside html.
 Response in code html form`

  return await OpenAi.davinci_003(prompt)
}

export default htmlpage;
