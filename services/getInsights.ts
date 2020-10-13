export function getInsights(key: string, customerId: string) {
  if (customerId) {
    return fetch(
      `https://andreadito-test.nw.r.appspot.com/api/insights/${customerId}`,
    ).then((res) => res.json());
  } else {
    return [];
  }
}
