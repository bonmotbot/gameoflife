class Board {
  constructor(width=10, height=10) {
    this.width = width;
    this.height = height;
    this.current = new Uint8Array(width * height);
    this.buffer = new Uint8Array(width * height);
  }

  isAlive(row, col) {
    return this.current[row * this.width + col];
  }

  step() {
    for (let r0 = 0; r0 < this.height; r0++) {
      const r1 = (r0 + 1) % this.height;
      const r2 = (r0 + 2) % this.height;
      for (let c0 = 0; c0 < this.width; c0++) {
        const c1 = (c0 + 1) % this.width;
        const c2 = (c1 + 2) % this.width;

        const neighborCount = this.isAlive(r0, c0) + this.isAlive(r0, c1) + this.isAlive(r0, c2)
                            + this.isAlive(r1, c0)                        + this.isAlive(r1, c2)
                            + this.isAlive(r2, c0) + this.isAlive(r2, c1) + this.isAlive(r2, c2);
        if (neighborCount == 3) {
          this.buffer[r1 * this.width + c1] = 1;
        } if (this.isAlive(r1, c1) && neighborCount == 2) {
          this.buffer[r1 * this.width + c1] = 1;
        } else {
          this.buffer[r1 * this.width + c1] = 0;
        }
      }
    }
    const current = this.current;
    this.current = this.buffer;
    this.buffer = current;
  }
}