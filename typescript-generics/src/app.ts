// 1.) generic classes

class DataStorage<T extends string | number> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}
const objStorage1 = new DataStorage<string>();
objStorage1.addItem('vinsen');
// objStorage1.addItem(2) -> will not work

const objStorage2 = new DataStorage<number>();
objStorage2.addItem(2);
// objStorage2.addItem('dhika') -> will not work

// objStorage.addItem({ name: 'vinsen' });

// objStorage.removeItem({name:'hubla'})
