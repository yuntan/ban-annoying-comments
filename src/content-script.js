const originalFetch = window.fetch;

window.fetch = async (url, options) => {
  if (!(url.match(/\/comments\//) && options?.method !== "POST")) {
    return originalFetch(url, options);
  }

  const response = await originalFetch(url, options);
  if (!response.ok) {
    return response;
  }

  const body = await response.json();
  body.data.comments = body.data.comments.filter((comment) => {
    return !comment.message.match(/^(ん|にょ|ニコ|ぱおん)|😎/);
  });

  return new Response(JSON.stringify(body), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
};
