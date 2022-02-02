export enum STRATEGY {
  LOOP,
  RECURSION
}

class BSTNode {
  private _value!: number;
  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    this._value = value;
  }

  private _leftNode!: BSTNode;
  public get leftNode(): BSTNode {
    return this._leftNode;
  }
  public set leftNode(value: BSTNode) {
    this._leftNode = value;
  }

  private _rightNode!: BSTNode;
  public get rightNode(): BSTNode {
    return this._rightNode;
  }
  public set rightNode(value: BSTNode) {
    this._rightNode = value;
  }

  constructor(value: number) {
    this._value = value;
  }
}


export class BST {
  private root!: BSTNode;
  public strategy: STRATEGY = STRATEGY.LOOP;

  public searchValue(value: number): number {
    switch (this.strategy) {
      case STRATEGY.LOOP: {
        return this.searchByLoop(this.root, value);
      }
      case STRATEGY.RECURSION: {
        return this.searchByRecursion(this.root, value);
      }
    }
  }

  public insertValue(value: number): void {
    switch (this.strategy) {
      case STRATEGY.LOOP: {
        this.insertRecByLoop(value);
        break;
      }
      case STRATEGY.RECURSION: {
        this.root = this.insertRecByRecursion(this.root, value);
        break;
      }
    }
  }

  public deleteValue(value: number): void {
    this.root = this.deleteRec(this.root, value);
  }

  public inorder(): void {
    this.inOrderRec(this.root);
  }

  public findMin(node: BSTNode = this.root): number {
    let min = node?.value;
    let root = node;
    while (root?.leftNode) {
      min = root.leftNode.value;
      root = root.leftNode;
    }
    return min;
  }

  public findMax(node: BSTNode = this.root): number {
    let max = node?.value;
    let root = node;
    while (root?.rightNode) {
      max = root.rightNode.value;
      root = root.rightNode;
    }
    return max;
  }

  private deleteRec(node: BSTNode, value: number): BSTNode {
    if (!node) {
      return node;
    }
    if (value < node.value) {
      node.leftNode = this.deleteRec(node.leftNode, value);
    } else if (value > node.value) {
      node.rightNode = this.deleteRec(node.rightNode, value);
    } else {
      if (!node.leftNode) {
        return node.rightNode;
      } else if (!node.rightNode) {
        return node.leftNode;
      } else {
        let current = node;
        let next = node.rightNode;

        while (next.leftNode) {
          current = next;
          next = next.leftNode
        }

        if (current !== node) {
          current.leftNode = next.rightNode;
        } else {
          current.rightNode = next.rightNode
        }
        node.value = next.value;
      }
    }
    return node;
  }

  private inOrderRec(node: BSTNode): void {
    if (node) {
      this.inOrderRec(node.leftNode);
      console.log(node.value);
      this.inOrderRec(node.rightNode);
    }
  }

  private insertRecByLoop(value: number): void {
    const node = new BSTNode(value);
    if (!this.root) {
      this.root = node;
      return;
    }

    let current = this.root;
    while (current) {
      if (value === current.value) {
        return;
      }

      if (value < current.value) {
        if (!current.leftNode) {
          current.leftNode = node;
          return;
        }
        current = current.leftNode;
      } else {
        if (!current.rightNode) {
          current.rightNode = node;
          return;
        }
        current = current.rightNode;
      }
    }
  }

  private insertRecByRecursion(node: BSTNode, value: number): BSTNode {
    if (!node) {
      node = new BSTNode(value);
    }

    if (value < node.value) {
      node.leftNode = this.insertRecByRecursion(node.leftNode, value);
    } else if (value > node.value) {
      node.rightNode = this.insertRecByRecursion(node.rightNode, value);
    }

    return node;
  }

  private searchByRecursion(node: BSTNode, value: number): number {
    if (!node || node.value === value) {
      return value;
    } else if (value < node.value) {
      return this.searchByRecursion(node.leftNode, value);
    } else if (value > node.value) {
      return this.searchByRecursion(node.rightNode, value);
    }
    return value;
  }

  private searchByLoop(node: BSTNode, value: number): number {
    if (!node || node.value === value) {
      return value;
    }

    let current = node;
    while (current) {
      if (current.value === value) {
        return value
      }

      if (value < current.value) {
        if (!current.leftNode) {
          return value;
        }
        current = current.leftNode
      }

      if (value > current.value) {
        if (!current.rightNode) {
          return value;
        }
        current = current.rightNode
      }
    }

    return value;
  }
}
