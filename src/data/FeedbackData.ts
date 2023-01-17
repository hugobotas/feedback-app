const FeedbackData: FeedbackItemType[] = [
  {
    id: '1',
    rating: '10',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
  },
  {
    id: '2',
    rating: '9',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
  },
  {
    id: '3',
    rating: '8',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
  },
];

export interface FeedbackItemType {
  id: number;
  rating: string;
  review: string;
}

export default FeedbackData;
