# VectorJS

An implementation of mathematical vectors in JavaScript. The vector space is n-dimensional, with support for cross product and tension vectors.

A vector is defined here as a set of ordered coordinates in the vector space of cardinality **n** which has both a magnitude and a direction. VectorJS implements functionality to represent a vector as a 1-dimensional array containing **n** elements as input for each method.

## Install

```sh
npm i @nullbyte/vector-js
```

## Usage

```js
const { Vector, TensionVector } = require('@nullbyte/vector-js');

const v1 = new Vector(1, 2, 3);
const v2 = new Vector(2, 4, 6);

// Adding two vectors
// OUTPUT: (3, 6, 9)
console.log(v1.add(v2).toString());

// Using an array of coordinates
// OUTPUT: (3, 6, 9)
console.log(v1.add([2, 4, 6]).toString());
```
