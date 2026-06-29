import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { CHATBOT_SYSTEM_PROMPT } from "@/lib/constants";


interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || "dummy",
  });

  try {
    const { messages }: { messages: Message[] } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Keep only last 10 messages for context window management
    const contextMessages = messages.slice(-10);

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: CHATBOT_SYSTEM_PROMPT,
      messages: contextMessages,
    });

    const content = response.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 });
    }

    return NextResponse.json({ message: content.text });
  } catch (error: unknown) {
    console.error("Chatbot API error:", error);
    // Handle missing API key gracefully
    if (error instanceof Error && error.message?.includes("API key")) {
      return NextResponse.json({
        message: "The AI chatbot is not configured yet. Please check the contact form to reach Bhavya directly!",
      });
    }
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
