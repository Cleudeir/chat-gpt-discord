import { ChatCompletionRequestMessageRoleEnum } from "openai";
import OpenAi from "../../openAi";
import { Config, DataUser, Messages, model } from "../../types";
import fs from "fs";
import os from "os";
const userHomeDir = os.homedir();
async function htmlPage(body: any) {
  const message = `
  <body margin:0 padding:0>
  <headerBar width:100%> 
  </headerBar margin:0 padding:5> 
  <div justify-content:stretch  width:100%>
    sideBar: heigh:100% width:20% margin:0 padding:5;
    main: width:80% heigh:100% margin:0 padding:0;
  </div> 
  <FooterBar width:100% margin:0 padding:5>
  </FooterBar>  
  </body> 
    `;

  const content = `You are a front-End developer, create a modern site , create a fake information: Articles ,
   cards and cards images. make a html content style: page scrolling, responsive and pretty, Response in code html form`;
  const config: Config = {
    model: model.gptTurbo003,
    temperature: 0.5,
    max_tokens: 3096,
  };
  const messages: Messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content,
    },
  ];
  const user: string = "htmlPage";
  const data: DataUser = { messages, config };
  const result = await OpenAi.slow(user, message, data);
  fs.writeFileSync(userHomeDir + "/temp/site.html", result);
  return result;
}

export default htmlPage;
