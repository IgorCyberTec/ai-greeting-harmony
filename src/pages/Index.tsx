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
    console.log('Toggling listening state:', !isListening);
  };

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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full">
        <div className="mb-8">
          <SoundWave isActive={isSpeaking} />
        </div>

        <div className="flex justify-center mt-8">
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