// DAYSLEF FUNCTION
export const daysleft = (deadline: string | number | Date) => {
  const difference = new Date(Number(deadline)).getTime() - Date.now();

  const remainingDays = difference / (1000 * 3600 * 24);
  return remainingDays.toFixed(0);
};

// CALCULATE BAR PERCENTAGE
export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

// CHECK IF IMAGE
export const checkIfImage = (url: string, callback: any) => {
  const img = new Image();
  img.src = url;
  if (img.complete) callback(true);
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
