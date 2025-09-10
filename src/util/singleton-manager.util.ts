export class SingletonManager {
  private static instances = new Map<Function, any>();

  public static getInstance<T>(cls: new () => T): T {
    if (!this.instances.has(cls)) {
      this.instances.set(cls, new cls());
    }
    return this.instances.get(cls);
  }
}
