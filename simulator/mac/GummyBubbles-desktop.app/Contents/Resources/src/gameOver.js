// PauseScene Class 
var GameOverScene = cc.Scene.extend({
    
    /*
     * private variables
     */        
    gameoverscene: null,                      
         
    /*
     * initial setup, treat as contructor
     */
    onEnter:function () {
		this._super();                                               
        var size = cc.winSize;                                
        
        //add the scene to the view
        this.gameoverscene = ccs.load(res.GameOverScene_json);                
        this.addChild(this.gameoverscene.node);                       
        
        console.log("OH!!! Game Over");
        
        var gameOverPanel = this.gameoverscene.node.getChildByName( 'gameover_panel' );                		                
        var gameOverTxt = this.gameoverscene.node.getChildByName( 'game_over_txt' );
        var gummyBasket = this.gameoverscene.node.getChildByName( 'gummy_basket' );
        var retryBtn = this.gameoverscene.node.getChildByName( 'retry_btn' );        
        var exitBtn = this.gameoverscene.node.getChildByName( 'exit_btn' );
        		
		gameOverTxt.setPositionX( size.width / 2 );                                             
        gummyBasket.setPositionX( size.width / 2 );
        retryBtn.setPositionX( size.width / 2 );        
        exitBtn.setPositionX( size.width / 2 );           		        
       
       if (cc.view.getFrameSize().width == 2048 && cc.view.getFrameSize().height == 1536) {                                                                                                   
                    gameOverPanel.setScale( 2.0 );
                    //pausePanel.setPosition( cc.p(-100, 0) );
                    gameOverTxt.setPositionY( size.height - (gameOverTxt.height + 20) );
                    gameOverTxt.setScale( 1.0 );
                    gummyBasket.setPositionY( size.height - (gummyBasket.height + 30) );
                    gummyBasket.setScale( 1.0 );
                    retryBtn.setScale( 1.0 );
                    retryBtn.setPositionY( ( size.height / 2) + retryBtn.height  );                   
                    exitBtn.setScale( 1.0 );
                    exitBtn.setPositionY( (size.height / 2) - exitBtn.height );                                                                                                                                                                                                                                                                                                            
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
        
        exitBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:
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
        GummyBubbles.isGameActive = false;                           
        GummyBubbles.cleanUp();           
    }               
	
});