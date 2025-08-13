import { isAlphanumeric } from 'class-validator';

interface TrieNode {
  key: string;
  parent: TrieNode | null;
  children: TrieNode[];
  end: boolean;
}

export class TrieService {
  private root: TrieNode;

  constructor() {
    this.root = this.createRootNode();
  }

  insert(path: string[]) {
    let currentNode = this.root;

    for (let i = 0; i < path.length; i++) {
      const key = path[i];

      if (key === '') {
        throw new Error('DeepLink path cannot contain empty string');
      }

      const existingChild = currentNode.children.find((child) => child.key === key);

      if (existingChild) {
        currentNode = existingChild;
      } else {
        const newNode = this.createNode(key, currentNode);
        currentNode.children.push(newNode);
        currentNode = newNode;

        if (key.startsWith(':') || key.startsWith('#')) {
          currentNode.end = true;
          break; // This should mark the end of a single path to enforce verboseness in declaring routes
        }
      }
    }
  }

  validateUrl(url: string) {
    const segments = url.split('/');
    console.log(`Segments: ${segments}`);

    return !!this.contains(segments);
  }

  logTrie() {
    this.log(this.root);
  }

  private contains(path: string[]) {
    let currentNode = this.root;

    console.log(`Starting trie traversal for path: ${path.join('/')}`);

    for (let i = 0; i < path.length; i++) {
      const key = path[i];
      console.log(`Checking segment: ${key} at index ${i}`);

      // Log current node and its children
      console.log(`Current node key: ${currentNode.key}`);
      console.log(`Children of the current node: ${currentNode.children.map((child) => child.key).join(', ')}`);

      const existingChild = currentNode.children.find((child) => {
        if (child.key.startsWith(':')) {
          return this.isObjectId(key);
        }

        if (child.key.startsWith('#')) {
          return isAlphanumeric(key);
        }

        return child.key === key;
      });

      if (existingChild) {
        console.log(`Found matching node for segment: ${key}`);
        currentNode = existingChild;
      } else {
        console.log(`No matching node found for segment: ${key}`);
        return false;
      }
    }

    console.log(`Traversal completed. End of path reached: ${currentNode.end}`);
    return currentNode.end;
  }

  private isObjectId(id: string) {
    return new RegExp('^[0-9a-fA-F]{24}$').test(id ?? '');
  }

  private log(node: TrieNode, level = 0) {
    console.log(
      `level: ${level} key: ${node.key || 'ROOT_NODE'} parent: ${
        (node.parent ? node.parent.key || 'ROOT_NODE' : undefined) ?? 'null'
      } end: ${node.end}`,
    );
    node.children.forEach((child) => this.log(child, level + 1));
  }

  private createRootNode() {
    return this.createNode('', null);
  }

  private createNode(key: string, parent: TrieNode | null, end = false) {
    return {
      key,
      parent,
      children: [],
      end,
    };
  }
}
