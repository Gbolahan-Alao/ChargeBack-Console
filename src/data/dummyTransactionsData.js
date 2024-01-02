
export const dummyData = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    fileName: `file${index + 1}.txt`,
    progressStatus: index % 2 === 0 ? 'pending' : 'completed', // Alternating status for variety
    dateCreated: new Date().toISOString(),
    totalSuccessful: Math.floor(Math.random() * 100),
    totalFailed: Math.floor(Math.random() * 50),
    fileAvailable: Math.random() < 0.5,
  }));
  