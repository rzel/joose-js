Joose.Managed = function(){ throw "Modules may not be instantiated." };

Joose.Managed.Meta = new Joose.Proto.Meta('Joose.Managed.Meta', null, Joose.Proto.Meta, {
    
    methodsMetaClass         : Joose.Proto.Method.Set,
    
    attributesMetaClass      : Joose.Proto.Attribute.Set,
    
    builder                  : null,

    
    initialize: function (name, constructor, superClass, extend) {
        extend = extend || {};
        if (extend.isa) {
            superClass = extend.isa;
            delete extend.isa;
        }
        
        this.SUPER(name, constructor, superClass, extend);
    },
    
    
    addSuperClass: function (classObject) {
        this.SUPER(classObject);
        
        this.attributes.meta = new this.attributesMetaClass({
            target              : this.c
        });
        
        this.methods.meta = new this.methodsMetaClass({
            target              : this.c
        });
        
        
        var builderClass = classObject.meta.builder ? new this.constructor(null, null, classObject.meta.builder.constructor).c : Joose.Proto.Builder;
        
        this.builder = new builderClass({
            target              : this.c
        });
    },
    
    
    addMethod: function (name, func, props) {
        props = props || {};
        props.init = func;
        
        return this.methods.meta.addProperty(name, props);
    },
    
    
    addAttribute: function (name, init, props) {
        props = props || {};
        props.init = init;
        
        return this.attributes.meta.addProperty(name, props);
    },
    
    
    removeMethod : function (name){
        this.methods.meta.removeProperty(name);
    },

    
    removeAttribute: function (name) {
        this.attributes.meta.removeProperty(name);
    },
    
    
    hasMethod: function (name) {
        return this.methods.meta.haveProperty(name);
    },
    
    
    hasAttribute: function (name) { 
        return this.attributes.meta.haveProperty(name);
    },
    

    hasOwnMethod: function (name) { 
        return this.methods.meta.haveOwnProperty(name);
    },
    
    
    hasOwnAttribute: function (name) {
        return this.attributes.meta.haveOwnProperty(name);
    },
    

    getMethod : function(name) {
        return this.methods.meta.getProperty(name);
    },
    
    
    getAttribute : function(name) {
        return this.attributes.meta.getProperty(name);
    },
    
    
    extend : function (props) {
        props = props || {};
        
        if (props.builder) {
            this.builder.meta.extend(props.builder);
            delete props.builder;
        }
        
        this.builder.extend(props);
    }    
    
    
}).c;