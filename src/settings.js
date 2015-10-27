// MainScene Class 
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
        var settingTxt = this.settingsscene.node.getChildByName( 'settings_txt' );
        var kiddiesBtn = this.settingsscene.node.getChildByName( 'kiddies_btn' );
        var normalBtn = this.settingsscene.node.getChildByName( 'normal_btn' );
        var crazeBtn = this.settingsscene.node.getChildByName( 'craze_btn' );
        
        settingPanel.setPositionX( size.width / 2 );        
        settingTxt.setPositionX( size.width / 2 );
        kiddiesBtn.setPositionX( size.width / 2 );
        normalBtn.setPositionX( size.width / 2 );
        crazeBtn.setPositionX( size.width / 2 );
           
		
	}
	
	
	
});