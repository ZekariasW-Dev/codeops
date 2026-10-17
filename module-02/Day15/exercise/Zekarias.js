//exercise
/*
*1 Store your name in a variable
*2Store total marks of 3 subjects in an array
*3 Calculate the total of the 3 subjects (using for of loop)
*4 Calculate the average 
*5 Using if...else statement display the grade (>90 = A, 80>avg>90 = B, C, D, F)
*6 Finally display the name, total, and grade of the student is a single statement using string literal (backtick)
*/
let name = "Zekarias Woreket";
const marks = [85, 92, 78];
let total = 0;
for (const mark of marks) {
  total += mark;
}
const average = total / marks.length;
if (average > 90) {
  grade = "A";
}
else if (average > 80) {
  grade = "B";
}
else if (average > 70) {
  grade = "C";
}
else if (average > 60) {
  grade = "D";
}
else {
  grade = "F";
}
console.log(`Name: ${name},Marks: ${total}, Grade: ${grade}`);
