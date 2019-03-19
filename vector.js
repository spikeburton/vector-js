/**
 * @name VectorJS
 * @description An implementation of 3D mathematical vectors in JavaScript using Cartesian coordinates.
 * @author Spike Burton
 * @author Allen Woods
 **/

// Import our improved type checker
import { is } from 'is.js';

// Declare our closure that returns the prototype of Vector3d
const Vector = ((...args) => {
  const _root = function(objScope) {
    // _root is a helper function hidden in the scope
    // of this closure. The class can use it but no
    // outside code can.

    // The purpose of _root is to access the WeakMap
    // where private properties are stored.

    // The WeakMap is bound to an embedded symbol.

    // The _root method effectively replaces keyword `this`.
    return objScope[ Object.getOwnPropertySymbols(objScope)['_wm'] ];
  };

  return class Vector {
    /**
     * A vector is defined here as a pair of X, Y, and  Z coordinates with magnitude and direction.
     * Each operational method can accept either a Vector object or a 1-dimensional array
     * containing three elements representing the X, Y, and Z coordinates.
     *
     * @param {x} x
     * @param {y} y
     * @param {z} z
     */
    constructor(...args) {
      this[Symbol('_wm')] = new WeakMap();
      
      // bind our variable number of coordinates to the WeakMap 
      _root(this).set(this, {coords: [...args]});
    };

    // return coordinates array
    get coords() {
      return _root(this).get(this).coords;
    };

    // x coordinate
    set x(newX) {
      this.coords[0] = newX;
    };
    get x() {
      return this.coords[0];
    };

    // y coordinate
    set y(newY) {
      this.coords[1] = newY;
    };
    get y() {
      return this.coords[1];
    };

    // calculate the length of this vector
    get length() {
      /**
       * length() is implemented here as a getter, so you can just call `vec.length`
       * makes it feel more native (like an array or a string)
       * simply calculates the magnitude of the vector based on the following equation:
       * length^2 = x^2 + y^2
       */
      return Math.sqrt(this.coords.reduce((acc, cur) => acc + cur ** 2));
    };

    /* Instance Methods */

    add(vectorObj) {
      /**
       * add two vectors
       * recall that a + b = b + a
       */

      let dimensions = [];
      let 
      if (vectorObj) {
        if (is(vectorObj, "Vector")) {
          

        } else if (is(vectorObj, "Array")) {

        }
      }


      let x = this._x, y = this._y;
      let result = false;

      try {
        // do some type checking here
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
      /**
       * Subtract two vectors
       * vec1.subt(vec2) is equivalent to vec1 - vec2
       */
      let x = this._x, y = this._y;
      let result = false;

      try {
        // type checking
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
      /**
       * vector multiplication by a scalar
       * recall that n * vec is equivalent to n * (vec.x, vec.y)
       */
      let x = this._x, y = this._y;

      if(typeof scalar === "number") {
        return new Vector(x * scalar, y * scalar);
      } else {
        return false;
      }
    }

    div(scalar) {
      /**
       * Divide a vector by a scalar
       * Recall that vec / n is equivalent to (vec.x, vec.y) / n
       */
      let x = this._x, y = this._y;

      // type check the input to make sure it's a scalar value
      if(typeof scalar === "number") {
        return new Vector(x / scalar, y / scalar);
      } else {
        return false;
      }
    }

    //
    dot(vec) {
      /**
       * Dot product of two vectors
       * Recall the dot product vec1 * vec2 is equivalent to:
       * (vec1.x * vec2.x) + (vec1.y * vec2.y)
       */
      let x = this._x, y = this._y;
      let result = false;

      try {
        // type checking
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
      /**
       * A method to normalize a vector, i.e. returns the unit vector
       */
      let x = this._x, y = this._y;
      let mag = this.length;

      return new Vector(x / mag, y / mag);
    }

    /* Class Methods */

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

    static normalize(vec) {
      if(vec.constructor === Array) {
        vec = Vector.toVector(vec);
      }

      if(vec && vec.constructor === Vector) {
        let x = vec._x, y = vec._y;
        let mag = vec.length;

        return new Vector(x / mag, y / mag);
      } else {
        return false;
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

    /* Helper Methods */

    toArray() {
      /**
       * Convert a vector to a 1-dimensional array containing two elements
       * Format is [x,y]
       */
      return [this._x, this._y];
    }

    toString() {
      /**
       * Format the vector as a string
       * Format is `(x, y)`
       */
      return `(${this._x}, ${this._y})`;
    }
  }
})();

module.exports = Vector;
