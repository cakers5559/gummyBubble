// GameScene Class 
var GameScene = cc.Scene.extend({

	/*
     * private variables
     */        
    gamescene: null,
    gamelevel: null,
    level: 1,
    didPause: false,
    studio: {}, 
    gummies: [],            
       
           
    /*
     * initial setup, treat as contructor
     */
    onEnter:function () {
        this._super();                                                                       
                
        GummyBubbles.isGameActive = true;
        this.didPause = false;
                        
        if(!GummyBubbles.gummyPaused) {           
            this.levelChange();
            
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
            
            this.studio.pauseBtn.addTouchEventListener( this.onPause, this );                
            this.studio.gummiesTxt.setPositionY( this.studio.gummiesTxt.y + 10 );
            this.studio.missesTxt.setPositionY( this.studio.missesTxt.y + 10 );
            if (cc.view.getFrameSize().width == 2048 && cc.view.getFrameSize().height == 1536) {
                    this.studio.missesTxt.setPositionY( this.studio.missesTxt.y + 125 );
                    this.studio.gummiesTxt.setPositionY( this.studio.gummiesTxt.y + 125 );
                    this.studio.pauseBtn.setPositionY( this.studio.pauseBtn.y + 125 );
            }            
            
             // create gummy 
            var gumm = ['bear-41x42','worm-34x42','fish-41x41'];
            var pathToAssets = 'res/images/' + GummyBubbles.resFolderName;
            var imageScale = GummyBubbles.getImageScale();
            
            for(var i = 0; i < gumm.length; i++) {                    
                var gummy = new cc.Sprite( pathToAssets + '/' + gumm[i] + GummyBubbles.resScaledTimes + '.png' );
                this.addChild(gummy);                                
                gummy.setPosition( gummy.width / (2 + i) , gummy.height / 2 );       
                gummy.setOpacity( 50 ); 
                this.gummies.push(gummy);        
            }                       
        }          
        
        GummyBubbles.gummyPaused = false;                                                                          
    },
    
    
    onPause: function(sender, type) {         
         switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN: 
                this.didPause = true;
                cc.audioEngine.setEffectsVolume( 3.25 );
                cc.audioEngine.playEffect( "res/audio/click.mp3" );       
                console.log("PAUSED!!!");                                             
                cc.director.pushScene(  new PauseScene() );                                                         
                break;        
        }                               
    },  
    
    /*
     * perform some cleanup
     */  
    onExit: function() {        
        // stops the background music
       if(!this.didPause) {
            GummyBubbles.isGameActive = false;
            cc.audioEngine.stopMusic();
            Physics.space.removeCollisionHandler(  1  , 2 );                    
            GummyBubbles.cleanUp();        
            this.unschedule();  
       }       
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
        
        // create the gummies basket
        GummyBubbles.basketInit();
        console.log("The Gummy Mode is: "+GummyBubbles.gummyBubblesOnScreen + "  "+ GummyBubbles.gummyBubbleSpeed);
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
        studioObj.missesTxt = studioObj.panel_level.getChildByName( "misses_txt" );             
        studioObj.pauseScreen = scene.node.getChildByName( "pause_layer" ); 
        studioObj.gummiesTxt.width = studioObj.gummiesTxt.width + 150;        
        studioObj.missesTxt.width = studioObj.missesTxt.width + 150;
        studioObj.pauseBtn.setPositionX( studioObj.pauseBtn.width - ( studioObj.pauseBtn.width / 2) );
        studioObj.gummiesTxt.setPositionX( size.width - ( studioObj.gummiesTxt.width + 20 ) );
        studioObj.missesTxt.setPositionX( size.width / 2 );                                                                       
        
        var setProperties = function(screen, btn, res, scale) {                
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
                    studioObj.instructionLayer.setPosition( cc.p(-100, 0) );
                    studioObj.panel_level.setScale( 2.0 );
                    studioObj.panel_level.setPosition( cc.p(-100, 0) ); 
                    studioObj.tapScreen.setPosition( cc.p(-100, 0) );  
                    studioObj.pauseBtn.setPositionX( studioObj.pauseBtn.width );                     
                    studioObj.gummiesTxt.setPositionX( 790.00 );
                    studioObj.missesTxt.setPositionX( 590.00 );                
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
        cc.audioEngine.setEffectsVolume( 3.25 );
        cc.audioEngine.playEffect( "res/audio/gotitem.mp3" );
        
        var stars = cc.ParticleSystem( "res/images/score.plist" );        
        
        var removeStars = function(s) {
            s.removeFromParent();            
        }    
        
        stars.setScale( 0.3 );
        stars.setPosition( x , y );        
        this.addChild(stars);  
        console.log("YOUR GUMMY SCORE IS: "+GummyBubbles.gummyScore);
        var starsDelay = cc.delayTime(1.0);                
        stars.runAction(cc.sequence(starsDelay, cc.callFunc(removeStars, stars)));                                      
    }, 
    
    
    levelChange: function() {  
       console.log("THIS LEVEL IS: "+GummyBubbles.gummyLevel)
       if("level"+GummyBubbles.gummyLevel in this.Level) {
            GummyBubbles.gummyBubblesOnScreen = this.Level["level"+GummyBubbles.gummyLevel][gummyMode][0];
            GummyBubbles.gummyBubbleSpeed = this.Level["level"+GummyBubbles.gummyLevel][gummyMode][1];
       }
       else {            
            console.log("YOU WIN!!!");
            GummyBubbles.gummyLevel--;
            GummyBubbles.gummyBubblesOnScreen = this.Level["level"+GummyBubbles.gummyLevel][gummyMode][0];
            GummyBubbles.gummyBubbleSpeed = this.Level["level"+GummyBubbles.gummyLevel][gummyMode][1];
       }
    }, 
    
    gameOver: function() {
        var ls = cc.sys.localStorage;                
        ls.setItem("gummyScore", GummyBubbles.gummyScore);
        if("bestScore" in ls) {
            var bestScore = ls.getItem("bestScore");            
            if(bestScore > GummyBubbles.gummyScore) ls.setItem("bestScore" , GummyBubbles.gummyScore);
        }        
        
        cc.audioEngine.playEffect( "res/audio/party_horn.mp3" );                                             
        cc.director.pushScene(  new GameOverScene() );
    },   
           
    
    /*
     * when play button is tapped
     */ 
    touchEvent: function(sender, type) {        
        switch (type)
        {
        case ccui.Widget.TOUCH_BEGAN:  
            cc.audioEngine.setEffectsVolume( 3.25 );
            cc.audioEngine.playEffect( "res/audio/click.mp3" );
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
            //var bigger = cc.rect          
            if (cc.rectContainsPoint(basketRect, gummyRect)) {                            
                var sprite = GummyBubbles.gummyPoppedItems[i].sprite;
                var body = GummyBubbles.gummyPoppedItems[i].body;
                var shape = GummyBubbles.gummyPoppedItems[i].shape;                                             
                
                if(body) {                                        
                    Physics.space.removeShape(shape);
                    Physics.space.removeBody(body);
                    sprite.removeFromParent();                                                    
                }
                GummyBubbles.gummyPoppedItems.splice( i , 1);
                GummyBubbles.gummyScore++; 
                GummyBubbles.gummyInBasket++;                                               
                this.studio.gummiesTxt.setString( "Gummies: "+ GummyBubbles.gummyScore);                                 
                this.scoreEffect( GummyBubbles.basket.x , GummyBubbles.basket.height+40 );        
            }
        }
        
        if(GummyBubbles.gummyMisses <= 0) {
            console.log("GAME OVER!");                        
            this.gameOver();
            GummyBubbles.gummyMisses = 1;            
        }     
    },
    
    
    /*************************
     * LEVELS
     * ************************ */
    Level : {
	
        level1 : {
            easy: [1,6],
            normal:	[1,4],
            hard: [2,4],
        },
        
        level2 : {
            easy: [2,6],
            normal:	[2,3],
            hard: [3,4],
        },
        
        level3 : {
            easy: [2,4],
            normal:	[2,3],
            hard: [3,4],
        },
        
        level4 : {
            easy: [3,4],
            normal:	[3,3],
            hard: [4,5],
        },
        
        level5 : {
            easy: [4,4],
            normal:	[4,2],
            hard: [5,3],
        },
        
        level6 : {
            easy: [5,4],
            normal:	[5,2],
            hard: [6,1],
        },
        
        level7 : {
            easy: [5,5],
            normal:	[5,3],
            hard: [6,2],
        }
        
        
    }	       
});
 