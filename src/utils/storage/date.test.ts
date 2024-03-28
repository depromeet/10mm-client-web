const mockNowDate = (timestamp: number) => {
  const realDateNow = Date.now.bind(global.Date);

  const setMock = () => {
    const dateNowStub = jest.fn(() => timestamp);
    global.Date.now = dateNowStub;
  };

  const restoreMock = () => {
    global.Date.now = realDateNow;
  };

  return { setMock, restoreMock };
};

test('It should call and return Date.now()', () => {
  const { setMock, restoreMock } = mockNowDate(1530518207007);

  setMock();
  expect(Date.now()).toBe(1530518207007);

  restoreMock();
  expect(Date.now()).not.toBe(1530518207007);
});
