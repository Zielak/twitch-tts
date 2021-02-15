const randomMessages = [
  "Hello world!",
  "Good luck, mate",
  "How you doing?",
  "love your content",
];

export function getRandomMessage() {
  return randomMessages[
    Math.round(Math.random() * (randomMessages.length - 1))
  ];
}
