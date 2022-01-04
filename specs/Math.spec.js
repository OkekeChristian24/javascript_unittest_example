const chai = require("chai");
const chaiaspromised = require("chai-as-promised");
const expect = chai.expect;
const sinon = require("sinon");
const nock = require("nock");
chai.use(chaiaspromised);

const Math = require("../src/Maths");
const mathObj = new Math();

describe("Test the Math suite", function(){

    after(() => {
        // Implement your logic here
        console.log("\n----After the test suite----");
    });

    before(() => {
        // Implement your logic here
        console.log("----Before the test suite----\n");
    });

    afterEach(() => {
        // Implement your logic here
        console.log("\n--------After each test case--------\n\n");
    });

    beforeEach(() => {
        // Implement your logic here
        console.log("--------Before each test case--------\n");
    });

    const ArithMath = mathObj.ArithMath();
    
    it("It should add two numbers", function(){
        const result = ArithMath.addNumbers(2, 3);
        expect(result).to.be.equal(5);
    });

    it("It should spy the ArithMath function", function(){
        const spy = sinon.spy(mathObj, "ArithMath");
        // mathObj.callAFunction(7, 2);
        mathObj.ArithMath().addNumbers(3, 5);
        sinon.assert.calledOnce(spy);
        expect(spy.calledOnce).to.be.true;
    });

    it("It should spy the callBack method", function(){
        const callBack = sinon.spy();
        mathObj.callTheCallBack(callBack);
        expect(callBack.calledOnce).to.be.true;
    });

    it("Mock the greeting method", function(){
        const mock = sinon.mock(mathObj);
        const expectation = mock.expects("greeting");
        expectation.exactly(1);
        expectation.withArgs("Hello, Chris");
        const result = mathObj.callAFunction(7, 2);
        mock.verify();
        expect(result).to.be.equal(5);
    });

    
});

describe("Test the Math suite for Stub", function(){
    it("Stub the getSum method", function(){
        // const stub = sinon.stub(Math.prototype, "getSum");
        const stub = sinon.stub(mathObj, "getSum");
        stub.withArgs(45, 22)
        .onFirstCall().returns(40)
        .onSecondCall().returns(78);

        const result1 = mathObj.getSum(45, 22);
        const result2 = mathObj.getSum(45, 22);

        expect(result1).to.be.equal(40);
        expect(result2).to.be.equal(78);
    });
});

describe("Test the Promise function", function(){
    it("Should test the Promise function", function(){
        this.timeout(0);

        // Using done callback
        // mathObj.promiseFunction(3).then(function(result){
        //     expect(result).to.be.equal(6);
        //     done();
        // }).catch(done);

        // Using chai-as-promised library
        // return expect(mathObj.promiseFunction(3)).to.eventually.equal(6);

        // Using Mocha in-built Promise support
        return mathObj.promiseFunction(3).then(function(result){
            expect(result).to.be.equal(6);
        });
    });
});

describe("Xhr test suite", function(){
    it("Mock and stub an xhr call", function(done){
        // this.timeout(0);
        nock("https://jsonplaceholder.typicode.com")
        .get("/posts")
        .reply(200, 50);
        mathObj.xhrFunction().then(function(result){
            console.log(result);
            expect(result).to.be.equal(50);
            done();
        }).catch(err => {
            done(new Error("XhrFunction test failed"));
        });
    });
});