// LevelsScene Class 
var LevelsScene = cc.Scene.extend({
    
    /*
     * private variables
     */        
    levelsscene: null,              
       
           
    /*
     * initial setup, treat as contructor
     */
    onEnter:function () {
		this._super();                                       
        var size = cc.winSize;
        var pathToAssets = 'res/images/' + GummyBubbles.resFolderName;
        var imageScale = GummyBubbles.getImageScale();
        var ls = cc.sys.localStorage;         
        var bestScore = (ls.getItem("bestScore") !== null) ? ls.getItem("bestScore") : 0;
        
        //add the scene to the view
        this.levelsscene = ccs.load(res.LevelsScene_json);                
        this.addChild(this.levelsscene.node); 
        
        var levelPanel = this.levelsscene.node.getChildByName( 'level_panel' );
        
        /*var sunbrust = levelPanel.getChildByName( 'sunbrust' );                   
        sunbrust.setPosition( size.width / 2 , size.height / 2 );                
        var rotAct = cc.rotateBy( 175, 360);
        var seq = cc.sequence(rotAct);
        sunbrust.runAction(seq.repeatForever()); */                         
        
        var levelTxt = this.levelsscene.node.getChildByName( 'levels_txt' );                                                            
        var title = '30 gummies to unlock next basket!';        
        
        if(bestScore >= 30) title = '20 Gummies to unlock next basket!';
        else if (bestScore >= 20) title = 'Choose a basket.';
        
        levelTxt.setPosition(size.width / 2 , size.height - (size.height / 4));
        levelTxt.setString(title);   
                                                                                                   
        if (cc.view.getFrameSize().width == 2048 && cc.view.getFrameSize().height == 1536) {                                                                                                   
                    levelPanel.setScale( 2.0 );
                    levelTxt.setScale( 1.0 );                   
                    levelPanel.setPosition( cc.p(-100, 0) );                    
                    levelTxt.setPositionY( size.height - (levelTxt.height + 20) );                                                                                                                                                         
        }
                
        //ADDING THREE STAGES. MORE TO COME...               
        var stages = [
          { unlockScore: 0, event: this.stageOne},
          { unlockScore: 30, event: this.stageTwo},
          { unlockScore: 50, event: this.stageThree}
        ]; 
        
        var menuItems = [];                               
       	
        for(var i = 0; i < stages.length; i++) {
            var stageLock = (bestScore >= stages[i].unlockScore) ? '/basket-unlock' : '/basket-locked';                                                                
            var stage = new cc.MenuItemImage( 
            pathToAssets + stageLock + GummyBubbles.resScaledTimes + '.png', 
            pathToAssets + stageLock + GummyBubbles.resScaledTimes + '.png', 
            pathToAssets + stageLock + GummyBubbles.resScaledTimes + '.png',
            stages[i].event );
            
            if(bestScore < stages[i].unlockScore) stage.setEnabled(false);
                        
            stage.setScale(imageScale); 
            menuItems.push(stage);                      
        }
        
        cc.MenuItemFont.setFontSize(30);
        var menu = new cc.Menu(menuItems[0] , menuItems[1] , menuItems[2]);
        menu.alignItemsHorizontallyWithPadding(130);
        menu.x = size.width / 2;
        menu.y = size.height / 2;
        this.addChild(menu);                                               
	},
      
    onExit: function() {
        cc.audioEngine.stopMusic( );
    },
        
    stageOne: function() {
        console.log("Level One");
        gummyStage = "stage1";        
        cc.director.replaceScene( new GameScene());  
    },
    
    
    stageTwo: function() {
        console.log("Level Two");  
        gummyStage = "stage2";        
        cc.director.replaceScene( new GameScene());  
    },
    
    
    stageThree: function() {
        console.log("Level Three"); 
        gummyStage = "stage3";        
        cc.director.replaceScene( new GameScene());   
    }           
});