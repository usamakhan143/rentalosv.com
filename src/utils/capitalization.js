// Utility function to properly capitalize common acronyms and brands
export const properCapitalization = (word) => {
  if (!word) return word;

  const upperCaseWords = [
    "USA",
    "UK",
    "EU",
    "UAE",
    "BMW",
    "SUV",
    "GPS",
    "USB",
    "AC",
    "VIP",
    "CEO",
    "API",
    "FAQ",
    "HTML",
    "CSS",
    "JS",
    "PDF",
    "URL",
    "HTTP",
    "HTTPS",
    "AI",
    "IT",
    "PC",
    "TV",
    "DVD",
    "CD",
    "MP3",
    "JPG",
    "PNG",
  ];

  const upperWord = word.toUpperCase();

  if (upperCaseWords.includes(upperWord)) {
    return upperWord;
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

// Function to properly capitalize titles with multiple words
export const properTitleCapitalization = (title) => {
  if (!title) return title;

  return title
    .split(" ")
    .map((word) => properCapitalization(word))
    .join(" ");
};
