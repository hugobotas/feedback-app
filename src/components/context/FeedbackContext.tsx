import React, { createContext, useState } from 'react';

interface FeedbackProviderType {
  children: React.ReactNode;
}

interface FeedbackContextType {
  feedback: { id: string; rating: number; text: string }[];
}

const FeedbackContext = createContext<FeedbackContextType | null>(null);

export function FeedbackProvider({ children }: FeedbackProviderType) {
  const [feedback, _setFeedback] = useState([
    {
      id: '1',
      text: 'This item is from context',
      rating: 10,
    },
  ]);
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export default FeedbackContext;
