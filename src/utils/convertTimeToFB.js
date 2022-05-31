export default function converTimeToFB(time) {
  const timeStampDate = time;
  const dateInMillis = timeStampDate.seconds * 1000;

  let date =
    new Date(dateInMillis).toDateString() +
    ' at ' +
    new Date(dateInMillis).toLocaleTimeString();
  return date;
}
