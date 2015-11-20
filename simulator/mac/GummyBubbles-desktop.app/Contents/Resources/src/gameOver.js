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
        
        BannerADCommunication.awayFromGameScreen();
        BannerADCommunication.showBanner();                
        
        //add the scene to the view
        this.gameoverscene = ccs.load(res.GameOverScene_json);                
        this.addChild(this.gameoverscene.node);                                              
        
        var gameOverPanel = this.gameoverscene.node.getChildByName( 'gameover_panel' );                		                
        var gameOverTxt = this.gameoverscene.node.getChildByName( 'game_over_txt' );
        var gummyScoreTxt = this.gameoverscene.node.getChildByName( 'gummy_score' );
        var gummyBasket = this.gameoverscene.node.getChildByName( 'gummy_basket' );
        var retryBtn = this.gameoverscene.node.getChildByName( 'retry_btn' );        
        var exitBtn = this.gameoverscene.node.getChildByName( 'exit_btn' );
        		
		gameOverTxt.setPositionX( size.width / 2 );
        gummyScoreTxt.setPositionX( size.width / 2 );                                             
        gummyScoreTxt.width = size.width;
        gummyBasket.setPositionX( size.width / 2 );
        retryBtn.setPositionX( size.width / 2 );        
        exitBtn.setPositionX( size.width / 2 );   
        
        gummyScoreTxt.setPositionY( size.height - (size.height / 8) );
              		               
       if (cc.view.getFrameSize().width == 2048 && cc.view.getFrameSize().height == 1536) {                                                                                                   
                    gameOverPanel.setScale( 2.0 );
                    //pausePanel.setPosition( cc.p(-100, 0) );
                    gameOverTxt.setPositionY( size.height - (gameOverTxt.height + 20) );
                    gameOverTxt.setScale( 1.0 );
                    gummyScoreTxt.setPositionY( size.height / 5 );
                    gummyScoreTxt.setScale( 2.0 );
                    gummyBasket.setPositionY( size.height - (gummyBasket.height + 30) );
                    gummyBasket.setScale( 1.0 );
                    retryBtn.setScale( 1.0 );
                    retryBtn.setPositionY( ( size.height / 2) + retryBtn.height  );                   
                    exitBtn.setScale( 1.0 );
                    exitBtn.setPositionY( (size.height / 2) - exitBtn.height );                                                                                                                                                                                                                                                                                                            
        }
        else if(cc.view.getFrameSize().width == 800 || cc.view.getFrameSize().width == 854) {				 
                 gummyBasket.setPositionY( size.height - 65 );
                 gameOverTxt.setPositionY( size.height - 65 );
                 gummyBasket.setScale( 0.3 );
                 retryBtn.setScale( 0.3 );                                                                        
                 exitBtn.setScale( 0.3 );                                                                                                        
                 gummyScoreTxt.setPositionY( size.height / 3 );
                 gummyScoreTxt.setScale( 0.8 );                                                                  
		}
        else if(cc.view.getFrameSize().width === 1280 && cc.view.getFrameSize().height === 800) {
                 exitBtn.setPositionY( exitBtn.y + 50 );
                 retryBtn.setPositionY( retryBtn.y + 50 );
                 gameOverTxt.setPositionY( gameOverTxt.y + 50 );
                 gummyBasket.setPositionY( gummyBasket.y + 50 )
        }
        else if(cc.view.getFrameSize().height == 600 && cc.view.getFrameSize().width == 1024 ||
                cc.view.getFrameSize().height == 540 && cc.view.getFrameSize().width == 960 ) {
                 gummyScoreTxt.setPositionY( size.height / 4 );
        }
        
        var ls = cc.sys.localStorage; 
        var gummyScore = ls.getItem("gummyScore");
        var bestScore = ls.getItem("bestScore");               
      
        gummyScoreTxt.setString( "Gummy Score: "+ gummyScore + "      |      Your Best Score: "+ bestScore );  
       
        retryBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:                     
                    GummyBubbles.gummyBubbleCollide = false;
                    GummyBubbles.scene.gamescene = null;
                    cc.audioEngine.setEffectsVolume( 3.25 );
                    cc.audioEngine.playEffect( "res/audio/click.mp3" );                                       
                    cc.director.resume();              
                    cc.director.popToSceneStackLevel(1);
                    cc.director.replaceScene(new GameScene());                                                          
                break;        
            }
            
            return true;
        }, this );              
        
        exitBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:
                    cc.audioEngine.setEffectsVolume( 3.25 );
                    cc.audioEngine.playEffect( "res/audio/click.mp3" );                                                                                                                                                    
                    GummyBubbles.scene.gamescene = null;                   
                    cc.director.resume();              
                    cc.director.popToSceneStackLevel(1);
                    cc.director.replaceScene(new MainScene());                                                                                                                                                                    
                break;        
            }
            
            return true;
        }, this );
        
        cc.director.pause();
        cc.audioEngine.pauseMusic();                                                                               
	},
    
    
    /*
     * perform some cleanup
     */  
    onExit: function() {                  
        GummyBubbles.isGameActive = false;
        GummyBubbles.gummyBubbleCollide = false;                           
        GummyBubbles.cleanUp();           
    }               
	
});