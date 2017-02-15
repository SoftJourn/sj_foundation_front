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
    const gap_size = 3;

    while (num.length > 0)
    {
      formattedValue = formattedValue + " " + num.substring(0, gap_size);
      num = num.substring(gap_size);
    }

  }
  return (
    <span>{formattedValue}</span>
  );
}

CoinsSum.propTypes = {}

export default CoinsSum