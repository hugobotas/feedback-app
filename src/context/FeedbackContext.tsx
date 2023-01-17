import React, { createContext, useEffect, useState } from 'react';

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
  isLoading: boolean;
}

const FeedbackContext = createContext<FeedbackContextType>({} as FeedbackContextType);

export function FeedbackProvider({ children }: FeedbackProviderType) {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([] as { rating: string; review: string; id: string }[]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {} as { rating: string; review: string; id: string },
    edit: false,
  });

  useEffect(() => {
    fetchFeedback().then();
  }, []);

  async function fetchFeedback() {
    const response = await fetch('http://localhost:3000/feedback?_sort=id&_order=desc');
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  }

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
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export default FeedbackContext;
