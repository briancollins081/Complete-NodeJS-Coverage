// Asynchronous
const fetchData = () => {
    const promise = new Promise((resolve, reject)=>{
         setTimeout(() => {
             resolve('Done Waiting, Executed!')
         }, 1500);
    });
    return promise;
};
setTimeout(() => {
    console.log('Timer is done');
    fetchData().then(text => {
        console.log(text);
        return fetchData();
    })
    .then(text2=>{
        console.log(text2);
    });
    
}, 2000);

//Synchronous executed while waiting for async code
console.log('Hello');
console.log('Hi');