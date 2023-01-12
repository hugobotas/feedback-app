import React from 'react';

interface CardProps {
  reverse?: boolean;
  children: React.ReactNode;
}

function Card({ children, reverse = false }: CardProps) {
  return <div className={`card ${reverse && 'reverse'}`}>{children}</div>;
}

export default Card;
