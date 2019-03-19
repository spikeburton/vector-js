/**
 * @name VectorJS
 * @description An implementation of N-dimensional mathematical vectors in JavaScript using Cartesian coordinates.
 * @author Spike Burton
 * @author Allen Woods
 **/

// Import our improved type checker
import is from './is.mjs';

// Declare our closure that returns the prototype of Vector
const Vector = ((...args) => {
  const _root = function(objScope) {
    // _root is a helper function hidden in the scope
    // of this closure. The class can use it but no
    // outside code can.

    // The purpose of _root is to access the WeakMap
    // where private properties are stored.

    // The WeakMap is bound to an embedded symbol.

    // The _root method effectively replaces keyword `this`
    // when accessing the coords property
    return objScope[ Object.getOwnPropertySymbols(objScope)[0] ];
  };

  return class Vector {
    /**
     * A vector is defined here as an unknown quantity of spacial coordinates
     * with magnitude and direction.
     * Each operational method can accept either a Vector object or a 1-dimensional array
     * containing enough elements to represent the total number of coordinates.
     *
     * @param {...args} 
     */
    constructor(...args) {
      this[Symbol('_wm')] = new WeakMap();
      
      if ([...args].length < 2) {
        throw new Error('Vectors must reside in at least 2 dimensions.');
      } else {
        // bind our variable number of coordinates to the WeakMap 
        _root(this).set(this, {coords: [...args]});
      }
    };

    // return coordinates array
    get coords() {
      return _root(this).get(this).coords;
    };

    set coords(newCoords) {
      _root(this).get(this).coords = newCoords;
    };

    // single coordinate setter / getter
    setAxis(axisNum, newValue) {
      let result = false;

      try {
        if (is(newValue, "Number")) {
          let min = 0;
          let max = this.coords.length - 1;
          
          axisNum = (axisNum < min) ? 0 : axisNum;
          axisNum = (axisNum > max) ? max : axisNum;

          this.coords[axisNum] = newValue;
          result = true;
        }
      } catch (error) {
        console.log(`ERROR: ${error}`);
      } finally {
        return result;
      }
    };

    getAxis(axisNum) {
      if (is(axisNum, "Number")) {
        let min = 0;
        let max = this.coords.length - 1;
        
        axisNum = (axisNum < min) ? 0 : axisNum;
        axisNum = (axisNum > max) ? max : axisNum;

        return this.coords[axisNum];
      }
    };

    // calculate the length of this vector
    get length() {
      /**
       * length() is implemented here as a getter, so you can just call `vec.length`
       * makes it feel more native (like an array or a string)
       * simply calculates the magnitude of the vector based on the following equation:
       * length^2 = x^2 + y^2
       */
      return Math.sqrt(this.coords.reduce((acc, cur) => acc + cur ** 2, 0));
    };

    /* Instance Methods */

    add(vectorObj) {
      /**
       * add two vectors
       * recall that a + b = b + a
       */

      return Vector.add(this, vectorObj);
    };

    sub(vectorObj) {
      /**
       * Subtract two vectors
       * vec1.subt(vec2) is equivalent to vec1 - vec2
       */
      return Vector.sub(this, vectorObj);
    };

    mul(scalar) {
      /**
       * vector multiplication by a scalar
       * recall that n * vec is equivalent to n * (vec.x, vec.y)
       */
       return Vector.mul(scalar, this);
    };

    div(scalar) {
      /**
       * Divide a vector by a scalar
       * Recall that vec / n is equivalent to (vec.x, vec.y) / n
       */
       return Vector.div(scalar, this);
    };

    //
    dot(vectorObj) {
      /**
       * Dot product of two vectors
       * Recall the dot product vec1 * vec2 is equivalent to:
       * (vec1.x * vec2.x) + (vec1.y * vec2.y)
       */
      return Vector.dot(this, vectorObj);
    };

    normalize() {
      /**
       * A method to normalize a vector, i.e. returns the unit vector
       */
      return Vector.normalize(this);
    };

    cross(vectorObj) {
      return Vector.cross(this, vectorObj);
    }

    /* Class Methods */

    // Array reduce callbacks
    static vectorAdd(acc, cur) { return acc + cur };
    static vectorSub(acc, cur) { return acc - cur };
    static vectorMul(acc, cur) { return acc * cur };
    static vectorDiv(acc, cur) { return acc / cur };

    // Arithmetic operator function
    static operate(v1, v2, opFuncArray, useOne=false) {
      // only proceed if all arguments have been passed
      if (v1 && v2 && opFuncArray) {
        // auto format incoming data as vectors
        v1 = (is(v1, "Array")) ? Vector.toVector(v1) : v1;
        v2 = (is(v2, "Array")) ? Vector.toVector(v2) : v2;

        // default to false for return value
        let results = false;
        // handle errors
        try {
          // point to the coordinate values of the vectors
          let a = v1.coords;
          let b = v2.coords;

          // if the vectors are from different coordinate systems
          if((a.length + b.length) % 2) {
            // prevent further action
            throw new Error(`Operations can only be performed on vectors that inhabit the same coordinate system.`)
          } else {
            // format our return value as an array
            results = [];

            // iterate over the coordinates in the vectors
            for (let c=0; c<a.length; c++) {
              // Store the result of the operation performed inside opFunc.

              // We need to programmatically define the init value because
              // multiplication requires 1 as the init value, not zero.
              results.push([ a[c], b[c] ].reduce(opFuncArray[0].f, opFuncArray[0].i));
            }
            // reduce further if this is dot product or similar
            if (opFuncArray.length === 2) {
              results = results.reduce(opFuncArray[1].f, opFuncArray[1].i);
            }
          }
        } catch(error) {
          // log any error we find, if any
          console.log(`ERROR: ${error}`);
        } finally {
          // return the results
          return results;
        }
      }
    };

    static add(v1, v2) {
      let result = false;

      try {

        let params = Vector.operate(v1, v2, [{f: Vector.vectorAdd, i: 0}]);
        result = new Vector(...params);

      } catch (error) {
        console.log(`ERROR: ${error}`);
      } finally {

        return result;

      }
    };

    static sub(v1, v2) {
      let result = false;

      try {

        let params = Vector.operate(v1, v2, [{f: Vector.vectorSub, i: 0}]);
        result = new Vector(...params);

      } catch (error) {
        console.log(`ERROR: ${error}`);
      } finally {

        return result;

      }
    };

    static mul(scalar, vectorObj) {
      let result = false;

      try {
        let scaleArray = [];
        let coords;

        if (is(vectorObj, "Vector")) {
          coords = vectorObj.coords;
        } else if (is(vectorObj, "Array")) {
          coords = vectorObj;
        }

        for (let i=0; i<coords.length; i++) {
          scaleArray.push(scalar);
        }

        let params = Vector.operate(vectorObj, scaleArray, [{f: Vector.vectorMul, i: 1}]);
        result = new Vector(...params);

      } catch (error) {
        console.log(`ERROR: ${error}`);
      } finally {

        return result;

      }
    };

    static div(scalar, vectorObj) {
      let result = false;

      try {
        let scaleArray = [];
        let coords;

        if (is(vectorObj, "Vector")) {
          coords = vectorObj.coords;
        } else if (is(vectorObj, "Array")) {
          coords = vectorObj;
        }

        for (let i=0; i<coords.length; i++) {
          scaleArray.push(scalar);
        }

        let params = Vector.operate(vectorObj, scaleArray, [{f: Vector.vectorDiv, i: 1}]);
        result = new Vector(...params);

      } catch (error) {
        console.log(`ERROR: ${error}`);
      } finally {

        return result;

      }
    };

    static dot(v1, v2) {
      let result = false;

      try {

        let product = Vector.operate(
          v1,
          v2,
          [
            {f: Vector.vectorMul, i: 1},
            {f: Vector.vectorAdd, i: 0}
          ]
        );

        result = product;

      } catch (error) {
        console.log(`ERROR: ${error}`);
      } finally {

        return result;

      }
    };

    static normalize(vectorObj) {
      let result = false;

      try {
        let scaleArray = [];
        let magnitude;
        let coords;

        if (is(vectorObj, "Vector")) {
          coords = vectorObj.coords;
          magnitude = vectorObj.length;

          for (let i=0; i<coords.length; i++) {
            scaleArray.push(magnitude);
          }

          let params = Vector.operate(vectorObj, scaleArray, [{f: Vector.vectorDiv, i: 1}]);
          result = new Vector(...params);
        }
      } catch (error) {
        console.log(`ERROR: ${error}`);
      } finally {
        return result;
      }
    };

    static cross(v1, v2) {
      let result = false;

      try {
        v1 = is(v1, "Array") ? Vector.toVector(v1) : v1;
        v2 = is(v2, "Array") ? Vector.toVector(v2) : v2;

        let a = v1.coords;
        let b = v2.coords;

        if (a.length === b.length && a.length >= 3) {
          let params = [
            a[1]*b[2] - a[2]*b[1],
            a[2]*b[0] - a[0]*b[2],
            a[0]*b[1] - a[1]*b[0]
          ]
          result = new Vector(...params)
        } else {
          throw new Error('Cross product is only available in three or more dimensions.');
        }
      } catch (error) {
        console.log(`ERROR: ${error}`);
      } finally {
        return result;
      }
    }

    static toVector(arrayObj) {
      let result = false;

      try {
        if(is(arrayObj, "Array") && arrayObj.length >= 2) {
          result = new Vector(...arrayObj);
        }
      } catch (error) {
        console.log(`ERROR: ${error}`);
      } finally {
        return result;
      }
    };

    /* Helper Methods */

    toArray() {
      /**
       * Convert a vector to a 1-dimensional array containing two elements
       * Format is [x,y]
       */
      return [...this.coords];
    };

    toString() {
      /**
       * Format the vector as a string
       * Format is `(x, y)`
       */
      return `(${this.coords.join(', ')})`;
    }
  };
})();

export default Vector;