const { reloadApp } = require('detox-expo-helpers');

describe('Example', () => {
  beforeEach(async () => {
    await reloadApp();
  });
});

test('2 text nodes', async () => {
  await expect(element(by.label('Text')).atIndex(0).toBeVisible());
  await expect(element(by.label('Text')).atIndex(1).toBeVisible());
});