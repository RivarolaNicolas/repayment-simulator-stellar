import React from 'react';

const TransactionAlert = (props) => {
  const hidden = props.hidden;
  const alertMessage = props.alertMessage;
  const transactionSuccessful = props.transactionSuccessful;
  return (
    <div>
      <p
        className={
          transactionSuccessful == true
            ? 'text-green-600 bg-green-100 rounded ' + hidden
            : 'text-red-600 bg-red-100 rounded ' + hidden
        }
      >
        {alertMessage}
      </p>
    </div>
  );
};

export default TransactionAlert;
