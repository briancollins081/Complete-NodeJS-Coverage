const person = {
    name: "Andere",
    age: 29,
    greet() {
        console.log("Hi, I am "+this.name);
    }
};

// copiedPerson = {...person};
// console.log(copiedPerson);
const hobbies = ['Sports', 'Cooking'];

// // for (let hobby of hobbies) {
// //     console.log(hobby);
// // }

// // console.log(hobbies.map(h =>'Hobby: '+h));
// // console.log(hobbies);

// // Reference Type can be edited since the const holds the reference to an array or object
// hobbies.push('Programming');
// // console.log(hobbies);

// //REST and SPREAD Operators
// // copiedArray = hobbies.slice(); //copies an array

// //spread op
// copiedArray = [...hobbies];
// console.log(copiedArray);

// //rest op
// const toArray = (...args) => {
//     return args;
// };

// console.log(toArray(1,2,3,4));

const printName = (personD) => {
    console.log(personD.name);
}
printName(person);

const printName2 = ({name}) => {
    console.log(name);
}
printName2(person);

const {name, age} = person;

console.log(name, age);

const [hobby1, hobby2] = hobbies; //uses any names you want in relation to position
console.log(hobby1, hobby2);