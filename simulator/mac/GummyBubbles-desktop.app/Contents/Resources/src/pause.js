// PauseScene Class 
var PauseScene = cc.Scene.extend({
    
    /*
     * private variables
     */        
    pausescene: null,                      
         
    /*
     * initial setup, treat as contructor
     */
    onEnter:function () {
		this._super();                                       
        var size = cc.winSize;                
        
        BannerADCommunication.awayFromGameScreen();
        BannerADCommunication.showBanner();        
        
        //add the scene to the view
        this.pausescene = ccs.load(res.PauseScene_json);                
        this.addChild(this.pausescene.node);                
        
        var pausePanel = this.pausescene.node.getChildByName( 'pause_panel' );                
        var retryBtn = this.pausescene.node.getChildByName( 'retry_btn' );
        var continueBtn = this.pausescene.node.getChildByName( 'continue_btn' );
        var exitBtn = this.pausescene.node.getChildByName( 'exit_btn' );
                                                     
        retryBtn.setPositionX( size.width / 2 );
        continueBtn.setPositionX( size.width / 2 );
        exitBtn.setPositionX( size.width / 2 ); 
               
        if (cc.view.getFrameSize().width == 2048 && cc.view.getFrameSize().height == 1536) {                                                                                                   
                    pausePanel.setScale( 2.0 );
                    //pausePanel.setPosition( cc.p(-100, 0) );
                    retryBtn.setScale( 1.0 );
                    retryBtn.setPositionY( ((size.height / 4) * 3) - (retryBtn.height/2) );
                    //retryBtn.setPosition( cc.p(-100, 0) );
                    continueBtn.setScale( 1.0 );
                    continueBtn.setPositionY( size.height / 2 );
                    //continueBtn.setPosition( cc.p(-100, 0) );
                    exitBtn.setScale( 1.0 );
                    exitBtn.setPositionY( size.height / 4 + (exitBtn.height/2) );                                                                                                                                                                                     
                    //exitBtn.setPosition( cc.p(-100, 0) );                                                                                                   
        }
        else if (cc.view.getFrameSize().width == 1334 && cc.view.getFrameSize().height == 750 ||
                 cc.view.getFrameSize().width == 1136 && cc.view.getFrameSize().height == 640) {                                         
                    retryBtn.setScale( 0.4 );
                    
                    //retryBtn.setPosition( cc.p(-100, 0) );
                    continueBtn.setScale( 0.4 );
                    
                    //continueBtn.setPosition( cc.p(-100, 0) );
                    exitBtn.setScale( 0.4 );
                    
                    retryBtn.setPositionY( size.height - (size.height / 2.9) );                            
                    exitBtn.setPositionY( size.height / 3.2 );
                       
        }
        else if (cc.view.getFrameSize().width === 1280 && cc.view.getFrameSize().height === 800) {
                continueBtn.setPositionY( size.height / 2 );
                retryBtn.setPositionY( size.height - (size.height / 2.9) );                            
                exitBtn.setPositionY( size.height / 2.9 );
        }     
        else if(cc.view.getFrameSize().width == 800 || cc.view.getFrameSize().width == 854) {				 
                 retryBtn.setScale( 0.3 );                                     
                 continueBtn.setScale( 0.3 );                    
                 exitBtn.setScale( 0.3 );                 
		}                   		        
       
        retryBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:                                                            
                    GummyBubbles.isGameActive = false;            
                    GummyBubbles.cleanUp();
                    GummyBubbles.scene.gamescene = null;
                    if(GummyBubbles.timer) clearTimeout(GummyBubbles.timer);
                    GummyBubbles.gummyPaused = false;
                    cc.audioEngine.setEffectsVolume( 3.25 );
                    cc.audioEngine.playEffect( "res/audio/click.mp3" );                                                                                             
                    cc.director.resume();           
                    cc.director.startAnimation();
                    cc.director.popToSceneStackLevel(1);                    
                    cc.director.replaceScene(new GameScene());                                                
                    
                break;        
            }
            
            return true;
        }, this );
        
        continueBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:                                         
                    cc.audioEngine.setEffectsVolume( 3.25 );
                    cc.audioEngine.playEffect( "res/audio/click.mp3" );                                                               
                    GummyBubbles.gummyPaused = true; 
                    GummyBubbles.touchTransition = false;                                                                                                                                                                                
                    cc.audioEngine.resumeMusic();                    
                    cc.director.popToSceneStackLevel(1);
                    cc.director.resume(); 
                    cc.director.startAnimation();
                    //GummyBubbles.basketInit();                              
                break;        
            }
            
            return true;
        }, this );
        
        exitBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:                    
                    GummyBubbles.isGameActive = false;            
                    GummyBubbles.cleanUp();
                    GummyBubbles.scene.gamescene = null;
                    if(GummyBubbles.timer) clearTimeout(GummyBubbles.timer);                    
                    GummyBubbles.gummyPaused = false;
                    cc.audioEngine.setEffectsVolume( 3.25 );
                    cc.audioEngine.playEffect( "res/audio/click.mp3" );                                                                                                                                                                                                                             
                    cc.director.popToSceneStackLevel(1);
                    cc.director.replaceScene(new MainScene());
                    cc.director.resume();
                    cc.director.startAnimation();                                                                                                                                                                                     
                break;        
            }
            
            return true;
        }, this );
        
        //cc.director.pause();
        cc.director.stopAnimation();
        cc.audioEngine.pauseMusic();                                                                               
	},
    
    /*
     * perform some cleanup
     */  
    onExit: function() {                                      
        /*if(!GummyBubbles.gummyPaused) {            
           
            //GummyBubbles.isGameActive = false;            
            //GummyBubbles.cleanUp();
        } else {
           
            //GummyBubbles.cleanUp(true);            
        } */         
    }              
	
});