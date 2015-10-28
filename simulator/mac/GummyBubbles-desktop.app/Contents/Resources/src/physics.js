/*************************************
 * init space of chipmunk physics
 *************************************/
var Physics = {
	
    space: null,
    g_groundHeight: 0,
    g_runnerStartX: 80,
    
    // initial the chipmunk physics engine     
    initPhysics: function() {                        
        this.space = new cp.Space();       
        this.space.gravity = cp.v(0, -1500);
      
        var w = cc.winSize.width,
        h = cc.winSize.height;                        
                                
        var box = new cp.BoxShape(this.space.staticBody, 4294967295, this.g_groundHeight );
        //box.body.setPos(cp.v(0 * .5, 0 * .5));        
        box.setCollisionType( 2 );
        box.setElasticity( 0 );
        box.setFriction( 1 ); 
        this.space.addStaticShape(box);                                                                                
    },
    
                    
    collisionBegin: function ( arbiter, space ) {       
        console.log('collision begin'); 
        GummyBubbles.gummyBubbleCollide = true;                             
        return true;
    },
    

    collisionPre: function ( arbiter, space ) {
        console.log('collision pre');
        return true;
    },
    

    collisionPost: function ( arbiter, space ) {
        console.log('collision post');
    },


    collisionSeparate: function ( arbiter, space ) {
        console.log('collision separate');
    },

    
    collisionEnd: function ( arbiter , space ) {
        console.log('collision end');                                
        return true;                
    },  
    
    
    createPhysicsSprite: function(path, x , y , tagNumber) {
                
        var sprite = new cc.PhysicsSprite(path);
        sprite.setTag( tagNumber );
        var contentSize = sprite.getContentSize();        
        var body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));                
        body.p = cc.p( x , y );                
        this.space.addBody(body);
        
        var shape = new cp.BoxShape( body, contentSize.width - 14, contentSize.height);
        shape.setElasticity( 0 );
        shape.setFriction( 1 );                                         
        shape.setCollisionType( 1 );                          
        this.space.addShape( shape );        
        shape.group = 10;                                        
        sprite.setBody( body ); 
        
        GummyBubbles.gummyPoppedItems.push({ sprite : sprite , body : body , shape : shape });        
        
        return sprite
    }	                    			
};