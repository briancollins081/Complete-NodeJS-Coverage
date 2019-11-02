const person = {
    name: "Andere",
    age: 29,
    greet() {
        console.log("Hi, I am "+this.name);
    }
};

const hobbies = ['Sports', 'Cooking'];
// for (let hobby of hobbies) {
//     console.log(hobby);
// }

console.log(hobbies.map(h =>'Hobby: '+h));
console.log(hobbies);