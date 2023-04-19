const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// 模拟 API 请求，将 /api/game/start 和 /api/game/answer 的请求都 mock 掉
const mock = new MockAdapter(axios);
mock.onPost('/api/game/start').reply(200, { question: 'question 1' });
mock.onPost('/api/game/answer').reply(200, { result: true });

describe('Game API', () => {
  test('start game', async () => {
    const response = await axios.post('/api/game/start');
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('question');
  });

  test('answer question', async () => {
    const response = await axios.post('/api/game/answer', { answer: 'answer 1' });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('result');
  });
});
