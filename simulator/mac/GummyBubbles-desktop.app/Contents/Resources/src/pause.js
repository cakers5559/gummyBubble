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
                  		        
       
        retryBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:                    
                    cc.audioEngine.setEffectsVolume( 3.25 );
                    cc.audioEngine.playEffect( "res/audio/click.mp3" );                   
                    console.log("Retry the pause");
                    cc.director.resume();              
                    cc.director.popToSceneStackLevel(1);
                    cc.director.replaceScene(new GameScene());                                                           
                break;        
            }
        }, this );
        
        continueBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN: 
                    cc.audioEngine.setEffectsVolume( 3.25 );
                    cc.audioEngine.playEffect( "res/audio/click.mp3" );                                                               
                    GummyBubbles.gummyPaused = true;
                    cc.director.popScene();
                    cc.director.resume();
                    cc.audioEngine.resumeMusic();                              
                break;        
            }
        }, this );
        
        exitBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:
                    GummyBubbles.gummyPaused = false;
                    cc.audioEngine.setEffectsVolume( 3.25 );
                    cc.audioEngine.playEffect( "res/audio/click.mp3" );                                                                                                                               
                    console.log("Exit the pause"); 
                    GummyBubbles.scene.gamescene = null;                   
                    cc.director.resume();              
                    cc.director.popToSceneStackLevel(1);
                    cc.director.replaceScene(new MainScene());                                                                                                                                                                 
                break;        
            }
        }, this );
        
        cc.director.pause();
        cc.audioEngine.pauseMusic();                                                                               
	},
    
    /*
     * perform some cleanup
     */  
    onExit: function() {                              
        if(!GummyBubbles.gummyPaused) {
            console.log("Clean it up");
            GummyBubbles.isGameActive = false;
            GummyBubbles.cleanUp();
        }           
    }              
	
});