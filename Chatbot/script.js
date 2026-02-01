const messageInput = document.querySelector(".message-input");
const chatBody = document.querySelector(".chat-body");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");
const emojiPickerButton = document.querySelector("#emoji-picker");


// API setup
const API_KEY = "AIzaSyAQAdTvbtaNtaNrJoSJBD2e-qTU7s2yS0A"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const userData = {
    message: null,
    file: {
        data: null,
        mime_type: null
    }
}

const chatHistory = [];
const intialInputHeight = messageInput.scrollHeight;

// Create message element with dynamic classes and returns it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}


// Generate bot response using API
const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");

    // Construct the contents parts for the user message (text and optional image)
    const userContentsParts = [{
        text: userData.message
    }];
    if (userData.file.data) {
        userContentsParts.push({
            inline_data: userData.file
        });
    }

    // Add user message to chat history
    chatHistory.push({
        role: "user",
        parts: userContentsParts
    });

    // API request options
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: chatHistory
        })
    }

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();

        // 1. Handle API Error 
        if (data.error) {
            chatHistory.pop(); 
            throw new Error(`API Error: ${data.error.message}`);
        }
        
        // 2. Handle Empty/Invalid Model Response
        if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content || !data.candidates[0].content.parts || data.candidates[0].content.parts.length === 0) {
             chatHistory.pop();
             throw new Error("Model returned no valid content. Check if the message was blocked or empty.");
        }

        // Extract and display bot's response text, safely
        const apiResponseText = data.candidates[0]?.content?.parts[0]?.text?.replace(/\*\*(.*?)\*\*/g, "$1").trim() || "Sorry, I couldn't generate a response.";
        
        messageElement.innerText = apiResponseText;

        // Add bot response to chat history
        chatHistory.push({
            role: "model",
            parts: [{
                text: apiResponseText
            }]
        });

    } catch (error) {
        console.error("Fetch or API Processing Error:", error);
        messageElement.innerText = `An error occurred: ${error.message}`;
        messageElement.style.color = "#ff0000";
    } finally {
        // Clear file data after use
        userData.file = {
            data: null,
            mime_type: null
        };
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({
            top: chatBody.scrollHeight,
            behavior: "smooth"
        });
    }
}

// Handle outgoing user message
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    
    // Only send if there's a message or a file
    if (!userData.message && !userData.file.data) return;

    // Reset input field values
    const currentMessage = userData.message;
    messageInput.value = "";
    messageInput.dispatchEvent(new Event("input")); // Reset textarea height/state

    // Create and display user message
    const messageContent = `<div class="message-text">${currentMessage}</div>
                            ${userData.file.data ? `<img src="${fileUploadWrapper.querySelector("img").src}" class="attachment"/>` : ""}`;
                            
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    
    // Check if the message div needs to be kept (if text was actually sent)
    if(currentMessage) {
        outgoingMessageDiv.querySelector(".message-text").textContent = currentMessage;
    } else {
        // If only a file was sent, remove the empty message-text div
        outgoingMessageDiv.querySelector(".message-text").remove(); 
    }

    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({
        top: chatBody.scrollHeight,
        behavior: "smooth"
    });
    
    // IMPORTANT: Clear file UI AFTER the message is added to chatBody
    fileUploadWrapper.classList.remove("file-uploaded");

    // Simulate bot response with thinking indicator after a delay
    setTimeout(() => {
        const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
              <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
        </svg> 	<div class="message-text">
                <div class="thinking-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>`;

        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({
            top: chatBody.scrollHeight,
            behavior: "smooth"
        });
        generateBotResponse(incomingMessageDiv);
    }, 600)
}

// Handle user key and sending message
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    const canSend = userMessage || userData.file.data;

    if (e.key === "Enter" && canSend && !e.shiftKey && window.innerWidth > 768) {
        handleOutgoingMessage(e);
    }
});

// Adjust input field height dynamically
messageInput.addEventListener("input", () => {
    messageInput.style.height = `${intialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > intialInputHeight ? "15px" : "32px";
});

// Handle file input change and preview the selected file
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    
    // Simple check to ensure it's an image
    if (!file.type.startsWith('image/')) {
        alert("Please select an image file.");
        fileInput.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        fileUploadWrapper.querySelector("img").src = e.target.result;
        fileUploadWrapper.classList.add("file-uploaded");
        
        // Notify the input has changed to enable the send button
        messageInput.dispatchEvent(new Event("input"));

        const base64String = e.target.result.split(",")[1];

        // Store file data in UserData
        userData.file = {
            data: base64String,
            mime_type: file.type
        }
        fileInput.value = ""; 
    };

    reader.readAsDataURL(file);
    
});

// Cancel file upload
fileCancelButton.addEventListener("click", () => {
    userData.file = {
        data: null,
        mime_type: null
    };
    fileUploadWrapper.classList.remove("file-uploaded");
    // Re-trigger input event to correctly hide the send button if message is empty
    messageInput.dispatchEvent(new Event("input")); 
});

// Initialize emoji picker and handle emoji selection
const picker = new EmojiMart.Picker({
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
        const {
            selectionStart: start,
            selectionEnd: end
        } = messageInput;
        // Insert emoji at cursor position
        messageInput.setRangeText(emoji.native, start, end, "end");
        messageInput.focus();
        
        // **********************************************
        // FIX: Remove the picker from the screen immediately after selection
        document.body.classList.remove("show-emoji-picker");
        // **********************************************
        
        // Trigger input to update the send button state and textarea height
        messageInput.dispatchEvent(new Event("input")); 
    },
});

document.querySelector(".chat-form").appendChild(picker);

// Handle emoji button click (Toggles the body class for CSS visibility)
emojiPickerButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.toggle("show-emoji-picker");
});

// Handle send message button click
sendMessageButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    handleOutgoingMessage(e);
});

document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));