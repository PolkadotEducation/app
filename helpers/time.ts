export const getTimeUntilMidnightCET = () => {
  const now = new Date();

  const cetTimeString = now.toLocaleString("en-GB", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const timePart = cetTimeString.split(", ")[1];
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  const secondsElapsedToday = hours * 3600 + minutes * 60 + seconds;

  const secondsUntilMidnight = 86400 - secondsElapsedToday;

  const displayHours = Math.floor(secondsUntilMidnight / 3600);
  const displayMinutes = Math.floor((secondsUntilMidnight % 3600) / 60);
  const displaySeconds = secondsUntilMidnight % 60;

  return `${displayHours.toString().padStart(2, "0")}:${displayMinutes.toString().padStart(2, "0")}:${displaySeconds.toString().padStart(2, "0")}`;
};
