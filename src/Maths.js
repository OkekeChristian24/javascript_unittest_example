const { XMLHttpRequest } = require("xmlhttprequest");

class Math{
    constructor(){
        //
    }

    greeting(greet){
        console.log(greet);
    }

    getSum(num1, num2){
        return num1 + num2;
    }

    ArithMath(){
        return {
            addNumbers: function(val1, val2){
                return val1 + val2;
            },
            subNumbers: function(val1, val2){
                return val1 - val2;
            },
            mulNumbers: function(val1, val2){
                return val1 * val2;
            },
            divNumbers: function(val1, val2){
                return val1/val2;
            },
        };
    }

    callAFunction(val1, val2){
        this.greeting("Hello, Chris");
        return this.ArithMath().subNumbers(val1, val2);
    }

    callAnotherFunction(num1, num2){
        return this.getSum(num1, num2);
    }

    callTheCallBack(callBack){
        callBack();
    }

    promiseFunction(value){
        return new Promise(function(resolve, reject){
            setTimeout(() => resolve(value), 2000);
        }).then(function(result){
            return result * 2;
        });
    }

    xhrFunction(){
        return new Promise(function(resolve, reject){
            const xhr = new XMLHttpRequest();
            xhr.open("get", "https://jsonplaceholder.typicode.com/posts", true);

            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject(xhr.status);
                    }
                }
            };
            xhr.send();
        })
        .then(result => result)
        .catch(err => err);
    }
}

module.exports = Math;