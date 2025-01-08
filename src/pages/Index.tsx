import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import axios from 'axios';
import SoundWave from '../components/SoundWave';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const { toast } = useToast();

  const sendMessageToBackend = async (userInput: string) => {
    try {
      console.log('Sending message to backend:', userInput);
      const response = await axios.post('http://127.0.0.1:8000/api/assistant', {
        user_input: userInput
      });
      console.log('Received response:', response.data);
      return response.data.response;
    } catch (error) {
      console.error('Error communicating with backend:', error);
      toast({
        title: "Error",
        description: "Failed to communicate with the assistant. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  const toggleListening = async () => {
    setIsListening(!isListening);
    console.log('Toggling listening state:', !isListening);
    
    if (!isListening) {
      // Simulating user input for now - replace with actual speech recognition later
      const userInput = "Hello, how can you help me?";
      setMessages(prev => [...prev, { role: 'user', content: userInput }]);
      
      setIsSpeaking(true);
      const response = await sendMessageToBackend(userInput);
      if (response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
      setIsSpeaking(false);
    }
  };

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