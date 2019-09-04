// NOTE: ordered arguments have been reinstated to allow for backward compatibility.

const is = require('./is');

/**
 * @name VectorJS
 * @description An implementation of N-dimensional mathematical vectors in JavaScript using Cartesian coordinates.
 * @author Spike Burton
 * @author Allen Woods
 **/

const precision = floatNum => {
  return parseFloat(floatNum.toFixed(16));
};
class Vector {
  /**
   * A vector is defined here as an unknown quantity of spacial coordinates
   * with magnitude and direction.
   * Each operational method can accept either a Vector object or a 1-dimensional array
   * containing enough elements to represent the total number of coordinates.
   *
   * @param {...args}
   */
  constructor(...args) {
    this._coords = [...args];
  }

  // return coordinates array
  get coords() {
    return this._coords;
  }

  set coords(newCoords) {
    if (is(newCoords, 'Array')) {
      this._coords = newCoords;
    }
  }

  // single coordinate setter / getter
  setAxis(axisNum, newValue) {
    let result = false;

    if (is(newValue, 'Number')) {
      let min = 0;
      let max = this._coords.length - 1;

      axisNum = axisNum < min ? 0 : axisNum;
      axisNum = axisNum > max ? max : axisNum;

      this._coords[axisNum] = newValue;
      result = true;
    }

    return result;
  }

  getAxis(axisNum) {
    if (is(axisNum, 'Number')) {
      let min = 0;
      let max = this._coords.length - 1;

      axisNum = axisNum < min ? 0 : axisNum;
      axisNum = axisNum > max ? max : axisNum;

      return this._coords[axisNum];
    }
  }

  // calculate the length of this vector
  get length() {
    /**
     * length() is implemented here as a getter, so you can just call `vec.length`
     * makes it feel more native (like an array or a string)
     * simply calculates the magnitude of the vector based on the following equation:
     * length^2 = x^2 + y^2
     */
    return Math.sqrt(this._coords.reduce((acc, cur) => acc + cur ** 2, 0));
  }

  /* Instance Methods */

  add(vectorObj) {
    /**
     * add two vectors
     * recall that a + b = b + a
     */

    return Vector.add(this, vectorObj);
  }

  sub(vectorObj) {
    /**
     * Subtract two vectors
     * vec1.sub(vec2) is equivalent to vec1 - vec2
     */
    return Vector.sub(this, vectorObj);
  }

  mul(scalar) {
    /**
     * vector multiplication by a vector (or scalar)
     * recall that n * vec is equivalent to n * (vec.x, vec.y)
     */
    return Vector.mul(scalar, this);
  }

  div(scalar) {
    /**
     * Divide a vector by a vector (or scalar)
     * Recall that vec / n is equivalent to (vec.x, vec.y) / n
     */
    return Vector.div(scalar, this);
  }

  //
  dot(vectorObj) {
    /**
     * Dot product of two vectors
     * Recall the dot product vec1 * vec2 is equivalent to:
     * (vec1.x * vec2.x) + (vec1.y * vec2.y)
     */
    return Vector.dot(this, vectorObj);
  }

  normalize() {
    /**
     * A method to normalize a vector, i.e. returns the unit vector
     */
    return Vector.normalize(this);
  }

  cross(vectorObj) {
    return Vector.cross(this, vectorObj);
  }

  /* Class Methods */

  static combine(v1, v2, cb) {
    if (v1 && v2) {
      v1 = is(v1, 'Array') ? Vector.toVector(v1) : v1;
      v2 = is(v2, 'Array') ? Vector.toVector(v2) : v2;

      let a = v1.coords;
      let b = v2.coords;

      if (a.length === b.length) {
        const result = [];

        for (let i = 0; i < a.length; i++) {
          result.push(precision(cb(a[i], b[i])));
        }

        return new Vector(...result);
      } else {
        throw new Error('Vectors must inhabit the same coordinate space');
      }
    }

    return false;
  }

  static scale(scalar, vector, cb) {
    if (scalar && vector) {
      vector = is(vector, 'Array') ? Vector.toVector(vector) : vector;

      let a = vector.coords;

      if (is(scalar, 'Number') && a) {
        const result = [];

        for (let i = 0; i < a.length; i++) {
          result.push(precision(cb(scalar, a[i])));
        }

        return new Vector(...result);
      } else {
        throw new Error('Vectors must be scaled by a finite real number');
      }
    }

    return false;
  }

  static add(v1, v2) {
    return Vector.combine(v1, v2, (a, b) => a + b);
  }

  static sub(v1, v2) {
    return Vector.combine(v1, v2, (a, b) => a - b);
  }

  static mul(scalar, v) {
    return Vector.scale(scalar, v, (a, b) => a * b);
  }

  static div(scalar, v) {
    return Vector.scale(scalar, v, (a, b) => b / a);
  }

  static dot(v1, v2) {
    // if (v1 && v2) {
    //   v1 = is(v1, 'Array') ? Vector.toVector(v1) : v1;
    //   v2 = is(v2, 'Array') ? Vector.toVector(v2) : v2;

    //   let a = v1.coords;
    //   let b = v2.coords;

    //   if (a.length === b.length) {
    //     const result = [];

    //     for (let i = 0; i < a.length; i++) {
    //       result.push(precision(a[i] * b[i]));
    //     }

    //     return result.reduce((a, c) => a + c, 0);
    //   } else {
    //     throw new Error('Vectors must inhabit the same coordinate space');
    //   }
    // }

    // return false;
    return Vector.combine(v1, v2, (a, b) => a * b).coords.reduce(
      (a, c) => a + c,
      0
    );
  }

  static normalize(v) {
    return Vector.scale(v.length, v, (a, b) => b / a);
  }

  // Must pass in an array or vector
  static cross(v1, v2) {
    v1 = is(v1, 'Array') ? Vector.toVector(v1) : v1;
    v2 = is(v2, 'Array') ? Vector.toVector(v2) : v2;

    let a = v1.coords;
    let b = v2.coords;

    if (a && b && a.length === b.length && a.length === 3) {
      let params = [
        precision(a[1] * b[2] - a[2] * b[1]),
        precision(a[2] * b[0] - a[0] * b[2]),
        precision(a[0] * b[1] - a[1] * b[0])
      ];
      return new Vector(...params);
    } else {
      throw new Error('Cross product is only available in three dimensions.');
    }
  }

  static toVector(arrayObj) {
    if (is(arrayObj, 'Array')) {
      return new Vector(...arrayObj);
    } else return false;
  }

  /* Helper Methods */

  toArray() {
    /**
     * Convert a vector to a 1-dimensional array containing two elements
     * Format is [x,y]
     */
    return [...this.coords];
  }

  toString() {
    /**
     * Format the vector as a string
     * Format is `(x, y)`
     */
    return `(${this.coords.join(', ')})`;
  }
}

module.exports = {
  Vector
};
