export function mockScoreApi(token) {
  return new Promise((resolve, reject) => {
    if (token) {
      setTimeout(resolve(Math.floor(Math.random() * 530 + 310)), 500);
    } else {
      reject('Invalid token');
    }
  });
}

export async function mockRecommendationsApi() {
  try {
    const response = await fetch('/recommendations.json');
    const json = await response.json();
    return json.recommendations;
  } catch (e) {
    console.error(e);
  }
}
