# VectorJS

An implementation of mathematical vectors in JavaScript. The vector space is n-dimensional, with support for cross product and tension vectors.

A vector is defined here as a set of ordered coordinates in the vector space of cardinality **n** which has both magnitude and direction. VectorJS implements functionality to represent a vector as a 1-dimensional array containing **n** elements as input for each method.

[![Build Status](https://travis-ci.org/spikeburton/vector-js.svg?branch=master)](https://travis-ci.org/spikeburton/vector-js)

## Install

```sh
npm i @glazier/vector-js
```

## Usage

```js
const { Vector, TensionVector } = require('@glazier/vector-js');

const v1 = new Vector(1, 2, 3);
const v2 = new Vector(2, 4, 6);

// Adding two vectors
// OUTPUT: (3, 6, 9)
console.log(v1.add(v2).toString());

// Using an array of coordinates
// OUTPUT: (3, 6, 9)
console.log(v1.add([2, 4, 6]).toString());

// Scalar multiplication
// OUTPUT: (4, 8, 12)
console.log(v1.mul(4).toString());

// Dot product
// OUTPUT: 28
console.log(v1.dot(v2).toString());

// Cross product
// OUTPUT: (0, 0, 0)
console.log(v1.cross(v2).toString());

// Unit vector
// NOTE: Normalization is non-destructive and returns a new Vector object
// OUTPUT: (0.2672612419124244, 0.1336306209562122, 0.0890870806374748)
console.log(v1.normalize().toString());

// Vector magnitude
// OUTPUT: 3.7416573867739413
console.log(v1.length)

// OUTPUT: [ 1, 2, 3 ]
console.log(v1.coords);

// Convert to an array
// OUTPUT: [ 1, 2, 3 ]
console.log(v1.toArray());

// OUTPUT: [ 1, 2, 13 ]
v1.setAxis(2, 13);
console.log(v1.coords);

// OUTPUT: 13
console.log(v1.getAxis(2));
```
