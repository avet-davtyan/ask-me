export const generateContextualPrompt = (
  similarRecords: {id: string, text: string}[],
): string => {
  const recordsText = similarRecords
    .map(record => `ID: ${record.id}\nText: ${record.text}`)
    .join("\n\n");

  return `You are an AI assistant that answers questions based on provided context documents. You have been given the top ${similarRecords.length} most similar text records to help answer the user's question.

CONTEXT DOCUMENTS:
${recordsText}

INSTRUCTIONS:
1. Answer the user's question using the information from the provided context documents
2. You may rephrase and synthesize the information as needed
4. If the context doesn't contain enough information to fully answer the question, say so and provide what information you can
5. Be concise but comprehensive in your response`;
};
