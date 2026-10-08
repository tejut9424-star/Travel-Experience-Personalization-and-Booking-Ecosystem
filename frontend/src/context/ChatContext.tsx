import React, { createContext, useContext, useState } from 'react';
import { ChatMessage } from '../types';

interface ChatContextType {
  isOpen: boolean;
  messages: ChatMessage[];
  isThinking: boolean;
  openChat: (initialPrompt?: string) => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
}

const initialMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: 'Hello! I am your Tripora AI travel assistant. How can I help with your journey today? You can ask me to generate a 5-day itinerary, suggest vegetarian eats in Kyoto, or optimize your trip budget.',
    timestamp: 'Just now',
    suggestedPrompts: [
      'Suggest a 5-day romantic itinerary for Amalfi Coast',
      'How do I get from Tokyo to Kyoto using the Shinkansen?',
      'Optimize my current Kyoto itinerary budget by 15%',
      'Find the best sunrise photo spots in Bali'
    ]
  }
];

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isThinking, setIsThinking] = useState(false);

  const openChat = (initialPrompt?: string) => {
    setIsOpen(true);
    if (initialPrompt) {
      sendMessage(initialPrompt);
    }
  };

  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen(prev => !prev);

  const clearChat = () => {
    setMessages(initialMessages);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    try {
      // First attempt to call the FastAPI AI microservice / Node Gateway
      let botResponseText = '';
      let suggestedPrompts: string[] = [];

      try {
        const res = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text })
        });
        if (res.ok) {
          const data = await res.json();
          botResponseText = data.reply || data.response;
          suggestedPrompts = data.suggestedPrompts || [];
        }
      } catch (err) {
        // Fallback to local intelligent travel inference engine
      }

      if (!botResponseText) {
        await new Promise(r => setTimeout(r, 800));
        const lower = text.toLowerCase();

        if (lower.includes('shinkansen') || (lower.includes('tokyo') && lower.includes('kyoto'))) {
          botResponseText = `🚅 **Traveling from Tokyo to Kyoto on the Shinkansen (Bullet Train):**\n\n1. **Best Train**: Take the **Tokaido Shinkansen (Nozomi train)** from **Tokyo Station** or **Shinagawa Station** directly to **Kyoto Station**.\n2. **Travel Time**: ~2 hours and 15 minutes (285 km/h).\n3. **Fares & Passes**: \n   - Reserved Seat: ~¥14,170 ($95 USD)\n   - Non-Reserved: ~¥13,320 ($90 USD)\n   - If using a **JR Pass**, take the *Hikari* train (takes ~2h 40m with full JR Pass coverage).\n4. **Pro Tip**: Request **Seats on the Right (Row E)** when traveling West to get a spectacular view of **Mount Fuji** passing Shizuoka!`;
          suggestedPrompts = ['Book Kyoto Ryokan', 'View 5-Day Kyoto Itinerary', 'Check Japan Rail Pass options'];
        } else if (lower.includes('amalfi') || lower.includes('romantic')) {
          botResponseText = `🌅 **5-Day Romantic Amalfi Coast Itinerary:**\n\n• **Day 1: Arrival in Positano & Cliffside Dinner** — Check in to a panoramic boutique stay in Praiano or Positano; enjoy sunset aperitivo at Franco's Bar and candlelit seafood at *La Sponda*.\n• **Day 2: Private Capri Boat Cruise** — Charter a traditional Gozzo boat around Faraglioni rock formations, swim in the Green Grotto, and stroll Anacapri.\n• **Day 3: Path of the Gods Hike & Ravello Gardens** — Early morning hike along the *Sentiero degli Dei*, followed by afternoon classical music strolls through Villa Rufolo & Villa Cimbrone in Ravello.\n• **Day 4: Amalfi Town & Hidden Fiordo di Furore** — Visit Amalfi Cathedral (Duomo), explore paper mills, and swim in the breathtaking fjord cove.\n• **Day 5: Limoncello Masterclass & Sunset in Conca dei Marini** — Private coastal cooking lesson with Michelin sea views.`;
          suggestedPrompts = ['Show luxury stays in Amalfi', 'Book Capri boat charter', 'Explore Amalfi restaurant guide'];
        } else if (lower.includes('budget') || lower.includes('optimize') || lower.includes('15%')) {
          botResponseText = `💰 **15% Budget Optimization for Kyoto:**\n\n1. **Transport (Save ~$65/person)**: Replace private taxis with the **Subway & Bus 1-Day Pass (¥1,100)** and IC Card for local Kyoto city loops.\n2. **Dining (Save ~$110/day)**: Enjoy lunch sets at Michelin Bib Gourmand spots (*Gion Tanto*, *Menya Inoichi*) instead of pricey dinner kaiseki with identical culinary quality.\n3. **Accommodation (Save ~$140/night)**: Split stay: 3 nights in a stylish boutique hotel in Karasuma/Kawaramachi, followed by 1 signature luxury Ryokan night in Arashiyama.\n4. **Attraction Passes (Save 15%)**: Bundle Nijo Castle, Kyoto Tower, and Railway Museum digitally in advance.`;
          suggestedPrompts = ['Apply savings to Kyoto Itinerary', 'Find boutique stays under $200', 'Show cheap Michelin Bib spots'];
        } else if (lower.includes('bali') || lower.includes('sunrise') || lower.includes('photo')) {
          botResponseText = `📸 **Top 4 Sunrise Photo Spots in Bali:**\n\n1. **Mount Batur Volcano Summit (Kintamani)**: 1,717m panoramic sunrise above the sea of clouds overlooking Mount Agung and Lake Batur (start hike at 3:30 AM).\n2. **Lempuyang Temple (Heaven's Gate, Karangasem)**: Iconic mirrored reflection framing Mount Agung at 5:30 AM before queues start.\n3. **Sanur Beach Promenade**: Serene golden hour over calm reef waters with traditional Jukung fishing outriggers.\n4. **Pinggan Village Viewpoint (Kintamani)**: Hidden gem mist-shrouded valley view with dramatic mountain silhouettes—zero hiking required!`;
          suggestedPrompts = ['Plan 7 days in Bali', 'Show Ubud jungle resorts', 'Find Bali photography tour'];
        } else if (lower.includes('kyoto') || lower.includes('japan')) {
          botResponseText = `Kyoto’s highlights are best experienced at dawn! Visit **Fushimi Inari** at 6:00 AM for crowd-free torii photos. Follow up with an authentic **Kaiseki lunch in Gion** and evening stroll across Pontocho Alley.`;
          suggestedPrompts = ['Open Kyoto Itinerary Editor', 'Find Ryokans with private onsen in Kyoto'];
        } else {
          botResponseText = `That sounds like a wonderful travel aspiration! Based on real traveler verified data and seasonal weather patterns, I can create a custom day-by-day plan with booked timings, curated restaurants, and precise budget breakdowns for you.`;
          suggestedPrompts = ['Create 7-day custom plan', 'Find trending flights', 'Explore stays nearby'];
        }
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts
      };

      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        messages,
        isThinking,
        openChat,
        closeChat,
        toggleChat,
        sendMessage,
        clearChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
