/**
 * @jest-environment node
 */
import { POST } from '@/app/api/waitlist/route';

const mockInsert = jest.fn();

jest.mock('@/lib/supabase-server', () => ({
  supabaseServer: {
    from: jest.fn(() => ({ insert: mockInsert })),
  },
}));

function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/waitlist', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockInsert.mockResolvedValue({ error: null });
  });

  it('returns 200 on valid email', async () => {
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it('returns 200 with optional name', async () => {
    const res = await POST(makeRequest({ email: 'chris@example.com', name: 'Chris' }));
    expect(res.status).toBe(200);
  });

  it('returns 400 for missing email', async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid email format', async () => {
    const res = await POST(makeRequest({ email: 'not-an-email' }));
    expect(res.status).toBe(400);
  });

  it('returns 409 on duplicate email', async () => {
    mockInsert.mockResolvedValueOnce({
      error: { code: '23505', message: 'duplicate key value' },
    });
    const res = await POST(makeRequest({ email: 'existing@example.com' }));
    expect(res.status).toBe(409);
    const json = await res.json();
    expect(json.error).toMatch(/already/i);
  });

  it('returns 500 on unexpected Supabase error', async () => {
    mockInsert.mockResolvedValueOnce({
      error: { code: 'PGRST000', message: 'connection error' },
    });
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    expect(res.status).toBe(500);
  });
});
