const { Vector } = require('./vector');

/**
 * @name TensionVector
 * @description An extension of an N-dimensional vector to include Tension, Continuity, and Bias, as required by cubic Hermite splines.
 * @author Spike Burton
 * @author Allen Woods
 **/
class TensionVector extends Vector {
  constructor(xPos, yPos, zPos, tVal, cVal, bVal) {
    super(xPos, yPos, zPos);

    this.t = tVal;
    this.c = cVal;
    this.b = bVal;
  }

  get coords() {
    return super.coords;
  }

  set coords(newCoords) {
    if (is(newCoords, 'Array')) {
      super.coords = newCoords;
    }
  }

  // Tension
  get t() {
    return this.tParam;
  }
  set t(tValue) {
    this.tParam = tValue < 0 ? 0 : tValue > 1 ? 1 : tValue;
  }

  // Continuity
  get c() {
    return this.cParam;
  }
  set c(cValue) {
    this.cParam = cValue < 0 ? 0 : cValue > 1 ? 1 : cValue;
  }

  // Bias
  get b() {
    return this.bParam;
  }
  set b(bValue) {
    this.bParam = bValue < 0 ? 0 : bValue > 1 ? 1 : bValue;
  }
}

module.exports = {
  TensionVector
};
