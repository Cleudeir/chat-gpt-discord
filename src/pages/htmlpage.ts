import environment from "../class/Environment";
import { Configuration, OpenAIApi } from "openai";
async function htmlpage(body: any) {
  const configuration = new Configuration({
    apiKey: environment.get("GPT_KEY"),
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `create a html page similar Kodi program that describe:
    modern headerBar include links other pages, fixed top and responsive",
    modern main ,responsive and min-hight:100vh , include in this main that theme/features : "${body.main?.split("_").join(" ")}",
    modern FooterBar include contacts, link to social media with icons, copyright. 
    pls, the CSS style inside html.
    Response in code html form`,
    temperature: 0.4,
    max_tokens: 2048,
  });
  console.log(response.data.choices[0].text)
  return response.data.choices[0].text
}

export default htmlpage;
