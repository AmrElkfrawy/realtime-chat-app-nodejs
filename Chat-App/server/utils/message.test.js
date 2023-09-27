const { expect } = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

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

describe('Generate Location Message', () => {
  it('should generate correct location object', () => {
    const from = 'Amr',
      lat = 15,
      lng = 15,
      url = `https://www.google.com/maps?q=${lat},${lng}`,
      message = generateLocationMessage(from, lat, lng);

    expect(typeof message.createdAt).toBe('number');
    expect(message.createdAt).toBeGreaterThan(0); // Check if createdAt is a positive number
    expect(message).toMatchObject({ from, url }); // Check if the message object matches the structure
  });
});
