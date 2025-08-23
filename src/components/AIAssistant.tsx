const handleSendMessage = async () => {
  if (!input.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    type: "user",
    content: input,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setIsTyping(true);

  try {
    // Send message to Botpress
    const res = await fetch("https://api.botpress.cloud/v1/chat/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_BOTPRESS_TOKEN}`, // store in .env
      },
      body: JSON.stringify({
        botId: import.meta.env.VITE_BOTPRESS_BOT_ID,
        conversationId: "my-convo", // can be static or generated
        payload: { type: "text", text: input },
      }),
    });

    const data = await res.json();

    // Botpress response
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: data?.responses?.[0]?.text ?? "Sorry, I didn’t get that.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
  } catch (err) {
    console.error(err);
  } finally {
    setIsTyping(false);
  }
};
