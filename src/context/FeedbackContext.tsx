import { createContext, ReactNode, useEffect, useState } from 'react';

interface FeedbackProviderType {
  children: ReactNode;
}

interface FeedbackContextType {
  feedback: { id: number; rating: string; review: string }[];
  deleteFeedback: (id: number) => void;
  addFeedback: (feedback: { rating: string; review: string }) => void;
  editFeedback: (feedback: { rating: string; review: string; id: number }) => void;
  feedbackEdit: { item: { rating: string; review: string; id: number }; edit: boolean };
  updateFeedback: (id: number, newItem: { rating: string; review: string }) => void;
  isLoading: boolean;
}

const FeedbackContext = createContext<FeedbackContextType>({} as FeedbackContextType);

export function FeedbackProvider({ children }: FeedbackProviderType) {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([] as { rating: string; review: string; id: number }[]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {} as { rating: string; review: string; id: number },
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

  function deleteFeedback(id: number) {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  }

  async function addFeedback(newFeedback: { review: string; rating: string }) {
    const response = await fetch('http://localhost:3000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });
    const data = await response.json();
    setFeedback([data, ...feedback]);
  }

  function updateFeedback(id: number, newItem: { review: string; rating: string }) {
    setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...newItem } : item)));
    setFeedbackEdit({
      item: {} as { rating: string; review: string; id: number },
      edit: false,
    });
  }

  function editFeedback(item: { rating: string; review: string; id: number }) {
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
