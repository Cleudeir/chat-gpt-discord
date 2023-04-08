import environment from "../class/Environment";
import { Configuration, OpenAIApi } from "openai";
async function nextjspage(body: any) {
  const configuration = new Configuration({
    apiKey: environment.get("GPT_KEY"),
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `create a 2 files codes and suggest changed a ideal path name when exists Ideal Component Name.
    first file : ./ComponentName/index.js and his content: a  Nextjs 13 page include in this pages that features : "${body.feature}".
    second file : ./ComponentName/index.module.css  and his content: pretty and modern CSS.
    pls, response in code form`,
    temperature: 0.5,
    max_tokens: 2048,
  });
  console.log(response.data.choices[0].text)
  return response.data.choices[0].text
}

export default nextjspage;
