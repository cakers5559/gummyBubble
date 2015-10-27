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
        
        // init Physics        
        Physics.initPhysics();        
        this.scheduleUpdate();                              
        
        // attached the GummyBubble singleton
        GummyBubbles.scene = this;
                        
        // add the scene to the view
        this.gamescene = ccs.load(res.GameScene_json);                        
        this.addChild(this.gamescene.node);                                              
        
        // setup Studio assets    
        this.studio = this.getCocosStudioAssets(this.gamescene);                        
		this.studio.instructionLayer.setVisible( true );      
        this.studio.tapScreen.addTouchEventListener( this.touchEvent, this );
        this.studio.pauseBtn.addTouchEventListener( this.onPause, this );        
        
        this.studio.gummiesTxt.setPositionY( this.studio.gummiesTxt.y + 25 );                                        
    },
    
    
    onPause: function() {
        console.log("PAUSED!!!");
        cc.director.pause();
        cc.director.stopAnimation();
        for(var i in cc.director) console.log(i);
    },  
    
    /*
     * perform some cleanup
     */  
    onExit: function() {        
        Physics.space.removeCollisionHandler(  1  , 2 );          
    },         
    
    
    /*
     * start the game
     */  
    initGame : function() {
        cc.audioEngine.playMusic( "res/audio/sunny_day.mp3", true );
        cc.audioEngine.setMusicVolume( 0.10 );
                                
        var moveAnimation = function( time , pXY ) {
            var move = cc.moveBy( time , pXY );
            var move_back = move.reverse();
            var delay = cc.delayTime(0.25);
            var move_seq = cc.sequence( move, move_back );
            var move_rep = move_seq.repeatForever(); 
            return move_rep;        
        };
                       
        this.studio.clouds.runAction( moveAnimation( 400.0 , cc.p(0 - this.studio.clouds.width , this.studio.clouds.y) ) );  
        this.studio.mountains.runAction( moveAnimation( 20.0 , cc.p( 40  , this.studio.mountains.y) ) );                        
        console.log("Starte ititidka");
        
        // create the gummies basket
        GummyBubbles.basketInit();
        
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
        var size = cc.winSize;
        var studioObj = {};
        
        studioObj.tapScreen = scene.node.getChildByName( "tap_to_start_screen" );
        studioObj.panel_level = scene.node.getChildByName( "panel_level_"+this.level.toString() );                                                         
        studioObj.clouds = studioObj.panel_level.getChildByName( "clouds" );                
        studioObj.mountains = studioObj.panel_level.getChildByName( "mountains" ); 
        studioObj.pauseBtn = studioObj.panel_level.getChildByName( "pause_btn" );
        studioObj.gummiesTxt = studioObj.panel_level.getChildByName( "gummies_txt" );              
        studioObj.gummiesTxt.width = studioObj.gummiesTxt.width + 50;
        
        studioObj.pauseBtn.setPositionX( studioObj.pauseBtn.width - ( studioObj.pauseBtn.width / 2) );
        studioObj.gummiesTxt.setPositionX( size.width - ( studioObj.gummiesTxt.width + 20 ) );                                
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
                    studioObj.pauseBtn.setPositionX( studioObj.pauseBtn.width );
                    studioObj.gummiesTxt.setPositionX( size.width - ( size.width / 3 ) );                 
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
    
    
    scoreEffect: function(x , y) {
        // unload the sound file from memory when it no longer needs to be used
        cc.audioEngine.playEffect( "res/audio/gotitem.mp3" );
        
        var stars = cc.ParticleSystem( "res/images/score.plist" );        
        
        var removeStars = function(s) {
            s.removeFromParent();
            console.log('Stars Removed ');
        }    
        
        stars.setScale( 0.3 );
        stars.setPosition( x , y );        
        this.addChild(stars);  
        console.log("YOUR GUMMY SCORE IS: "+GummyBubbles.gummyScore);
        var starsDelay = cc.delayTime(1.0);                
        stars.runAction(cc.sequence(starsDelay, cc.callFunc(removeStars, this)));                        
    },     
    
    removeScoreEffect: function() {
        
    },
    
    /*
     * when play button is tapped
     */ 
    touchEvent: function(sender, type) {
        switch (type)
        {
        case ccui.Widget.TOUCH_BEGAN:  
            console.log("Start the Game");            
            this.studio.tapScreen.removeFromParent();                      
            this.studio.instructionLayer.removeFromParent();            
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
                
        for(var i = 0; i < GummyBubbles.gummyPoppedItems.length; i++) {
            var gummyRect = GummyBubbles.gummyPoppedItems[i].sprite.getBoundingBox();
            var basketRect = GummyBubbles.basket.getBoundingBox();          
            if (cc.rectContainsPoint(basketRect, gummyRect)) {            
                console.log("COOOOOOL!!!!");
                var sprite = GummyBubbles.gummyPoppedItems[i].sprite;
                var body = GummyBubbles.gummyPoppedItems[i].body;
                var shape = GummyBubbles.gummyPoppedItems[i].shape;                                             
                
                if(body) {                    
                    console.log("IN THE BODY");
                    Physics.space.removeShape(shape);
                    Physics.space.removeBody(body);
                    sprite.removeFromParent();                                                    
                }
                GummyBubbles.gummyPoppedItems.splice( i , 1);
                GummyBubbles.gummyScore++;                                                
                this.studio.gummiesTxt.setString( "Gummies: "+ GummyBubbles.gummyScore);                                 
                this.scoreEffect( GummyBubbles.basket.x , GummyBubbles.basket.height+40 );        
            }
        }     
    }	       
});
 