(function () {
var testobj = new Test.TAP.Class();
testobj.plan(20)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Joose.Managed.Meta");
    
    this.ok(Joose.Managed.Meta, "Joose.Managed.Meta is here");
    
    
    //==================================================================================================================================================================================
    this.diag("Creation & managed extending (building)");
    
    var TestClass = new Joose.Managed.Meta('TestClass', null, null, {
        have : {
            res : true
        },
        
        methods : {
            result : function() { return 'TestClass' }
        }
    }).c;
    
    this.ok(typeof TestClass == 'function', "TestClass was created");
    
    this.ok(TestClass.meta.hasAttribute('res'), "TestClass has 'res' attribute"); 
    this.ok(TestClass.meta.hasMethod('result'), "TestClass has 'result' method");

    this.ok(TestClass.meta.hasOwnAttribute('res'), "TestClass has own 'res' attribute"); 
    this.ok(TestClass.meta.hasOwnMethod('result'), "TestClass has own 'result' method");
    
    this.ok(TestClass.meta.hasMethod('initialize'), "TestClass has 'initialize' method");
    this.ok(TestClass.meta.hasMethod('SUPER'), "TestClass has 'SUPER' method");
    
    this.ok(!TestClass.meta.hasOwnMethod('initialize'), "TestClass doesnt have own 'initialize' method");
    this.ok(!TestClass.meta.hasOwnMethod('SUPER'), "TestClass doesnt have own 'SUPER' method");
    
    var testClass = new TestClass();
    
    this.ok(testClass, "TestClass was instantiated");
    this.ok(testClass.res, "Attribute was correctly installed");
    this.is(testClass.result(), 'TestClass', "Method was correctly installed");
    
    
    //==================================================================================================================================================================================
    this.diag("Extending of builder");
    
    var TestClass1 = new Joose.Managed.Meta('TestClass1', null, TestClass, {
        builder : {
            testHandler : function(meta, props){
                var name = props.name;
                var value = props.value;
                
                meta.addMethod(name, function(){
                    return value;
                });
            }
        },
        
        testHandler : {
            name : 'result',
            value : 'TestClass1'
        }
        
    }).c;
    
    this.ok(TestClass1.meta.hasMethod('result'), "Method was added via extended builder");
    
    var testClass1 = new TestClass1();
    
    this.is(testClass1.result(), 'TestClass1', "... and it works correctly");
    

    //==================================================================================================================================================================================
    this.diag("Method & Attribute objects");
    
    var result = TestClass1.meta.getMethod('result');
    
    this.ok(result instanceof Joose.Proto.Method, "'result' method have a meta object - instance of Joose.Proto.Method");
    
    this.ok(result.value == testClass1.result, "Body of 'result' method is a 'value' property of its meta");
    
    this.ok(result.target == TestClass1, "Method's Class is defined via 'target' property");
    this.ok(result.container == TestClass1.prototype, "Method's container is defined via 'container' property and its a prototype of Class");
    
    
    var res = TestClass1.meta.getAttribute('res');
    
    this.ok(res instanceof Joose.Proto.Attribute, "'res' attribute have a meta object - instance of Joose.Proto.Attribute");
    
    this.ok(res.value == testClass1.res, "Default value of 'res' attribute is a 'value' property of its meta");
    
    this.ok(!TestClass1.meta.hasOwnAttribute('res'), "TestClass1 dont have own 'res' attribute - so it point to the actual class it was defined in");
    this.ok(res.target == TestClass, "Method's Class is defined via 'target' property");
    this.ok(res.container == TestClass.prototype, "Method's container is defined via 'container' property and its a prototype of Class");
    
    
    //==================================================================================================================================================================================
    this.diag("Mutability");
    
    this.ok(TestClass1.meta.hasOwnMethod('result'), "TestClass1 has own 'result' method");
    
    TestClass1.meta.removeMethod('result');
    
    this.ok(!TestClass1.meta.hasOwnMethod('result'), "TestClass1 dont have own 'result' method");
    this.ok(TestClass1.meta.hasMethod('result'), "TestClass1 still have inherited 'result' method");
    this.is(testClass1.result(), 'TestClass', "... and it works correctly");
    
    TestClass.meta.removeMethod('result');
    this.ok(!TestClass1.meta.hasMethod('result'), "TestClass1 now dont have any 'result''s methods");
    
};

return testobj;
})()