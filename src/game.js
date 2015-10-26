// GameScene Class 
var GameScene = cc.Scene.extend({

	/*
     * private variables
     */        
    gamescene: null,
    gamelevel: null,
    level: 1,
    studio: {},             
       
           
    /*
     * initial setup, treat as contructor
     */
    onEnter:function () {
        this._super();                                       
        var size = cc.winSize;
        
        // init Physics        
        Physics.initPhysics();        
        this.scheduleUpdate();                              
        
        // attached the GummyBubble singleton
        GummyBubbles.scene = this;
                        
        // add the scene to the view
        this.gamescene = ccs.load(res.GameScene_json);                        
        this.addChild(this.gamescene.node);                        
      
        // setup Studio assets    
        studio = this.getCocosStudioAssets(this.gamescene);                        
		studio.instructionLayer.setVisible( true );
        studio.tapScreen.addTouchEventListener( this.touchEvent, this );                                        
    },
    
    
    /*
     * perform some cleanup
     */  
    onExit : function() {        
        Physics.space.removeCollisionHandler(  1  , 2 );          
    }, 
    
    
    /*
     * start the game
     */  
    initGame : function() {        
        
        var moveAnimation = function( pXY ) {
            var move = cc.moveBy( 400.0 , pXY );
            var move_back = move.reverse();
            var delay = cc.delayTime(0.25);
            var move_seq = cc.sequence( move, move_back );
            var move_rep = move_seq.repeatForever(); 
            return move_rep;        
        };
        
        console.log("Starte ititidka");
        studio.clouds.runAction( moveAnimation( cc.p(0 - studio.clouds.width , studio.clouds.y) ) );  
        studio.mountains.runAction( moveAnimation( cc.p( studio.mountains.x + 250 , studio.mountains.y) ) );
        
        // start shooting out gummy bubbles                
        for(var g = 0; g < GummyBubbles.gummyBubblesOnScreen; g++) {                        
            var gummyRandom = GummyBubbles.generateRandomNumber();            
            GummyBubbles.bubbleInit(GummyBubbles.gummyBubblesTypes[gummyRandom]);                                              
            GummyBubbles.gummyBubbleTag++;            
        } 
        
        // add physics collision handler
        Physics.space.addCollisionHandler( 1 , 2,
                Physics.collisionBegin.bind(this),
                null,
                null,
                Physics.collisionEnd.bind(this)
        );                                   
    },
    
    
     /*
     * get and set all the studio assets from Cocos Studio
     */  
    getCocosStudioAssets: function(scene) {                                                         
        var studioObj = {};
        
        studioObj.tapScreen = scene.node.getChildByName( "tap_to_start_screen" );
        studioObj.panel_level = scene.node.getChildByName( "panel_level_"+this.level.toString() );                                                         
        studioObj.clouds = studioObj.panel_level.getChildByName( "clouds" );                
        studioObj.mountains = studioObj.panel_level.getChildByName( "mountains" );                
                                
        console.log("CLOUDS");
        
        var setProperties = function(screen, btn, res, scale) {
                console.log(screen + "  " + btn);
                studioObj.instructionLayer = scene.node.getChildByName( screen );                                
                GummyBubbles.resFolderName =  (res) ? res : GummyBubbles.resFolderName;
                GummyBubbles.resScaledTimes = (scale) ? scale : GummyBubbles.resScaledTimes;  
        }
        
        // Get the proper res background for device 
        if (cc.sys.isNative) {                           
            if (cc.view.getFrameSize().width >= 2048) {                                                           
                setProperties( 'how_to_play_super_large' , 'pause_btn_big' , 'largeRes' , '@3x' );
                
                // ipad retina
                if (cc.view.getFrameSize().width == 2048 && cc.view.getFrameSize().height == 1536) {                                                           
                    console.log("Instruction Layer x postion: "+studioObj.instructionLayer.x);
                    studioObj.instructionLayer.setPosition( cc.p(-100, 0) );
                    studioObj.panel_level.setScale( 2.0 );
                    studioObj.panel_level.setPosition( cc.p(-100, 0) ); 
                    studioObj.tapScreen.setPosition( cc.p(-100, 0) );                   
                }
                
                // iphone plus
                if(cc.view.getFrameSize().width >= 2208) {
					studioObj.instructionLayer.setScale( 0.5 );                    
				}                                                                                                                     
            }
            else if (cc.view.getFrameSize().width >= 1334) {                             
                setProperties( 'how_to_play_medium' , 'pause_btn_medium' , 'mediumRes' , '@2x' );                
            }
            else if (cc.view.getFrameSize().width >= 1136) {                               
                setProperties( 'how_to_play_medium' , 'pause_btn_small' , 'mediumRes' , '@2x' );                                                            
            }
            else {                               
                setProperties( 'how_to_play_small' , 'pause_btn_small');               
            }                           
        }
        else {               
            setProperties( 'how_to_play_small' , 'pause_btn_small');                           
        } 
        
        return studioObj;       
    }, 
    
    
    /*
     * when play button is tapped
     */ 
    touchEvent: function(sender, type) {
        switch (type)
        {
        case ccui.Widget.TOUCH_BEGAN:  
            console.log("Start the Game");            
            studio.tapScreen.removeFromParent();                      
            studio.instructionLayer.removeFromParent();            
            this.initGame();            
            break;        
        }
    },                                                         
    
    
    // PHYSICS DELEGATES BELOW
    /*
     * updater
     */        
    update:function (dt) {
        // chipmunk step
        Physics.space.step(dt);       
    }	
		
});
 