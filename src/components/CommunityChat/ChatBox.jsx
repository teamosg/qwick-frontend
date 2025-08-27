import { Image, Send } from "lucide-react";
import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col ">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* First Message Group */}
        <div className="space-y-2">
          {/* Kwasig's message with emoji */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-full max-w-xs">
              <span>Kwasig 😂😂</span>
            </div>
          </div>

          {/* Kwasig's longer message */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-sm">
              <span>You dey hung dier you kai say house dey</span>
            </div>
          </div>
        </div>

        {/* Other person's messages */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="space-y-1">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-sm">
                <span>Yo mandem</span>
              </div>
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-sm">
                <span>Cho dey house?</span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Message Group */}
        <div className="space-y-2">
          {/* Kwasig's message with emoji */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-full max-w-xs">
              <span>Kwasig 😂😂</span>
            </div>
          </div>

          {/* Kwasig's longer message */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-sm">
              <span>You dey hung dier you kai say house dey</span>
            </div>
          </div>
        </div>

        {/* Other person's messages */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="space-y-1">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-sm">
                <span>Yo mandem</span>
              </div>
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-sm">
                <span>Cho dey house?</span>
              </div>
            </div>
          </div>
        </div>

        {/* Third Message Group */}
        <div className="space-y-2">
          {/* Kwasig's message with emoji */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-full max-w-xs">
              <span>Kwasig 😂😂</span>
            </div>
          </div>

          {/* Kwasig's longer message */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-sm">
              <span>You dey hung dier you kai say house dey</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input Area */}
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Text message"
              className="w-full px-4 py-3 pr-12 bg-gray-100 rounded-full border-none outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
            />

            {/* Image/Attachment Button */}
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors">
              <Image className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
