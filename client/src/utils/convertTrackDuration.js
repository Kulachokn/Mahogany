export const convertTrackDuration = (duration) => {
  const minutes = Math.floor(duration / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
