// app/api/chatbot/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";

function cleanGeminiText(text: string) {
  if (typeof text !== "string") return "";
  return text
    .replace(/\*/g, "")
    .replace(/\n{2,}/g, "\n\n")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const { GEMINI_API_KEY: apiKey } = process.env;
  const modelName = "gemini-2.0-flash-lite";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing Google AI API key" },
      { status: 500 }
    );
  }

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const files = await getFiles({ types: [], limit: 1000 });
  const totalSpace = await getTotalSpaceUsed();

  const totalSpaceGB = (totalSpace.all / (1024 * 1024 * 1024)).toFixed(2);
  const availableSpaceGB = (
    (totalSpace.all - totalSpace.used) /
    (1024 * 1024 * 1024)
  ).toFixed(2);

  const fileNames = files.documents.map((f: any) => f.name).join(", ");

  // Shared files info
  const sharedFiles = files.documents
    .filter((f: any) => Array.isArray(f.users) && f.users.length > 0)
    .map((f: any) => `${f.name} (shared with: ${f.users.join(", ")})`);

  const sharedFilesInfo =
    sharedFiles.length > 0
      ? `The user has shared the following files: ${sharedFiles.join("; ")}.`
      : "The user has not shared any files.";

  const context = `Your name is Ira .You are an ai assistant for a file management app.You are respectful and provide the answer in clear and consise way. The user has a total storage space of 15 GB, with ${availableSpaceGB} GB available. The user’s files are: ${fileNames}, ${sharedFilesInfo}. Answer questions about their files and storage.`;

  const prompt = `Context: ${context}\nUser: ${message}\nAssistant:`;
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const generativeModel = genAI.getGenerativeModel({ model: modelName });
    const result = await generativeModel.generateContent(prompt);
    const response = result.response.text();
    const cleanedResponse = cleanGeminiText(response);
    return NextResponse.json({ response: cleanedResponse });
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
