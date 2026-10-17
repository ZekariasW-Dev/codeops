console.log("js exerise");
let a=10;
let b=20
let c=10;
function sum(a=0,b=0,c=0){
    return a+b+c;
}
console.log(`sum of ${a},${b} and ${c} is:`);
console.log(sum(a,b,c));

function vatCalculate(vat = 0.15, ...varNam){
   let sum = 0;
    for(const p of varNam){
        sum += p;
    }
    return sum;
}

console.log(vatCalculate(2,3,8));