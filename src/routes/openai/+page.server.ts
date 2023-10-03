import { OpenAI } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { Actions } from './$types';

export const actions: Actions = {
    submit: async ({ request }) => {
        const promptFormData = await request.formData();
        const textPrompt = promptFormData.get('text-submission') as string;
        const openai = new OpenAI({apiKey: OPENAI_API_KEY});

        const textResponse = await openai.completions.create({
            model: "text-davinci-003",
            prompt: textPrompt,
            temperature: 0,
            max_tokens: 140,
        });

        return textResponse.choices[0].text
    }
}