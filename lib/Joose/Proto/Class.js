(function(){

    Joose.Proto.Class = function (){
        this.initialize.apply(this, arguments);
    }
    
    
    var bootstrap = {
        
        constructor: Joose.Proto.Class,
        superClass : null,
        
        name: null,
        
        attributes: null,
        
        methods: null,
        
        meta: null,
        
        c: null,
        
        defaultSuperClass : Joose.Proto.Object,
        
        
        initialize: function (name, extend) {
            this.name = name;
            extend = extend || {};
    
            this.preprocessExtend(extend);
            this.finalizeExtend(extend);
            
            this.processStem(extend);
            
            this.extend(extend);
        },
        
        
        preprocessExtend : function(extend){
            this.c = extend.hasOwnProperty('constructor') ? extend.constructor : this.defaultClassFunctionBody();
            delete extend.constructor;
            
            this.superClass = extend.isa || this.defaultSuperClass;
            delete extend.isa;
        },
        
        
        finalizeExtend : function(extend){
            this.processSuperClass();
            this.adoptConstructor();
        },
        
        
        processStem : function(){
            var superMeta = this.superClass.meta;
            
            this.methods        = Joose.O.getMutableCopy(superMeta.methods);
            this.attributes     = Joose.O.getMutableCopy(superMeta.attributes);
        },
        
        
        
        defaultClassFunctionBody: function () {
            return function () {
                this.initialize.apply(this, arguments);
            };
        },
        
        
        processSuperClass: function () {
            this.c.prototype    = Joose.O.getMutableCopy(this.superClass.prototype);
            this.c.superClass   = this.superClass.prototype;
        },
        
        
        addMethod: function (name, func) {
            func.SUPER = this.superClass.prototype;
            
            //chrome don't allow to redefine the "name" property
            func.methodName = name;
            
            this.methods[name] = func;
            this.c.prototype[name] = func;
        },
        
        
        addAttribute: function (name, init) {
            this.attributes[name] = init;
            this.c.prototype[name] = init;
        },
        
        
        removeMethod : function (name){
            delete this.methods[name];
            delete this.c.prototype[name];
        },
    
        
        removeAttribute: function (name) {
            delete this.attributes[name];
            delete this.c.prototype[name];
        },
        
        
        hasMethod: function (name) { 
            return Boolean(this.methods[name]);
        },
        
        
        hasAttribute: function (name) { 
            return typeof this.attributes[name] != 'undefined';
        },
        
    
        hasOwnMethod: function (name) { 
            return this.hasMethod(name) && this.methods.hasOwnProperty(name);
        },
        
        
        hasOwnAttribute: function (name) { 
            return this.hasAttribute(name) && this.attributes.hasOwnProperty(name);
        },
        
        
        adoptConstructor: function(){
            var c = this.c;
        
            //this will fix weird semantic of native "constructor" property to more intuitive (idea borrowed from Ext)
            c.prototype.constructor = c;
            c.prototype.meta = this;
            c.meta = this;
            
            if (!c.hasOwnProperty('toString')) c.toString = function () { return this.meta.name }
        },
    
        
        extend : function (props) {
            Joose.O.eachSafe(props, function (value, name) {
                if (name != 'meta' && name != 'constructor') 
                    if (typeof props[name] == 'function' && !props[name].meta) this.addMethod(name, value); else this.addAttribute(name, value);
            }, this);
        },
    
    
        subClassOf : function(classObject, extend) {
            extend = extend || {};
            extend.isa = classObject || this.c;
            return new this.constructor(null, extend).c;
        }
        
    }; 
    
    //micro bootstraping
    
    Joose.Proto.Class.prototype = Joose.O.getMutableCopy(Joose.Proto.Object.prototype);
    
    Joose.O.extend(Joose.Proto.Class.prototype, bootstrap)
    
    Joose.Proto.Class.prototype.meta = new Joose.Proto.Class('Joose.Proto.Class', bootstrap);    
    
})();