class BoardRenderer {
  constructor(canvas, cellSize=10, fillStyle='black', strokeStyle) {
    this.canvas = canvas;
    this.cellSize = cellSize;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
  }

  render(board) {
    const canvasWidth = this.cellSize * board.width;
    const canvasHeight = this.cellSize * board.height;

    if (this.canvas.width != canvasWidth) {
      this.canvas.width = canvasWidth;
    }
    if (this.canvas.height != canvasHeight) {
      this.canvas.height = canvasHeight;
    }
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const path = new Path2D();
    for (let r = 0; r < board.height; r++) {
      for (let c = 0; c < board.width; c++) {
        if (board.isAlive(r, c)) {
          path.rect(c * this.cellSize, r * this.cellSize, this.cellSize, this.cellSize)
        }
      }
    }
    ctx.fillStyle = this.fillStyle;
    ctx.fill(path);
    if (this.strokeStyle) {
      const path = new Path2D();
      for (let r = 0; r <= board.height; r++) {
        path.moveTo(0, r * this.cellSize)
        path.lineTo(board.width * this.cellSize, r * this.cellSize);
      }
      for (let c = 0; c <= board.width; c++) {
        path.moveTo(c * this.cellSize, 0)
        path.lineTo(c * this.cellSize, board.height * this.cellSize);
      }
      ctx.strokeStyle = this.strokeStyle;
      ctx.stroke(path);
    }
  }
}