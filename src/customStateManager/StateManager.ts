type Listener<T> = (state: T) => void;

export default class StateManager<T> {
  private state: T;
  private listeners: Listener<T>[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  public getState(): T {
    return this.state;
  }

  public setState(newState: T): void {
    this.state = newState;
    this.notifyListeners();
  }

  public subscribe(listener: Listener<T>): void {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: Listener<T>): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }
}
