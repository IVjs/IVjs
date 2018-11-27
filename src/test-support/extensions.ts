interface Array<T> {
  tap(fn: (x: this) => any): this;
}

if (!Array.prototype.tap) {
  Array.prototype.tap = function(fn) {
    fn(this);
    return this;
  };
}
