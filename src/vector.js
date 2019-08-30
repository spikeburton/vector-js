const is = require('./is');

/**
 * @name VectorJS
 * @description An implementation of N-dimensional mathematical vectors in JavaScript using Cartesian coordinates.
 * @author Spike Burton
 * @author Allen Woods
 **/

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

    try {
      if (is(newValue, 'Number')) {
        let min = 0;
        let max = this._coords.length - 1;

        axisNum = axisNum < min ? 0 : axisNum;
        axisNum = axisNum > max ? max : axisNum;

        this._coords[axisNum] = newValue;
        result = true;
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
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

  static vectorAdd(a, b) {
    return +parseFloat(a + b).toFixed(16);
  }
  static vectorSub(a, b) {
    return +parseFloat(a - b).toFixed(16);
  }
  static vectorMul(a, b) {
    return +parseFloat(a * b).toFixed(16);
  }
  static vectorDiv(a, b) {
    return +parseFloat(a / b).toFixed(16);
  }

  // New arithmetic operator function
  static operate(v1, v2, operationsArray) {
    if (v1 && v2 && operationsArray) {
      v1 = is(v1, 'Array') ? Vector.toVector(v1) : v1;
      // We convert scalar values to temporary vectors internally
      v2 = is(v2, 'Number') ? Vector.toVector([v2]) : v2;
      v2 = is(v2, 'Array') ? Vector.toVector(v2) : v2;

      let results = [];

      try {
        let a = v1.coords;
        let b = v2.coords;

        let m = false;
        let n = false;

        if (a.length === 1 || b.length === 1) {
          if (a.length === 1) {
            m = 1;
          } else if (b.length === 1) {
            m = a.length;
          }
          n = 1;
        } else {
          if (a.length !== b.length) {
            throw new Error(
              'Vectors must contain the same number of dimensions.'
            );
          } else {
            m = a.length;
          }
          n = m;
        }

        if (!isNaN(m) && !isNaN(n)) {
          for (let i = 0; i < operationsArray.length; i++) {
            a = i > 0 ? results : a;
            results = i > 0 ? [] : results;

            let opName = operationsArray[i];

            for (let j = 0; j < Math.max(m, n); j++) {
              if (m === 1) {
                results.push(Vector[`vector${opName}`](a[j], b[j]));
              } else if (m !== n) {
                results.push(Vector[`vector${opName}`](a[j], b[0]));
              } else {
                results.push(Vector[`vector${opName}`](a[j], b[j]));
              }
            }
          }
        }
      } catch (error) {
        console.error(`ERROR: ${error}`);
      }
      return results;
    }
  }

  static add(v1, v2) {
    let result = false;

    try {
      let params = Vector.operate(v1, v2, ['Add']);
      result = new Vector(...params);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
    return result;
  }

  static sub(v1, v2) {
    let result = false;

    try {
      let params = Vector.operate(v1, v2, ['Sub']);
      result = new Vector(...params);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
    return result;
  }

  static mul(scalar, v1) {
    let result = false;

    try {
      let params = Vector.operate(v1, scalar, ['Mul']);
      result = new Vector(...params);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
    return result;
  }

  static div(scalar, v1) {
    let result = false;

    try {
      let params = Vector.operate(v1, scalar, ['Div']);
      result = new Vector(...params);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
    return result;
  }

  static dot(v1, v2) {
    let result = false;

    try {
      let product = Vector.operate(v1, v2, ['Mul']);

      result = product.reduce((a, c) => a + c, 0);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
    return result;
  }

  static normalize(vectorObj) {
    let result = false;

    try {
      if (is(vectorObj, 'Vector')) {
        let params = Vector.operate(vectorObj, vectorObj.length, ['Div']);
        result = new Vector(...params);
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
    return result;
  }

  static cross(v1, v2) {
    let result = false;

    try {
      v1 = is(v1, 'Array') ? Vector.toVector(v1) : v1;
      v2 = is(v2, 'Array') ? Vector.toVector(v2) : v2;

      let a = v1.coords;
      let b = v2.coords;

      if (a.length === b.length && a.length === 3) {
        let params = [
          Vector.vectorSub(
            Vector.vectorMul(a[1], b[2]),
            Vector.vectorMul(a[2], b[1])
          ),
          Vector.vectorSub(
            Vector.vectorMul(a[2], b[0]),
            Vector.vectorMul(a[0], b[2])
          ),
          Vector.vectorSub(
            Vector.vectorMul(a[0], b[1]),
            Vector.vectorMul(a[1], b[0])
          )
        ];
        result = new Vector(...params);
      } else {
        throw new Error('Cross product is only available in three dimensions.');
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
    return result;
  }

  static toVector(arrayObj) {
    let result = false;

    try {
      if (is(arrayObj, 'Array')) {
        result = new Vector(...arrayObj);
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
    return result;
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
  Vector,
  TensionVector
};
