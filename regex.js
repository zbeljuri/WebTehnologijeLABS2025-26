//Z1
const reg1=new RegExp('\\d_..*');
let str='3_aHello World';
console.log(reg1.test(str)); // true
//datum formata DD-MM-YYYY
const reg2=new RegExp('([0-2][1-9]|3[0-1])-(0[1-9]|1[0-2])-\\d{4}');
let str2='12-34-2023';
console.log(reg2.test(str2)); // false
let str3='12-04-2023';
console.log(reg2.test(str3)); // true