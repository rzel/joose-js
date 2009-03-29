Joose.Managed.PropertySet = new Joose.Proto.Class('Joose.Managed.PropertySet', {
    
	isa                       : Joose.Managed.Property,

    properties                : null,
    
    propertyMetaClass         : Joose.Managed.Property,
    
    
    initialize : function(name, props) {
        props = props || {};
        
        this.SUPER(name, props);
        
        this.properties = props.properties || {};
    },
    
    
    addProperty : function (name, props) {
        props.definedIn = this;
        return this.properties[name] = new (props.meta || this.propertyMetaClass)(name, props);
    },
    
    
    addPropertyObject : function (object) {
        return this.properties[object.name] = object;
    },
    
    
    removeProperty : function (name) {
        var prop = this.properties[name];
        
        delete this.properties[name];
        
        return prop;
    },
    
    
    haveProperty : function(name) {
        return typeof this.properties[name] != 'undefined';
    },
    
    
    getProperty : function(name) {
        return this.properties[name];
    },
    
    
    each : function (func, scope){
        Joose.O.each(this.properties, function(property, name){
            if (typeof property != 'undefined') func.call(scope || this, property, name)
        });
    },
    
    
    clone : function (name){
        var propsCopy = Joose.O.copy(this.props, {});
        propsCopy.properties = Joose.O.getMutableCopy(this.properties);
        
        return new this.constructor(name || this.name, propsCopy); 
    },
    
    
    cleanClone : function (name){
        var propsCopy = Joose.O.copy(this.props, {});
        propsCopy.properties = {};
        
        return new this.constructor(name || this.name, propsCopy); 
    },
    
    
    alias : function (what){
        Joose.O.each(what, function(aliasName, originalName){
            var original = this.getProperty(originalName);
            
            if (original) this.addPropertyObject(original.clone(aliasName));
        }, this);
        
        return this;
    },
    
    
    exclude : function (what){
        Joose.A.each(what, function(name){
            //not just "delete" to implicitly override possible inherited property
            if (this.properties[name]) this.properties[name] = undefined;
        }, this);
        
        return this;
    },
    
    
    flattenTo : function (target){
        this.each(function(property, name){
            var targetProperty = target.getProperty(name);
            
            if (targetProperty instanceof Joose.Managed.Property.ConflictMarker) return;
            
            if (typeof targetProperty == 'undefined') {
                target.addPropertyObject(property);
                return;
            }
            
            if (targetProperty == property) return;
            
            target.removeProperty(name);
            target.addProperty(name, {
                meta : Joose.Managed.Property.ConflictMarker
            });
        }, this);
        
        return this;
    },
    
    
    composeTo : function(target){
        this.each(function(property, name){
            var targetProperty = target.getProperty(name);
            
            if (typeof targetProperty == 'undefined') target.addPropertyObject(property);
            
        });
        
        return this;
    },
    
    
    composeFrom : function(){
        var flattening = this.cleanClone();
        
        Joose.A.each(arguments, function(arg) {
            var propSet = arg;
            
            if (!(arg instanceof Joose.Managed.PropertySet)) {
                propSet = arg.propertySet;
                
                if (arg.alias || arg.exclude) propSet = propSet.clone(); 
                
                if (arg.alias) propSet.alias(arg.alias);
                if (arg.exclude) propSet.exclude(arg.exclude);
            }
            
            propSet.flattenTo(flattening);
        });
        
        flattening.composeTo(this);
    },
    
    
    prepareApply : function(target){
        this.each(function(property){
            property.prepareApply(target);
        })
    },
    
    
    apply : function(target){
        this.each(function(property){
            property.apply(target);
        })
    },
    
    
    unapply : function(from){
        this.each(function(property){
            property.unapply(from);
        })
    }
    
    
}).c;