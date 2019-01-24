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

  get length() {
    let x = this._x, y = this._y;

    return Math.sqrt(x * x + y * y);
  }

  add(vec) {
    let x = this._x, y = this._y;
    let result = false;

    try {
      if(vec.constructor === Vector) {
        result = new Vector(x + vec._x, y + vec._y);
      } else if(vec.constructor === Array && vec.length === 2) {
        result = new Vector(x + vec[0], y + vec[1]);
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    } finally {
      return result;
    }
  }

  subt(vec) {
    let x = this._x, y = this._y;
    let result = false;

    try {
      if(vec.constructor === Vector) {
        result = new Vector(x - vec._x, y - vec._y);
      } else if(vec.constructor === Array && vec.length === 2) {
        result = new Vector(x - vec[0], y - vec[1]);
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    } finally {
      return result;
    }
  }

  mult(scalar) {
    let x = this._x, y = this._y;

    if(typeof scalar === "number") {
      return new Vector(x * scalar, y * scalar);
    } else {
      return false;
    }
  }

  div(scalar) {
    let x = this._x, y = this._y;

    if(typeof scalar === "number") {
      return new Vector(x / scalar, y / scalar);
    } else {
      return false;
    }
  }

  dot(vec) {
    let x = this._x, y = this._y;
    let result = false;

    try {
      if(vec.constructor === Vector) {
        result = ((x * vec._x) + (y * vec._y));
      } else if(vec.constructor === Array && vec.length === 2) {
        result = ((x * vec[0]) + (y * vec[1]));
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    } finally {
      return result;
    }
  }

  normalize() {
    let x = this._x, y = this._y;
    let mag = this.length;

    return new Vector(x / mag, y / mag);
  }

  toArray() {
    return [this._x, this._y];
  }

  toString() {
    return `(${this._x}, ${this._y})`;
  }

  static add(v1, v2) {
    let result = false;

    try {
      if(v1.constructor === Array) {
        v1 = Vector.toVector(v1);
      }
      if(v2.constructor === Array) {
        v2 = Vector.toVector(v2);
      }

      result = v1.add(v2);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    } finally {
      return result;
    }
  }

  static subt(v1, v2) {
    let result = false;

    try {
      if(v1.constructor === Array) {
        v1 = Vector.toVector(v1);
      }
      if(v2.constructor === Array) {
        v2 = Vector.toVector(v2);
      }

      result = v1.subt(v2);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    } finally {
      return result;
    }
  }

  static mult(scalar, vec) {
    let result = false;

    try {
      if(typeof scalar === 'number') {
        if(vec.constructor === Array) {
          vec = Vector.toVector(vec);
        }

        result = vec.mult(scalar);
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    } finally {
      return result;
    }
  }

  static div(scalar, vec) {
    let result = false;

    try {
      if(typeof scalar === 'number') {
        if(vec.constructor === Array) {
          vec = Vector.toVector(vec);
        }

        result = vec.div(scalar);
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    } finally {
      return result;
    }
  }

  static dot(v1, v2) {
    let result = false;

    try {
      if(v1.constructor === Array) {
        v1 = Vector.toVector(v1);
      }
      if(v2.constructor === Array) {
        v2 = Vector.toVector(v2);
      }

      result = v1.dot(v2);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    } finally {
      return result;
    }
  }

  static toVector(arr) {
    let result = false;

    try {
      if(arr.constructor === Array && arr.length === 2) {
        result = new Vector(arr[0], arr[1]);
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    } finally {
      return result;
    }
  }
}

module.exports = Vector;
