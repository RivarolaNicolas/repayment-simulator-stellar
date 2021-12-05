import React from 'react';

const TransactionAlert = (props) => {
  const alertColor = props.alertColor;
  const hidden = props.hidden;
  const alertMessage = props.alertMessage;

  return (
    <div>
      <p className={'text-' + alertColor + '-600 bg-' + alertColor + '-100 rounded ' + hidden}>
        {alertMessage}
      </p>
    </div>
  );
};

export default TransactionAlert;
