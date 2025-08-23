import { useEffect } from "react";

declare global {
  interface Window {
    botpressWebChat?: any;
  }
}

const BotpressChat = () => {
  useEffect(() => {
    if (window.botpressWebChat) {
      window.botpressWebChat.init({
        configUrl:
          "https://files.bpcontent.cloud/2025/08/22/19/20250822194422-TULGRVSG.json", // 👈 your Botpress config JSON
        // optional settings
        lazySocket: true,
        theme: "prism",
      });
    }
  }, []);

  return <div id="bp-web-widget" />;
};

export default BotpressChat;
