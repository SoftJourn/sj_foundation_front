import React, {PropTypes} from 'react'

const CoinsSum = (props) => {
  const value = props.value;
  let formattedValue = '';
  if (parseInt(value) >= 1000 && props.short) {
    formattedValue = (value / 1000);
    if (value % 1000) {
      formattedValue = formattedValue.toFixed(1) + 'k';
    } else {
      formattedValue += 'k';
    }
  } else {
    let num = value+'';
    const remainder = num.length % 3;
    formattedValue = (num.substr(0, remainder) + num.substr(remainder).replace(/(\d{3})/g, ' $1')).trim();
  }
  return (
    <span>{formattedValue}</span>
  );
}

CoinsSum.propTypes = {}

export default CoinsSum