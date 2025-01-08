import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import SoundWave from '../components/SoundWave';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  const toggleListening = () => {
    setIsListening(!isListening);
    // This would integrate with your Python backend
    console.log('Toggling listening state:', !isListening);
  };

  // Demo effect - in real implementation this would be controlled by the Python backend
  useEffect(() => {
    if (isListening) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Hello! How can I help you today?' }]);
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 3000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isListening]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">AI Assistant</h1>
          <div className="relative">
            <SoundWave isActive={isSpeaking} />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-6 h-[400px] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-600'
                    : 'bg-gray-700'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={toggleListening}
            className={`rounded-full p-6 ${
              isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isListening ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;