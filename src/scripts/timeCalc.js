const calcTime = (datePosted) => {
  const dateNow = new Date();
  let difference = dateNow - datePosted;
  let timeBetween = 0;
  if (difference - 86400000 > 0) {
    timeBetween = Math.ceil(difference / (1000 * 3600 * 24));
    return `${timeBetween} days ago`;
  } else {
    timeBetween = Math.ceil(difference / (60 * 60 * 1000));
    return `${timeBetween} hr. ago`;
  }
};

export default calcTime;
