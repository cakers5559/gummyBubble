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
        
        // init Physics        
        Physics.initPhysics();        
        this.scheduleUpdate();                              
        
        // attached the GummyBubble singleton
        GummyBubbles.scene = this;
        
        // add the scene to the view
        this.mainscene = ccs.load(res.MainScene_json);                
        this.addChild(this.mainscene.node);                        
                
        // setup Studio assets    
        var studioObj = this.getCocosStudioAssets(this.mainscene);                
        
        studioObj.bgLayer.setVisible( true );        
        
        studioObj.playBtn.setVisible( true );                
        studioObj.playBtn.setPosition( size.width / 2 , (size.height / 2) / 2 );        
        studioObj.playBtn.addTouchEventListener( this.touchEvent, this );        
        
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
                Physics.collisionBegin.bind(this),
                null,
                null,
                Physics.collisionEnd.bind(this)
        );                                     
    },
               
    
     /*
     * get and set all the studio assets from Cocos Studio
     */  
    getCocosStudioAssets: function(scene) {        
        var studioObj = {};                          
        
        // Get the main screen title and the background sunbrust
        studioObj.title = scene.node.getChildByName( 'gummy_bubbles_title' );
        studioObj.sunbrust = scene.node.getChildByName( 'sunbrust' );
        
        var setProperties = function(screen, btn, res, scale) {
                console.log(screen + "  " + btn);
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
                }
                
                // iphone plus
                if(cc.view.getFrameSize().width >= 2208) studioObj.bgLayer.setScale( 0.5 );                                                                                                                     
            }
            else if (cc.view.getFrameSize().width >= 1334) {                             
                setProperties( 'bg_medium' , 'play_btn_medium' , 'mediumRes' , '@2x' );
                studioObj.playBtn.setScale( 0.7 );   
            }
            else if (cc.view.getFrameSize().width >= 1136) {                               
                setProperties( 'bg_medium' , 'play_btn_small' , 'mediumRes' , '@2x' );                                                                            
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
            Physics.space.removeCollisionHandler(  1  , 2 );
            GummyBubbles.cleanUp();
            this.unschedule();   
            console.log("PLAY BUTTON TOUCHED!");            
            cc.director.runScene( new cc.TransitionFade( 1.0, new GameScene() ) );
                        
            break;
    
        case ccui.Widget.TOUCH_MOVED:
            
            break;
    
        case ccui.Widget.TOUCH_ENDED:
            
            break;
    
        case ccui.Widget.TOUCH_CANCELLED:
            
            break;                
        }
    }, 
    
    
    /*
     * perform some cleanup
     */  
    onExit : function() {        
        Physics.space.removeCollisionHandler(  1  , 2 );
        GummyBubbles.cleanUp();
        this.unschedule();                                  
    },                                                        
    
    
    // PHYSICS DELEGATES BELOW
    /*
     * updater
     */        
    update:function (dt) {
        // chipmunk step
        Physics.space.step(dt);       
    }
});

