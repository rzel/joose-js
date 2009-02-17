var declared = false;
try {
    declared = typeof StressTest.Test001 == 'function';
} catch(e) {}
if (declared && StressTest.Test001.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test001";
}
Class('StressTest.Test001', {
    version: 0.1,
    use: [{
        'Module': 'StressTest.Test066'
    },
    {
        'Module': 'StressTest.Test034'
    },
    {
        'Module': 'StressTest.Test052'
    },
    {
        'Module': 'StressTest.Test061'
    },
    {
        'Module': 'StressTest.Test084'
    },
    {
        'Module': 'StressTest.Test017'
    },
    {
        'Module': 'StressTest.Test028'
    },
    {
        'Module': 'StressTest.Test062'
    },
    {
        'Module': 'StressTest.Test080'
    },
    {
        'Module': 'StressTest.Test026'
    },
    {
        'Module': 'StressTest.Test072'
    },
    {
        'Module': 'StressTest.Test027'
    },
    {
        'Module': 'StressTest.Test082'
    },
    {
        'Module': 'StressTest.Test025'
    },
    {
        'Module': 'StressTest.Test030'
    },
    {
        'Module': 'StressTest.Test056'
    },
    {
        'Module': 'StressTest.Test060'
    },
    {
        'Module': 'StressTest.Test065'
    },
    {
        'Module': 'StressTest.Test081'
    },
    {
        'Module': 'StressTest.Test043'
    },
    {
        'Module': 'StressTest.Test057'
    },
    {
        'Module': 'StressTest.Test088'
    },
    {
        'Module': 'StressTest.Test085'
    },
    {
        'Module': 'StressTest.Test053'
    },
    {
        'Module': 'StressTest.Test022'
    },
    {
        'Module': 'StressTest.Test042'
    },
    {
        'Module': 'StressTest.Test089'
    },
    {
        'Module': 'StressTest.Test092'
    },
    {
        'Module': 'StressTest.Test035'
    },
    {
        'Module': 'StressTest.Test097'
    },
    {
        'Module': 'StressTest.Test064'
    },
    {
        'Module': 'StressTest.Test079'
    },
    {
        'Module': 'StressTest.Test054'
    },
    {
        'Module': 'StressTest.Test016'
    },
    {
        'Module': 'StressTest.Test074'
    },
    {
        'Module': 'StressTest.Test029'
    },
    {
        'Module': 'StressTest.Test045'
    },
    {
        'Module': 'StressTest.Test033'
    },
    {
        'Module': 'StressTest.Test100'
    },
    {
        'Module': 'StressTest.Test095'
    },
    {
        'Module': 'StressTest.Test067'
    },
    {
        'Module': 'StressTest.Test044'
    },
    {
        'Module': 'StressTest.Test039'
    },
    {
        'version': 0.1,
        'Module': 'StressTest.Test002'
    },
    {
        'Module': 'StressTest.Test094'
    },
    {
        'Module': 'StressTest.Test069'
    },
    {
        'Module': 'StressTest.Test090'
    },
    {
        'Module': 'StressTest.Test040'
    },
    {
        'Module': 'StressTest.Test041'
    },
    {
        'Module': 'StressTest.Test037'
    },
    {
        'Module': 'StressTest.Test099'
    },
    {
        'Module': 'StressTest.Test091'
    },
    {
        'Module': 'StressTest.Test058'
    },
    {
        'Module': 'StressTest.Test087'
    },
    {
        'Module': 'StressTest.Test055'
    },
    {
        'Module': 'StressTest.Test051'
    },
    {
        'Module': 'StressTest.Test036'
    },
    {
        'Module': 'StressTest.Test076'
    },
    {
        'Module': 'StressTest.Test068'
    },
    {
        'Module': 'StressTest.Test059'
    },
    {
        'Module': 'StressTest.Test007'
    },
    {
        'Module': 'StressTest.Test070'
    },
    {
        'Module': 'StressTest.Test047'
    },
    {
        'Module': 'StressTest.Test073'
    },
    {
        'Module': 'StressTest.Test083'
    },
    {
        'Module': 'StressTest.Test024'
    },
    {
        'Module': 'StressTest.Test077'
    },
    {
        'Module': 'StressTest.Test078'
    },
    {
        'Module': 'StressTest.Test048'
    },
    {
        'Module': 'StressTest.Test063'
    },
    {
        'Module': 'StressTest.Test098'
    },
    {
        'Module': 'StressTest.Test093'
    },
    {
        'Module': 'StressTest.Test075'
    },
    {
        'Module': 'StressTest.Test049'
    },
    {
        'Module': 'StressTest.Test071'
    },
    {
        'Module': 'StressTest.Test031'
    },
    {
        'Module': 'StressTest.Test010'
    },
    {
        'Module': 'StressTest.Test046'
    },
    {
        'Module': 'StressTest.Test015'
    },
    {
        'Module': 'StressTest.Test096'
    },
    {
        'Module': 'StressTest.Test023'
    },
    {
        'Module': 'StressTest.Test050'
    },
    {
        'Module': 'StressTest.Test086'
    }],
    methods: {
        result: function() {
            return 1
        }
    },
    body: function() {
        if (!StressTest.Test002.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test002 is not satisfied for class StressTest.Test001";
        }
        if (!StressTest.Test007.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test007 is not satisfied for class StressTest.Test001";
        }
        if (!StressTest.Test015.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test015 is not satisfied for class StressTest.Test001";
        }
        if (!StressTest.Test024.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test024 is not satisfied for class StressTest.Test001";
        }
        if (!StressTest.Test035.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test001";
        }
        if (!StressTest.Test067.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test001";
        }
        if (!StressTest.Test080.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test001";
        }
    }
})
