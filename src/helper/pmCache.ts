import NodeCache from 'node-cache';

export default class PmCache {
  private static _nodeCache: NodeCache;
  private constructor() {}

  static get nodeCache(): NodeCache {
    if (!this._nodeCache) {
      this._nodeCache = new NodeCache();
    }
    return this._nodeCache;
  }
}
