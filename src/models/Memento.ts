export interface IOriginator<T> {
  createMemento(): T
  restoreMemento(memento: T): void
}

export class CareTaker<T> {
  private mementoList: T[] = []

  saving(originator: IOriginator<T>): void {
    this.mementoList.push(originator.createMemento())
  }

  restoring(originator: IOriginator<T>): void {
    if (this.mementoList.length === 0) return

    originator.restoreMemento(this.mementoList[this.mementoList.length - 1])
    this.mementoList.splice(this.mementoList.length - 1, 1)
  }
}