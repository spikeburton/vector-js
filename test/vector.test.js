const { Vector } = require('../src/vector');

test('should add v1 to v2 and return the new vector as an array', () => {
  const v1 = new Vector(1, 2, 3);
  const v2 = new Vector(2, 4, 6);

  expect(v1.add(v2).toArray()).toEqual([3, 6, 9]);
});

test('should add array to v1 and return a new Vector object', () => {
  const v1 = new Vector(1, 2, 3);

  expect(v1.add([2, 4, 6]).toArray()).toEqual([3, 6, 9]);
});

test('should multiply vector by a scalar correctly', () => {
  const v1 = new Vector(1, 2, 3);

  expect(v1.mul(4).toArray()).toEqual([4, 8, 12]);
});

test('should return the difference of two vectors through subtraction', () => {
  const v1 = new Vector(1, 2, 3);
  const v2 = new Vector(2, 4, 6);

  expect(v1.sub(v2).toArray()).toEqual([-1, -2, -3]);
});

test('should return the quotient of a vector as divided by a scalar', () => {
  const v1 = new Vector(4, 6, 8);
  const scalar = 2;

  expect(v1.div(scalar).toArray()).toEqual([2, 3, 4]);
});

test('should multiply vector by a scalar correctly', () => {
  const v1 = new Vector(1, 2, 3);

  expect(v1.mul(4).toArray()).toEqual([4, 8, 12]);
});

test('should return the dot product of two vectors', () => {
  const v1 = new Vector(1, 2, 3);
  const v2 = new Vector(2, 4, 6);
  // DOT: (1*1) + (2*4) + (3*6)

  expect(v1.dot(v2)).toBe(28);
});

test('should return the cross product of two vectors', () => {
  const v1 = new Vector(1, 2, 3);
  const v2 = new Vector(4, 5, 6);

  expect(v1.cross(v2).toArray()).toEqual([-3, 6, -3]);
});

test('should return the normal of a vector', () => {
  const v1 = new Vector(9, 12);

  expect(v1.normalize().toArray()).toEqual([3 / 5, 4 / 5]);
});

test('should return the correct length of a vector', () => {
  const v1 = new Vector(9, 12);

  expect(v1.length).toBe(15);
});

test('should be able to retrieve coordinates as an array', () => {
  const v1 = new Vector(2, 4, 6);

  expect(v1.coords).toEqual([2, 4, 6]);
});

test('should update coordinates at a given axis and confirm the result', () => {
  const v1 = new Vector(3, 5, 7);
  v1.setAxis(1, 9);

  expect(v1.toArray()).toEqual([3, 9, 7]);
  expect(v1.getAxis(1)).toBe(9);
});

test('should throw an error when arguments of cross are not arrays or vectors', () => {
  const v1 = new Vector(4, 9, 11);

  expect(v1.cross(['apple', 2])).toThrow();
  // expect(v1.cross([2, 3])).toThrow();
});
