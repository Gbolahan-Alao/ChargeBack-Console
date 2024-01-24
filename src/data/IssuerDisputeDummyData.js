export const issuerDisputeDummyData = Array.from({ length: 100 }, (_, index) => {
  let status;
  const randomValue = Math.random();

  if (randomValue < 0.8) {
    status = 'accepted';
  } else if (randomValue < 0.95) {
    status = 'declined';
  } else {
    status = 'pending';
  }

  return {
    id: index + 1,
    dateLogged: new Date().toISOString(),
    loggedBy: `polaris${Math.random() * 900}@gmail.com`,
    logCode: `pol${Math.floor(Math.random() * 999999999) + 1}`,
    status: status,
    resolvedBy: `polaris${Math.random() * 900}@gmail.com`,
    resolvedOn: new Date().toISOString(),
  };
});

  