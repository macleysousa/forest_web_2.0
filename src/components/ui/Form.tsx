import React from 'react';

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {}

export const Form: React.FC<FormProps> = (props) => {
  return <form {...props} />;
};
