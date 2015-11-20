// Global var for setting game diffculty
var gummyStage = "stage1";

// GameScene Class 
var GameScene = cc.Scene.extend({

	/*
     * private variables
     */        
    gamescene: null,
    gamelevel: null,
    level: 1,    
    label: null,
    gummyLvl: 40,    
    studio: {}, 
    gummies: [],            
       
           
    /*
     * initial setup, treat as contructor
     */
    onEnter:function () {                                                                                       
        BannerADCommunication.atGameScreen();        
        BannerADCommunication.hideBanner(); 
             
        GummyBubbles.isGameActive = true;        
           
        if(!GummyBubbles.gummyPaused) {
            this._super();
                       
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
                      
            if (cc.view.getFrameSize().width === 2048 && cc.view.getFrameSize().height === 1536 ||
                cc.view.getFrameSize().width === 1024 && cc.view.getFrameSize().height === 768) {
                    this.studio.missesTxt.setPositionY( this.studio.missesTxt.y + 125 );
                    this.studio.gummiesTxt.setPositionY( this.studio.gummiesTxt.y + 125 );                    
                    this.studio.pauseBtn.setPositionY( this.studio.pauseBtn.y + 125 );
            }
            
            this.stageSetup(gummyStage);                                                                   
        }     
        
                     
        GummyBubbles.gummyPaused = false;                                                                          
    },
    
    
    onPause: function(sender, type) {         
         switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:                                                                
                //GummyBubbles.basket = null;                
                cc.director.pause();
                cc.audioEngine.setEffectsVolume( 3.25 );
                cc.audioEngine.playEffect( "res/audio/click.mp3" );                                                                
                cc.director.pushScene( new PauseScene() );                                                         
                break;        
        }              
        return false;                 
    },  
    
    /*
     * perform some cleanup
     */  
    onExit: function() {                
        // stops the background music                               
            GummyBubbles.isGameActive = false;
            cc.audioEngine.stopMusic();
            Physics.space.removeCollisionHandler(  1  , 2 );                                
            //GummyBubbles.cleanUp(true);        
            //this.unschedule();              
    },         
    
    
    /*
     * start the game
     */  
    initGame : function() {
        BannerADCommunication.hideBanner();                
                                                           
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
                null,
                null,
                null,
                null
        );                                   
    },
    
    
     /*
     * get and set all the studio assets from Cocos Studio
     */  
    getCocosStudioAssets: function(scene) {                                                         
        var size = cc.winSize;
        var studioObj = {};
        
        studioObj.tapScreen = scene.node.getChildByName( "tap_to_start_screen" );
        studioObj.bombFlash = scene.node.getChildByName( "bomb_flash" );                
        studioObj.panel_level = scene.node.getChildByName( "panel_level_"+this.level.toString() );                                                                 
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
                    studioObj.gummiesTxt.setPositionX( 640.00 );
                    studioObj.missesTxt.setPositionX( 590.00 );                                    
                }
                
                // iphone plus
                if(cc.view.getFrameSize().width >= 2208) {
					studioObj.instructionLayer.setScale( 0.5 );                    
				}                                                                                                                     
            }
            else if(cc.view.getFrameSize().height == 600 && cc.view.getFrameSize().width == 1024 ) {                
                setProperties( 'how_to_play_small' , 'pause_btn_medium' , 'mediumRes' , '' );    
                studioObj.missesTxt.setPositionY( studioObj.missesTxt.y - 50 );
                studioObj.gummiesTxt.setPositionY( studioObj.gummiesTxt.y - 50 );                    
                studioObj.pauseBtn.setPositionY( studioObj.pauseBtn.y - 50 );
            }
            else if (cc.view.getFrameSize().width == 1024) {                             
                setProperties( 'how_to_play_small' , 'pause_btn_medium' , 'mediumRes' , '@2x' );                
            }            
            else if (cc.view.getFrameSize().width >= 1334) {                             
                setProperties( 'how_to_play_medium' , 'pause_btn_medium' , 'mediumRes' , '@2x' );                
            }
            else if (cc.view.getFrameSize().width === 1280 && cc.view.getFrameSize().height === 800) {
                setProperties( 'how_to_play_medium' , 'pause_btn_medium' , 'mediumRes' , '@2x' );
                studioObj.panel_level.setScale( 1.1 );
                studioObj.tapScreen.setPositionX( size.width / 2 );  
                studioObj.missesTxt.setPositionY( studioObj.missesTxt.y + 75 );
                studioObj.gummiesTxt.setPositionY( studioObj.gummiesTxt.y + 75 );                    
                studioObj.pauseBtn.setPositionY( studioObj.pauseBtn.y + 75 ); 
                
                studioObj.gummiesTxt.setPositionX( 730.00 );
                studioObj.missesTxt.setPositionX( (size.width / 2) - (studioObj.missesTxt.width / 4) );   
            }
            else if (cc.view.getFrameSize().width >= 1136) {                               
                setProperties( 'how_to_play_medium' , 'pause_btn_small' , 'mediumRes' , '@2x' );                                                            
            }    
            else if (cc.view.getFrameSize().width == 960 && cc.view.getFrameSize().height == 540 ) {                                               
                setProperties( 'how_to_play_small' , 'pause_btn_small' , 'mediumRes' , '@2x' );
                studioObj.panel_level.setScale( 0.82 );                
                studioObj.gummiesTxt.setPositionX( 730.00 );  
                studioObj.missesTxt.setPositionY( studioObj.missesTxt.y +25 );
                studioObj.gummiesTxt.setPositionY( studioObj.gummiesTxt.y + 25 );                    
                studioObj.pauseBtn.setPositionY( studioObj.pauseBtn.y + 25 );
                studioObj.missesTxt.setPositionX( (size.width / 2) + (studioObj.missesTxt.width / 4 ) );                                                                    
            }            
            else if(cc.view.getFrameSize().width == 800 || cc.view.getFrameSize().width == 854 ) {
				setProperties( 'how_to_play_medium' , 'pause_btn_small' );
                
                if( cc.view.getFrameSize().width == 854 ) {
                    studioObj.panel_level.setScale( 0.74 );                                 
                }
                else {
                    studioObj.panel_level.setScale( 0.7 );  
                    studioObj.missesTxt.setPositionY( studioObj.missesTxt.y + 50 );
                    studioObj.gummiesTxt.setPositionY( studioObj.gummiesTxt.y + 50 );                    
                    studioObj.pauseBtn.setPositionY( studioObj.pauseBtn.y + 50 );              
                }
                
                studioObj.instructionLayer.setScale( 0.7 );  
                
                if(cc.view.getFrameSize().width == 854) studioObj.gummiesTxt.setPositionX( 710.00 );
                else studioObj.gummiesTxt.setPositionX( 700.00 );
                
                studioObj.missesTxt.setPositionX( (size.width / 2) + (studioObj.missesTxt.width / 2 ) );                                                                   
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
        var starsDelay = cc.delayTime(1.0);                
        stars.runAction(cc.sequence(starsDelay, cc.callFunc(removeStars, stars)));                                      
    }, 
          
    levelChange: function() {         
       if("level"+GummyBubbles.gummyLevel in this.Level) {
            GummyBubbles.gummyBubblesOnScreen = this.Level["level"+GummyBubbles.gummyLevel][gummyStage][0];
            GummyBubbles.gummyBubbleSpeed = this.Level["level"+GummyBubbles.gummyLevel][gummyStage][1];
       }
       else {                        
            GummyBubbles.gummyLevel--;
            GummyBubbles.gummyBubblesOnScreen = this.Level["level"+GummyBubbles.gummyLevel][gummyStage][0];
            GummyBubbles.gummyBubbleSpeed = this.Level["level"+GummyBubbles.gummyLevel][gummyStage][1];
       }
    }, 
    
    gameOver: function() {
        gummyStage = 'stage1';
        
        if(GummyBubbles.timer) clearTimeout(GummyBubbles.timer);
        
        var ls = cc.sys.localStorage;                
        ls.setItem("gummyScore", GummyBubbles.gummyScore);
        if (ls.getItem("bestScore") !== null) {        
            var bestScore = ls.getItem("bestScore");            
            if(bestScore < GummyBubbles.gummyScore) ls.setItem("bestScore" , GummyBubbles.gummyScore);            
        }
        else {
            ls.setItem("bestScore" , GummyBubbles.gummyScore);
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
            if (cc.rectContainsPoint(basketRect, gummyRect) && !GummyBubbles.gummyPoppedItems[i].sprite.isBomb) {                            
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
                                                                                                              
                this.scoreEffect( GummyBubbles.basket.x , GummyBubbles.basket.height+40 );
                
                if(GummyBubbles.gummyScore === 120) {
                    //nothing now for update 
                }                
                else if(GummyBubbles.gummyScore === 80) {
                    this.gummyLvl = 120;
                    GummyBubbles.gummyLevel = 1;
                    gummyStage = "stage3";
                    this.levelChange();
                    this.stageSetup("stage3");
                }        
                else if(GummyBubbles.gummyScore === 40) {
                    this.gummyLvl = 80
                    GummyBubbles.gummyLevel = 1;
                    gummyStage = "stage2";
                    this.levelChange();                    
                    this.stageSetup("stage2");
                }                
                
                this.studio.gummiesTxt.setString( "Gummies: "+ GummyBubbles.gummyScore + "/" + this.gummyLvl);               
            }
        }
        
        if(GummyBubbles.gummyMisses <= 0) {                                    
            this.gameOver();
            GummyBubbles.gummyMisses = 1;            
        }     
    },
    
    
    /**************************************
     * Setup the selected stage elements
     **************************************/
    stageSetup: function(stage) {        
        cc.audioEngine.stopMusic();                        
        var size = cc.winSize;
        var moveAnimation = function( time , pXY , tag ) {
            var move = cc.moveBy( time , pXY );
            var move_back = move.reverse();
            var delay = cc.delayTime(0.25);
            var move_seq = cc.sequence( move, move_back );
            move_seq.setTag(tag);
            var move_rep = move_seq.repeatForever(); 
            return move_rep;        
        };
               
        var stageEffect = function(obj) {
            obj.studio.bombFlash.setVisible(true);
            var flasher = setTimeout(flashOnOff, 500);
            var self = obj;
            
            var stageLvl = gummyStage.substring( gummyStage.length-1 , gummyStage.length );
            
            obj.label = new cc.LabelTTF( "Level "+stageLvl, "res/Bobbleboddy.ttf", 100 );
            obj.label.x = size.width / 2;
            obj.label.y = size.height / 2;            
            obj.label.setColor( new cc.Color(254, 195, 51, 255) );
            obj.label.enableShadow({width: -5, height: -5}, 100, 4, false);
            //obj.label.enableStroke({ r : 0, g : 0, b : 0 }, 14);
            obj.label.setFontName("bubbleboddy");   
            obj.label.setLocalZOrder(10000);  
                                                                               
            var removeLabel = function(label) {
                label.removeFromParent();            
            }                                  
                           
            var labelOut = cc.fadeOut(0.5);
            var nodeAction = cc.scaleTo( 0.5, 0.7, 0.7 );               
            obj.label.runAction(cc.sequence(nodeAction, labelOut, cc.callFunc(removeLabel, obj.label)));       
                                                      
            obj.addChild(obj.label);
            
            function flashOnOff() {            
                console.log("test it out");
                self.studio.bombFlash.setVisible(false);                        
            }
        } 
        
        var fireSparks = function(obj) {
            cc.audioEngine.setEffectsVolume( 3.25 );
            cc.audioEngine.playEffect( "res/audio/fire_crackers.mp3" );
            cc.audioEngine.playEffect( "res/audio/tada.mp3" );
            
            var fireworks = cc.ParticleSystem( "res/images/firesparks.plist" );        
            
            var removeFireworks = function(s) {
                s.removeFromParent();            
            }    
            
            fireworks.setScale( 1.0 );
            fireworks.setPosition( size.width / 2 , size.height / 2 );        
            obj.addChild(fireworks);          
            var fireworksDelay = cc.delayTime(2.0);                
            fireworks.runAction(cc.sequence(fireworksDelay, cc.callFunc(removeFireworks, fireworks)));  
        }               
                
        if ('bgLevel' in this.studio) {
            for(var i = 1; i <= 3; i++) {
                this.studio.bgLevel = this.studio.panel_level.getChildByName("bg_level_"+i);
                this.studio.bgLevel.setVisible(false);   
            }
        }
        
        if ('mountains' in this.studio) {
            this.studio.mountains = this.studio.panel_level.getChildByName( "mountains" );                        
            this.studio.mountains.setVisible(false);
        }       
        
        if (!('clouds' in this.studio)) {
                    this.studio.clouds = this.studio.panel_level.getChildByName( "clouds" );                
                    this.studio.clouds.setVisible(true);
                    this.studio.clouds.runAction( moveAnimation( 400.0 , cc.p(0 - this.studio.clouds.width , this.studio.clouds.y), 104 ) );
        }     
                
        switch (stage) {
            case 'stage1': 
                cc.audioEngine.playMusic( "res/audio/sunny_day.mp3", true );                
                                                        
                this.studio.mountains = this.studio.panel_level.getChildByName( "mountains" );                        
                this.studio.mountains.setVisible(true);
                //this.studio.mountains.runAction( moveAnimation( 20.0 , cc.p( 40  , this.studio.mountains.y) , 105 ) );
                
                this.studio.bgLevel = this.studio.panel_level.getChildByName("bg_level_1");
                this.studio.bgLevel.setVisible(true);        
            break;
            case 'stage2':                
                stageEffect(this);
                fireSparks(this);
                cc.audioEngine.playMusic( "res/audio/windy.mp3", true );
                                                                                                                       
                this.studio.bgLevel = this.studio.panel_level.getChildByName("bg_level_2");
                this.studio.bgLevel.setVisible(true);                                  
            break;       
            case 'stage3':
                stageEffect(this);
                fireSparks(this);
                cc.audioEngine.playMusic( "res/audio/raining.mp3", true );
               
                this.studio.bgLevel = this.studio.panel_level.getChildByName("bg_level_3");
                this.studio.bgLevel.setVisible(true);  
            break;            
        }                                  
        console.log(stage);        
        cc.audioEngine.setMusicVolume( 0.10 );              
    },            
    
    
    /*************************
     * LEVELS
     * ************************ */
    Level : {
	
        level1 : {            
            stage1:	[1,4,0],
            stage2: [2,4,0],
            stage3: [3,4,0]
        },
        
        level2 : {            
            stage1:	[2,3,0],
            stage2: [2,3,1],
            stage3: [4,3,1]
        },
        
        level3 : {            
            stage1:	[3,3,0],
            stage2: [3,3,0],
            stage3: [5,3,0]
        },
        
        level4 : {            
            stage1:	[3,3,0],
            stage2: [3,3,1],
            stage3: [6,3,1]
        },
        
        level5 : {            
            stage1:	[4,3,0],
            stage2: [4,3,0],
            stage3: [7,3,0]
        },
        
        level6 : {            
            stage1:	[4,2,0],
            stage2: [4,2,1],
            stage3: [8,2,1]
        },
        
        level7 : {            
            stage1:	[6,2,0],
            stage2: [6,2,1],
            stage3: [9,2,1]
        },
        
        level8 : {            
            stage1:	[8,2,0],
            stage2: [9,2,1],
            stage3: [10,3,1]
        },
        
        level9 : {           
            stage1:	[8,2,0],
            stage2: [9,2,1],
            stage3: [10,2,1]
        }                
    }	       
});
 