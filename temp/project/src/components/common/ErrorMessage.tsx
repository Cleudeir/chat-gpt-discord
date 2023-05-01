import React from "react";

type Props = {
  messageError: string;
};

const ErrorMessage: React.FC<Props> = ({ messageError }) => (
  <div className="bg-red-200 p-4 rounded-md mt-4">
    <p className="text-red-700 font-medium">{messageError}</p>
  </div>
);

export default ErrorMessage;
