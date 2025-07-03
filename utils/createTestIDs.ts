export interface IStaticTestIDObject {
  testID: string;
}
export function createParentTestIDObjectKeys<T extends string>(
  ...keys: T[]
): readonly T[] {
  return keys as readonly T[];
}
export function createTestIDsObject<T extends readonly string[]>(
  componentName: string,
  keys: T
): { [K in (typeof keys)[number]]: IStaticTestIDObject } {
  const prefix = componentName;
  const testIDs = keys.reduce((acc, key) => {
    return {
      ...acc,
      [key]: { testID: `${prefix}.${key}` },
    };
  }, {} as { [K in (typeof keys)[number]]: IStaticTestIDObject });

  return testIDs;
}
