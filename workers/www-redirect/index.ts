// Redirects www.anagram-solver.co/* to the apex, keeping path and query.
export function redirectTarget(url: string): string {
  const u = new URL(url);
  u.protocol = "https:";
  u.hostname = "anagram-solver.co";
  u.port = "";
  return u.toString();
}

const worker = {
  fetch(request: Request): Response {
    return Response.redirect(redirectTarget(request.url), 301);
  },
};

export default worker;
