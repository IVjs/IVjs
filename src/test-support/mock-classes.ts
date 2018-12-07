export function createMockEngine(): CommandEngine.Class {
  return {
    run: () => {}, // tslint:disable-line no-empty
    runNodeByName: () => createMockRunner() as any,
    registerTargetFunction: () => {}, // tslint:disable-line no-empty
    runCommands: () => ({} as any), // tslint:disable-line no-empty
  };
}

export function createMockRunner(): Runner.Class {
  const instance: Runner.Class = {
    status: 'running',
    run: () => instance as any,
    on: () => {}, // tslint:disable-line no-empty
    once: () => {}, // tslint:disable-line no-empty
  };
  return instance;
}
