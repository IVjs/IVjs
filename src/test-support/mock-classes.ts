export function createMockEngine(): CommandEngine.Class {
  return {
    run: jest.fn(),
    runNodeByName: jest.fn(() => createMockRunner()),
    registerTargetFunction: jest.fn(),
    runCommands: jest.fn(),
  };
}

export function createMockRunner(): Runner.Class {
  const instance: Runner.Class = {
    status: 'running',
    run: jest.fn(() => instance),
    on: jest.fn(),
    once: jest.fn(),
  };
  return instance;
}
