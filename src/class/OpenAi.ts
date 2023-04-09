import environment from "./Environment";
import { Configuration, OpenAIApi } from "openai";

class OpenAi {
  private openai: OpenAIApi;

  constructor() {
    this.openai = new OpenAIApi(
        new Configuration({
        apiKey: environment.get("GPT_KEY"),
      }));
  }

  async  davinci_003(message: string, temperature?: number, max_tokens?: number) : Promise<string>{
   const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        temperature: temperature || 0.4,
        max_tokens: max_tokens || 1048,
      });
      const result : string | undefined  = response?.data?.choices[0]?.text
      if(result){
        console.log(result);
        return result;
      }else{
        const result : string = "Não consegui entender, repita por favor!"
        return result
      }
  }

  async  turbo(message: string) : Promise<string>{
    const response = await this.openai.createChatCompletion({
         model: "gpt-3.5-turbo",
         messages:[
          {role: "user", content: `${message}`}
         ]       
       });
       const result : string | undefined  = response?.data?.choices[0]?.message?.content
       if(result){
         console.log(result);
         return result;
       }else{
         const result : string = "Não consegui entender, repita por favor!"
         return result
       }
   }
}
export default new OpenAi();
