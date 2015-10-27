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
        
        var settingPanel = this.pausescene.node.getChildByName( 'setting_panel' );                
        var retryBtn = this.pausescene.node.getChildByName( 'retry_btn' );
        var continueBtn = this.pausescene.node.getChildByName( 'continue_btn' );
        var exitBtn = this.pausescene.node.getChildByName( 'exit_btn' );
                                                     
        retryBtn.setPositionX( size.width / 2 );
        continueBtn.setPositionX( size.width / 2 );
        exitBtn.setPositionX( size.width / 2 );           		        
       
        retryBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:                    
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
                    console.log("Exit the pause");
                    cc.director.resume();              
                    cc.director.popToSceneStackLevel(1);
                    cc.director.replaceScene(new MainScene());                                                                                                                                                                    
                break;        
            }
        }, this );
        
        cc.director.pause();
        cc.audioEngine.pauseMusic();                                                                               
	}          
	
});