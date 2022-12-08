import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// TODO: add filters for adjectives to be inserted into the base prompt
const createPrompt = (req: any) => {
  let base = `Generate a specific, formal reason to work from home just for today. Inspire ideas from the Good Excuses list, but it can be anything. Do not return a reason that sounds like whats listed in bad excuses. Use the criteria to learn to form reasons.
    
    Good Excuses: ${req.goodExcuses}

    Bad Excuses: ${req.badExcuses}
    `;

  return base;
};

const generate = async (req: any, res: any) => {
  console.log(JSON.stringify(req.body));
  const input = createPrompt(req.body);
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `${input}\n`,
      max_tokens: 250,
      temperature: 0.9,
    });
    const result = completion.data.choices[0].text;
    return res.status(200).json({ output: result });
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

export default generate;
