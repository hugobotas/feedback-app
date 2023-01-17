import React, { createContext, useState } from 'react';
import feedbackData from '../../data/FeedbackData';

interface FeedbackProviderType {
  children: React.ReactNode;
}

interface FeedbackContextType {
  feedback: { id: string; rating: string; review: string }[];
  deleteFeedback: (id: string) => void;
  addFeedback: (feedback: { rating: string; review: string; id: string }) => void;
  editFeedback: (feedback: { rating: string; review: string; id: string }) => void;
  feedbackEdit: { item: { rating: string; review: string; id: string }; edit: boolean };
  updateFeedback: (id: string, newItem: { rating: string; review: string }) => void;
}

const FeedbackContext = createContext<FeedbackContextType>({} as FeedbackContextType);

export function FeedbackProvider({ children }: FeedbackProviderType) {
  const [feedback, setFeedback] = useState(feedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {} as { rating: string; review: string; id: string },
    edit: false,
  });

  function deleteFeedback(id: string) {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  }

  function addFeedback(newFeedback: { review: string; rating: string; id: string }) {
    setFeedback([newFeedback, ...feedback]);
  }

  function updateFeedback(id: string, newItem: { review: string; rating: string }) {
    setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...newItem } : item)));
    setFeedbackEdit({
      item: {} as { rating: string; review: string; id: string },
      edit: false,
    });
  }

  function editFeedback(item: { rating: string; review: string; id: string }) {
    setFeedbackEdit({
      item,
      edit: true,
    });
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export default FeedbackContext;
