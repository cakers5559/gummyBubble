// Global var for setting game diffculty
var gummyMode = "normal";

// SettingsScene Class 
var SettingsScene = cc.Scene.extend({
    
    /*
     * private variables
     */        
    settingsscene: null,              
       
           
    /*
     * initial setup, treat as contructor
     */
    onEnter:function () {
		this._super();                                       
        var size = cc.winSize;
        
        //add the scene to the view
        this.settingsscene = ccs.load(res.SettingsScene_json);                
        this.addChild(this.settingsscene.node); 
        
        var settingPanel = this.settingsscene.node.getChildByName( 'setting_panel' );
        var sunbrust = settingPanel.getChildByName( 'sunbrust' );
        var settingTxt = this.settingsscene.node.getChildByName( 'settings_txt' );
        var kiddiesBtn = this.settingsscene.node.getChildByName( 'kiddies_btn' );
        var normalBtn = this.settingsscene.node.getChildByName( 'normal_btn' );
        var crazeBtn = this.settingsscene.node.getChildByName( 'craze_btn' );
        var homeBtn = this.settingsscene.node.getChildByName( 'home_btn' );        
              
        sunbrust.setPositionY( size.height / 4 );        
        settingTxt.setPositionX( size.width / 2 );
        kiddiesBtn.setPositionX( size.width / 2 );
        normalBtn.setPositionX( size.width / 2 );
        crazeBtn.setPositionX( size.width / 2 );           		
        for(var i in kiddiesBtn) console.log(i);
       
        kiddiesBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:                        
                kiddiesBtn.setEnabled(false);
                normalBtn.setEnabled(true);
                crazeBtn.setEnabled(true); 
                gummyMode = "easy";                            
                break;        
            }
        }, this );
        
        normalBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:                        
                kiddiesBtn.setEnabled(true);
                normalBtn.setEnabled(false);
                crazeBtn.setEnabled(true);
                gummyMode = "normal";                                     
                break;        
            }
        }, this );
        
        crazeBtn.addTouchEventListener( function(sender, type) {
            switch (type)
            {
            case ccui.Widget.TOUCH_BEGAN:                        
                kiddiesBtn.setEnabled(true);
                normalBtn.setEnabled(true);
                crazeBtn.setEnabled(false);
                gummyMode = "hard";                                     
                break;        
            }
        }, this );        
        
        homeBtn.addTouchEventListener( this.touchHomeEvent, this );
	},
    
    
    /*
     * return back to home menu
     */ 
    touchHomeEvent: function(sender, type) {
        switch (type)
        {
        case ccui.Widget.TOUCH_BEGAN:                        
            GummyBubbles.cleanUp();            
            console.log("Back Home TOUCHED!");            
            cc.director.replaceScene( new cc.TransitionFade( 1.0, new MainScene() ) );                        
            break;        
        }
    }, 		
	
});