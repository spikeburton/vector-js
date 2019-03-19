import Vector from  './vector.mjs';
import is from './is.mjs';

let vector1 = new Vector(1,2,3);
let vector2 = new Vector(4,5,6);

console.log(`coords (v1 seed): ${vector1.coords}`);
console.log(`length: ${vector1.length}`);
console.log(`toArray: ${vector1.toArray()}`);
console.log(`toString: ${vector1.toString()}`);
vector1.setAxis(1, 7);
console.log(`coords: ${vector1.coords}`);
console.log(`getAxis: ${vector1.getAxis(1)}`);
console.log(`length (check seed): ${vector1.length}`);

console.log(`--- Begin Arithmetic Tests ---`);

let mathVectors = [
  vector1.add(vector2),
  vector1.sub(vector2),
  vector1.mul(1.5),
  vector1.div(4),
  vector1.dot(vector2),
  vector1.normalize(),
  vector1.cross(vector2)
];

for (let v of mathVectors) {
  if (is(v, "Vector")) {
    console.log(`coords: ${v.coords}`);
    console.log(`length: ${v.length}`);
    console.log(`toArray: ${v.toArray()}`);
    console.log(`toString: ${v.toString()}`);
    v.setAxis(1, Math.floor( Math.random() * 10 ) + 1);
    console.log(`coords (check changed): ${v.coords}`);
    console.log(`getAxis: ${v.getAxis(1)}`);
    console.log(`length (check changed): ${v.length}`);
    console.log("\n\n");
  }
};
