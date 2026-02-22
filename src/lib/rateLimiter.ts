type RateLimitRecord = {
  count: number;
  firstRequestTime: number;
};

const rateLimitMap = new Map<string, RateLimitRecord>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export const checkRateLimit = (ip: string) => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, {
      count: 1,
      firstRequestTime: now,
    });
    return { allowed: true };
  }

  if (now - record.firstRequestTime > WINDOW_MS) {
    rateLimitMap.set(ip, {
      count: 1,
      firstRequestTime: now,
    });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil(
        (WINDOW_MS - (now - record.firstRequestTime)) / 1000,
      ),
    };
  }

  record.count += 1;
  return { allowed: true };
};
