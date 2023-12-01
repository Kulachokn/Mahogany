export const getRandomColor = () => {
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);

  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
};
