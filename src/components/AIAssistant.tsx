// In your existing component file for the "AI Crowd Assistant"

import React, { useEffect } from 'react';

const AICrowdAssistant = () => {
  useEffect(() => {
    // This function will run once when the component is added to the page.

    // 1. Inject the main Botpress script into the <head>
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v3.2/inject.js';
    script.async = true;
    document.head.appendChild(script);

    // 2. Inject the Botpress initialization script into the <body>
    const initScript = document.createElement('script');
    initScript.id = 'botpress-init-script'; // Add an ID for easy removal
    initScript.innerHTML = `
      window.botpress.on("webchat:ready", () => {
        window.botpress.open();
      });

      window.botpress.init({
        "botId": "d8d70d08-0376-4903-9746-b3f88b2102a6",
        "clientId": "12c36c4c-5cca-42cf-afcc-b2796994d906",
        "configuration": {
          "version": "v1",
          "botName": "Gaurav18 Support Agent",
          "botAvatar": "https://files.bpcontent.cloud/2025/08/22/19/20250822194752-SE9EVYZ7.png",
          "botDescription": "I can help you resolve issues and guide you on how to use the chatbot webhook. If you need help, I’ll let you know which request methods to use.",
          "website": {
            "title": "Website",
            "link": "https://gaurav18.app.n8n.cloud/webhook/chatbot"
          },
          "color": "#3B82F6",
          "variant": "solid",
          "headerVariant": "glass",
          "themeMode": "light",
          "fontFamily": "inter",
          "radius": 2,
          "feedbackEnabled": true,
          "footer": "[⚡ by Botpress](https://botpress.com/?from=webchat)"
        },
        "selector": "#webchat"
      });
    `;
    document.body.appendChild(initScript);

    // 3. Inject the necessary CSS styles into the <head>
    const style = document.createElement('style');
    style.id = 'botpress-styles'; // Add an ID for easy removal
    style.innerHTML = `
      #webchat .bpWebchat {
        position: unset;
        width: 100%;
        height: 100%;
        max-height: 100%;
        max-width: 100%;
      }
      #webchat .bpFab {
        display: none;
      }
    `;
    document.head.appendChild(style);

    // This is a cleanup function. It runs when the component is removed from the page
    // to prevent memory leaks and duplicate scripts if you navigate away and back.
    return () => {
      const initScriptElement = document.getElementById('botpress-init-script');
      const styleElement = document.getElementById('botpress-styles');
      if (initScriptElement) document.body.removeChild(initScriptElement);
      if (styleElement) document.head.removeChild(styleElement);
      // The main inject.js script can usually stay, but you could remove it too if needed.
    };
  }, []); // The empty array [] ensures this effect runs only once.

  // This is the container Botpress will use. The title and other elements
  // from your screenshot should be outside this component, in its parent.
  return (
    <div id="webchat" style={{ width: '100%', height: '600px' }}>
      {/* Botpress will automatically render the chatbot here */}
    </div>
  );
};

export default AICrowdAssistant;
