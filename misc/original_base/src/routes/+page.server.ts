import { superValidate } from "sveltekit-superforms/server";
import { coverLetterSchema } from "$lib/schemas";
import { fail } from "@sveltejs/kit";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "$env/static/private";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export const load = async () => {
  const form = await superValidate(coverLetterSchema);
  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, coverLetterSchema);
    
    if (!form.valid) {
      return fail(400, { form });
    }
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a professional cover letter writer."
          },
          {
            role: "user",
            content: `Generate a cover letter for ${form.data.companyName} with the following requirements:
              Key Points: ${form.data.keyPoints.join(", ")}
              Length: ${form.data.desiredLength} words
              Tone: ${form.data.tone.join(", ")}
              CV Content: ${form.data.cvContent || "Not provided"}`
          }
        ]
      });
      
      return { form, success: true, coverLetter: completion.choices[0].message.content };
    } catch (error) {
      return fail(500, { form, error: "Failed to generate cover letter" });
    }
  }
};