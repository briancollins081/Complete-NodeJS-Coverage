const sum = (a, b)=>{
    if(a && b){
        return a+b;
    }
    throw new Error("Invalid arguments");    
}

try {
    sum(1);
} catch (error) {
    console.log("Error occurred!");
    // console.log(error);
}

console.log("This works!");
