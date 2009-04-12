Joose.Managed.Property.MethodModifier = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier', {
    
	isa : Joose.Managed.Property,

    
    prepareWrapper : function(name, target, modifier, original, isOwn, superProto){
        throw "Abstract method [prepareWrapper] of " + this + " was called";
    },
    

    apply : function(target){
        var name = this.name;
        var targetProto = target.prototype;
        var isOwn = targetProto.hasOwnProperty(name);
        var original = targetProto[name];
        var superProto = target.meta.superClass.prototype
        
        //usual original call (arguments are passed separately)
        var originalCall;
        
        if (isOwn) 
        	originalCall = function() {
	        	return original.apply(this, arguments); 
	        }
        else if (superProto.meta.constructor == Joose.Proto.Class || superProto.meta.constructor == Joose.Proto.Object)
        	originalCall = function() {
        		var beforeSUPER = this.SUPER;
        		var beforeSUPERARG = this.SUPERARG;
        		
        		this.SUPER = superProto.SUPER;
        		this.SUPERARG = superProto.SUPERARG;
        		
	        	var res = superProto[name].apply(this, arguments);
	        	
	        	this.SUPER = beforeSUPER;
	        	this.SUPERARG = beforeSUPERARG;
	        	
	        	return res
	        }
        else
        	originalCall = function() {
	        	return superProto[name].apply(this, arguments);
	        }
        
	        
        //array-ed original call (arguments are passed as array)
        var originalArgCall;
        
        if (isOwn) 
        	originalArgCall = function() {
	        	return original.apply(this, arguments[0]); 
	        }
        else if (superProto.meta.constructor == Joose.Proto.Class || superProto.meta.constructor == Joose.Proto.Object)
        	originalArgCall = function() {
        		var beforeSUPER = this.SUPER;
        		var beforeSUPERARG = this.SUPERARG;
        		
        		this.SUPER = superProto.SUPER;
        		this.SUPERARG = superProto.SUPERARG;
        		
	        	var res = superProto[name].apply(this, arguments[0]);
	        	
	        	this.SUPER = beforeSUPER;
	        	this.SUPERARG = beforeSUPERARG;
	        	
	        	return res
	        }
        else
        	originalArgCall = function() {
	        	return superProto[name].apply(this, arguments[0]);
	        }
        
        var methodWrapper = this.prepareWrapper(name, this.value, originalCall, originalArgCall, superProto);
        
        if (isOwn) methodWrapper._original = original;
        methodWrapper._contain = this.value;
        
        targetProto[name] = methodWrapper;
    },
    
    
    isAppliedTo : function(target) {
        return target.prototype[this.name] && target.prototype[this.name]._contain == this.value;
    },
    
    
    unapply : function(from){
        if (!this.isAppliedTo(from)) throw "Unapply of method [" + this.name + "] from class [" + from + "] failed";
        
        //if modifier was applied to own method - restore it
        if (from.prototype[this.name]._original) 
            from.prototype[this.name] = from.prototype[this.name]._original;
        //otherwise - just delete it, to reveal the inherited method 
        else
            delete from.prototype[this.name];
    }
    
}).c;