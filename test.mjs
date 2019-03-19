import Vector from  './vector.mjs';

let vec1 = new Vector(1,2);
console.log(vec1.length);
console.log(vec1.toArray());
vec1.setAxis(0, 3);
console.log(vec1.toString());
let vec2 = vec1.add(new Vector(2,3));
console.log(vec2.toString());
console.log(vec2.getAxis(0));
console.log(vec2.getAxis(1));
console.log(vec1.normalize());
