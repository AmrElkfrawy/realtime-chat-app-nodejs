const { expect } = require('expect');
const { generateMessage } = require('./message');

describe('Generate Message', () => {
  it('should generate correct message object', () => {
    const from = 'Amr',
      text = 'Some text',
      message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message.createdAt).toBeGreaterThan(0); // Check if createdAt is a positive number
    expect(message).toMatchObject({ from, text }); // Check if the message object matches the structure
  });
});
