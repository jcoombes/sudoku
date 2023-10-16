import { OpenAI } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { Actions } from './$types';

export const actions: Actions = {
    submit: async ({ request }) => {
        const promptFormData = await request.formData();
        const textPrompt = promptFormData.get('text-submission') as string;
        const openai = new OpenAI({apiKey: OPENAI_API_KEY});
        const messages = [{ role: "system", content: "You are a helpful assistant." }, {role: "user", content: textPrompt}]


        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            messages: messages,
            stream: true,
        });

        for await (const part of stream) {
            process.stdout.write(part.choices[0]?.delta?.content || "");
        }

        return null



        //  chatCompletion = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo-16k",
        //     messages: messages,
        //     temperature: 0,
        //     max_tokens: 280,
        // });

        // return textResponse.choices[0].message;
    }
}
// async function main() {
//   const stream = await openai.chat.completions.create({
//     model: 'gpt-4',
//     messages: [{ role: 'user', content: 'Say this is a test' }],
//     stream: true,
//   });
//   for await (const part of stream) {
//     process.stdout.write(part.choices[0]?.delta?.content || '');
//   }
// }

// main();