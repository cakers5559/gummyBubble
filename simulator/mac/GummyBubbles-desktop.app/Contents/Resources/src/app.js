// MainScene Class 
var MainScene = cc.Scene.extend({
    
    /*
     * private variables
     */        
    mainscene: null,              
           
    /*
     * initial setup, treat as contructor
     */
    onEnter:function () {
        this._super();                                       
        var size = cc.winSize;                                        
          
          
        if( cc.sys.ANDROID === cc.sys.platform ) {
            console.log("ANDROID DEVICE");
        }      
        //BannerADCommunication.awayFromGameScreen();
      
        // init Physics        
        Physics.initPhysics();        
        this.scheduleUpdate();                              
        
        cc.audioEngine.playMusic( "res/audio/intro.mp3", true );
        cc.audioEngine.setMusicVolume( 0.10 );
        
        // attached the GummyBubble singleton        
        GummyBubbles.scene = this;
        this.isGameActive = false;
        
        // add the scene to the view
        this.mainscene = ccs.load(res.MainScene_json);                
        this.addChild(this.mainscene.node);                        
                
        // setup Studio assets    
        var studioObj = this.getCocosStudioAssets(this.mainscene);                
        
        studioObj.bgLayer.setVisible( true );        
        
        studioObj.playBtn.setVisible( true );                
        studioObj.playBtn.setPosition( size.width / 2 , (size.height / 2) - (size.height / 6)  );        
        studioObj.playBtn.addTouchEventListener( this.touchEvent, this );  
        
        studioObj.settingsBtn.addTouchEventListener( this.touchSettingsEvent, this );      
        
        studioObj.title.setPosition( size.width / 2 , ((size.height / 2) / 2) * 3 );   
               
        var rotAct = cc.rotateBy( 75, 360);
        var seq = cc.sequence(rotAct);
        studioObj.sunbrust.runAction(seq.repeatForever()); 
        studioObj.sunbrust.setPosition( size.width / 2 , ((size.height / 2) / 2) / 3);                       
                
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
        
        if(GummyBubbles.gummyExit) cc.director.popToSceneStackLevel(1);                                  
    },
               
    
     /*
     * get and set all the studio assets from Cocos Studio
     */  
    getCocosStudioAssets: function(scene) {        
        var studioObj = {};                          
        
        // Get the main screen title and the background sunbrust
        studioObj.title = scene.node.getChildByName( 'gummy_bubbles_title' );
        studioObj.sunbrust = scene.node.getChildByName( 'sunbrust' );
        studioObj.panel_settings = scene.node.getChildByName( "panel_settings" );
        studioObj.settingsBtn = studioObj.panel_settings.getChildByName( "settings_btn" );
        studioObj.settingsBtn.setPositionX( studioObj.settingsBtn.width - ( studioObj.settingsBtn.width / 2) );
        
        // FUTURE FEATURE
        studioObj.settingsBtn.setVisible( false );
        
        var setProperties = function(screen, btn, res, scale) {                
                studioObj.bgLayer = scene.node.getChildByName( screen );
                studioObj.playBtn = scene.node.getChildByName( btn );
                GummyBubbles.resFolderName =  (res) ? res : GummyBubbles.resFolderName;
                GummyBubbles.resScaledTimes = (scale) ? scale : GummyBubbles.resScaledTimes;  
        }
        
        // Get the proper res background for device 
        if (cc.sys.isNative) {                           
            if (cc.view.getFrameSize().width >= 2048) {                                                           
                setProperties( 'bg_super_large' , 'play_btn_big' , 'largeRes' , '@3x' );
                
                // ipad retina
                if (cc.view.getFrameSize().width == 2048 && cc.view.getFrameSize().height == 1536) {                                       
                    studioObj.title.setScale( 2.0 );
                    studioObj.playBtn.setScale( 1.0 );
                    studioObj.panel_settings.setScale( 2.0 );
                    studioObj.panel_settings.setPosition( cc.p(-100, 0) ); 
                    studioObj.settingsBtn.setPositionX( studioObj.settingsBtn.width );
                    studioObj.settingsBtn.setPositionY( studioObj.settingsBtn.y + 125 );                    
                }
                
                // iphone plus
                if(cc.view.getFrameSize().width >= 2208) studioObj.bgLayer.setScale( 0.5 );                                                                                                                     
            }
            else if (cc.view.getFrameSize().width >= 1334) {                             
                setProperties( 'bg_medium' , 'play_btn_medium' , 'mediumRes' , '@2x' );
                studioObj.playBtn.setScale( 0.75 );   
            }
            else if (cc.view.getFrameSize().width === 1280 && cc.view.getFrameSize().height === 800) {
                setProperties( 'bg_medium' , 'play_btn_small' , 'mediumRes' , '@2x' );
                studioObj.bgLayer.setScale( 1.1 );
                studioObj.playBtn.setScale( 1.2 );
            }
            else if (cc.view.getFrameSize().width >= 1136) {                               
                setProperties( 'bg_medium' , 'play_btn_small' , 'mediumRes' , '@2x' );
                studioObj.playBtn.setScale( 1.3 );                                                                            
            }
            else if (cc.view.getFrameSize().width >= 1024) {  
                setProperties( 'bg_medium' , 'play_btn_small' , 'mediumRes' , '@2x' );
            }
            else if (cc.view.getFrameSize().width == 800 || cc.view.getFrameSize().width == 854) {
                setProperties( 'bg_medium' , 'play_btn_small' );
                
                if( cc.view.getFrameSize().width == 854 ) studioObj.bgLayer.setScale( 0.8 );
                else studioObj.bgLayer.setScale( 0.7 );
            }
            else {                               
                setProperties( 'bg_small' , 'play_btn_small');               
            }                           
        }
        else {               
            setProperties( 'bg_small' , 'play_btn_small');                           
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
            if(GummyBubbles.timer) clearTimeout(GummyBubbles.timer);
            cc.audioEngine.setEffectsVolume( 3.25 );
            cc.audioEngine.playEffect( "res/audio/click.mp3" );                       
            Physics.space.removeCollisionHandler(  1  , 2 );
            GummyBubbles.cleanUp();
            this.unschedule();                           
            cc.director.popToSceneStackLevel(1);
            cc.director.replaceScene( new GameScene());
            //cc.director.replaceScene( new LevelsScene());                        
            break;        
        }
        
        return true;
    }, 
    
    
     /*
     * when play button is tapped
     */ 
    touchSettingsEvent: function(sender, type) {
        switch (type)
        {
        case ccui.Widget.TOUCH_BEGAN: 
            cc.audioEngine.setEffectsVolume( 3.25 );
            cc.audioEngine.playEffect( "res/audio/click.mp3" );           
            Physics.space.removeCollisionHandler(  1  , 2 );
            GummyBubbles.cleanUp();
            this.unschedule();                           
            cc.director.runScene( new cc.TransitionFade( 1.0, new SettingsScene() ) );
                        
            break;        
        }
        
        return true;
    }, 
    
    
    /*
     * perform some cleanup
     */  
    onExit : function() {                
        Physics.space.removeCollisionHandler(  1  , 2 );        
        GummyBubbles.cleanUp();        
        // stops the background music
        
        //cc.audioEngine.stopMusic( );
        this.unschedule();
        this.removeAllChildrenWithCleanup( true ); 
        cc.director.resume();                                 
    },                                                        
    
    
    // PHYSICS DELEGATES BELOW
    /*
     * updater
     */        
    update: function (dt) {
        // chipmunk step
        Physics.space.step(dt);       
    }
});

var BannerADCommunication = {
    
    showBanner: function() {
        if(cc.sys.IPHONE === cc.sys.platform || cc.sys.IPAD === cc.sys.platform) {
            jsb.reflection.callStaticMethod("AppController", "showAdView");                                               
        }
    },
    
    hideBanner: function() {
       if(cc.sys.IPHONE === cc.sys.platform || cc.sys.IPAD === cc.sys.platform) {
            jsb.reflection.callStaticMethod("AppController", "hideAdView");                                               
        } 
    },
    
    atGameScreen: function() {
        if(cc.sys.IPHONE === cc.sys.platform || cc.sys.IPAD === cc.sys.platform) {
            jsb.reflection.callStaticMethod("AppController", "atGameScreen");                                               
        }
    },
    
    awayFromGameScreen: function() {
       if(cc.sys.IPHONE === cc.sys.platform || cc.sys.IPAD === cc.sys.platform) {
            jsb.reflection.callStaticMethod("AppController", "awayFromGameScreen");                                               
        } 
    }   
};

