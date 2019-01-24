class Vector {
  constructor(x,y) {
    this._x = x;
    this._y = y;
  }

  set x(newX) {
    this._x = newX;
  }
  get x() {
    return this._x;
  }

  set y(newY) {
    this._y = newY;
  }

  get y() {
    return this._y;
  }

  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  add(vec2) {
    if(vec2.constructor === Vector) {
      return new Vector(this._x + vec2.x, this._y + vec2.y);
    } else if(vec2.constructor === Array && vec2.length === 2) {
      return new Vector(this._x + vec2[0], this._y + vec2[1]);
    } else {
      return false;
    }
  }

  subt(vec2) {
    if(vec2.constructor === Vector) {
      return new Vector(this._x - vec2.x, this._y - vec2._y);
    } else if(vec2.constructor === Array && vec2.length === 2) {
      return new Vector(this._x - vec2[0], this._y - vec2[1]);
    } else {
      return false;
    }
  }

  mult(scalar) {
    if(typeof scalar === "number") {
      return new Vector(this._x * scalar, this._y * scalar);
    } else {
      return false;
    }
  }

  dot(vec2) {
    if(vec2.constructor === Vector) {
      return ((this._x * vec2.x) + (this._y * vec2.y));
    } else if(vec2.constructor === Array && vec2.length ===2) {
      return ((this._x * vec2[0]) + (this._y * vec2[1]));
    } else {
      return false;
    }
  }

  unit() {
    return new Vector(this._x / this.length(), this._y / this.length());
  }

  toArray() {
    return [this._x, this._y];
  }

  toString() {
    return `x: ${this._x}, y: ${this._y}`;
  }

  static toVector(arr) {
    if(arr.constructor === Array && arr.length === 2) {
        return new Vector(arr[0], arr[1]);
    } else {
      return false;
    }
  }
}

module.exports = Vector;
