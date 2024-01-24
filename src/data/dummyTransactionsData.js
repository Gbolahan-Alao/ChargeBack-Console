export const dummyData = Array.from({ length: 100 }, (_, index) => {
  let progressStatus;

  // Assigning statuses based on the specified ratio
  if (index < 15) {
    progressStatus = 'pending';
  } else if (index < 95) {
    progressStatus = 'completed';
  } else {
    progressStatus = 'failed';
  }

  return {
    id: index + 1,
    fileName: `file${index + 1}.txt`,
    progressStatus,
    dateCreated: new Date().toISOString(),
    totalSuccessful: Math.floor(Math.random() * 100),
    totalFailed: Math.floor(Math.random() * 50),
    fileAvailable: Math.random() < 0.5,
  };
});

// Shuffle the array
for (let i = dummyData.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [dummyData[i], dummyData[j]] = [dummyData[j], dummyData[i]];
}
