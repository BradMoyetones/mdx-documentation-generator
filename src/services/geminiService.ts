import { GoogleGenAI } from "@google/genai";
import type { ProjectData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function buildPrompt(data: ProjectData): string {
  const backendStackList = data.backendStack.filter(f => f.trim() !== '').map(f => `- **${f.split(':')[0].trim()}**: ${f.split(':').slice(1).join(':').trim() || 'Not specified'}`).join('\n');
  const frontendStackList = data.frontendStack.filter(f => f.trim() !== '').map(f => `- **${f.split(':')[0].trim()}**: ${f.split(':').slice(1).join(':').trim() || 'Not specified'}`).join('\n');
  const benefitsList = data.benefits.filter(f => f.trim() !== '').map(f => `- **${f.split(':')[0].trim()}**: ${f.split(':').slice(1).join(':').trim() || 'Not specified'}`).join('\n');
  
  const featureCards = data.mainFeatures.filter(f => f.title.trim() !== '' && f.description.trim() !== '').map(f => `
  <Card>
    <CardContent>
      <CardTitle className="mb-2">
        ${f.title}
      </CardTitle>
      <CardDescription>
        ${f.description}
      </CardDescription>
    </CardContent>
  </Card>
`).join('\n');


  return `
You are an expert technical writer specializing in creating clear, concise, and engaging documentation for internal software projects using a Next.js framework (fumadocs) with custom MDX components.

Your task is to generate an introductory MDX file for a project based on the details provided. The output must follow the required MDX structure and components, but you must improve and expand the content with professional, creative, and well-written technical language. Reformulate the ideas instead of copying them literally, correcting grammar, clarity, and coherence when needed.

**Project Details to Document:**
* **Name:** ${data.name}
* **Description (for frontmatter):** ${data.description}
* **Problem Statement:** ${data.problemStatement}
* **Implemented Solution:** ${data.solution}
* **Backend Stack:**
${backendStackList}
* **Frontend Stack:**
${frontendStackList}
* **Feature Cards:**
${data.mainFeatures.map(f => `- ${f.title}: ${f.description}`).join('\n')}
* **Benefits:**
${benefitsList}

**MDX Generation Instructions & Structure:**
Your output MUST be a single, valid MDX file. Do NOT include any explanations or text outside the MDX content. Follow the section structure EXACTLY, while the written content inside each section can be enhanced, reorganized, or expanded to improve readability and technical accuracy.

1.  **Frontmatter:** Create a YAML frontmatter block.
    \`\`\`mdx
    ---
    title: ${data.name}
    description: ${data.description}
    ---
    \`\`\`

2.  **Project Description Section:**
    *   Create a section: \`## Descripción del Proyecto\`
    *   Write a compelling paragraph based on the "Implemented Solution".

3.  **Previous Problem Section:**
    *   Create a section: \`## Problemática Anterior\`
    *   Write a paragraph based on the "Problem Statement".
    *   **Crucially**, wrap a summary of the key problems in a \`<Callout>\` component. Use a warning/yellow style. Example: \`<Callout className="mt-6 mb-6 border-yellow-600 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950 [&_code]:bg-yellow-100 dark:[&_code]:bg-yellow-900">\`

4.  **Implemented Solution Section:**
    *   Create a section: \`## Solución Implementada\`
    *   Write a paragraph elaborating on the "Implemented Solution", perhaps in a more list-oriented format.

5.  **Tech Stack Section:**
    *   Create a section: \`## Stack Tecnológico\`
    *   Create a subsection: \`### Backend\` and list the backend technologies provided.
    *   Create a subsection: \`### Frontend\` and list the frontend technologies provided.

6.  **Main Features Section:**
    *   Create a section: \`## Características Principales\`
    *   Use the exact following structure to display the features as cards:
        \`\`\`mdx
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          ${featureCards}
        </div>
        \`\`\`

7.  **Benefits Section:**
    *   Create a section: \`## Beneficios\`
    *   List the benefits provided.

8.  **Next Steps Section:**
    *   Create a section: \`## Próximos Pasos\`
    *   Include this EXACT placeholder content to guide the user:
        \`\`\`mdx
        <Steps>
          <Step>Explorar la API</Step>
          Conoce todos los endpoints disponibles en la <Link href="/${data.name.toLowerCase()}/docs/api">documentación de la API</Link>.

          <Step>Revisar el Frontend</Step>
          Descubre la arquitectura y componentes del frontend en la <Link href="/${data.name.toLowerCase()}/docs/front-end">documentación del Frontend</Link>.

          <Step>Guías de Usuario</Step>
          Consulta las guías específicas para cada rol de usuario en el sistema.
        </Steps>
        \`\`\`
`;
}

export async function generateMdxDocumentation(data: ProjectData): Promise<string> {
  if (!data.name || !data.description) {
    throw new Error('Project name and description are required.');
  }

  const prompt = buildPrompt(data);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.6, 
      }
    });
    // Post-processing to remove the initial 'mdx\n' and final '`' from the code block
    let text = response.text;
    if (text?.startsWith('```mdx')) {
      text = text.substring(5);
    }
    if (text?.endsWith('```')) {
        text = text.slice(0, -3);
    }
    return text?.trim() || "";

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate documentation from AI service.");
  }
}
