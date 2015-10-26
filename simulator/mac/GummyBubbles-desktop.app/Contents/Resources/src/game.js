// GameScene Class 
var GameScene = cc.Scene.extend({

	/*
     * private variables
     */        
    gamescene: null,              
       
           
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
        this.gamescene = ccs.load(res.GameScene_json);                
        this.addChild(this.gamescene.node);                        
               
        // setup Studio assets    
        var studioObj = this.getCocosStudioAssets(this.gamescene);                
        
		studioObj.instructionLayer.setVisible( true );
        //studioObj.bgLayer.setVisible( true );        
     
        // start shooting out gummy bubbles                
        /*for(var g = 0; g < GummyBubbles.gummyBubblesOnScreen; g++) {                        
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
        );  */                                   
    },
    
    
    /*
     * perform some cleanup
     */  
    onExit : function() {        
        Physics.space.removeCollisionHandler(  1  , 2 );          
    },  
    
    
     /*
     * get and set all the studio assets from Cocos Studio
     */  
    getCocosStudioAssets: function(scene) {        
        var studioObj = {};                          
               
        var setProperties = function(screen, btn, res, scale) {
                console.log(screen + "  " + btn);
                studioObj.instructionLayer = scene.node.getChildByName( screen );                
                GummyBubbles.resFolderName =  (res) ? res : GummyBubbles.resFolderName;
                GummyBubbles.resScaledTimes = (scale) ? scale : GummyBubbles.resScaledTimes;  
        }
        
        // Get the proper res background for device 
        if (cc.sys.isNative) {                           
            if (cc.view.getFrameSize().width >= 2048) {                                                           
                setProperties( 'how_to_play_super_large' , 'pause_btn_big' , 'largeRes' , '@3x' );
                
                // ipad retina
                if (cc.view.getFrameSize().width == 2048 && cc.view.getFrameSize().height == 1536) {                                                           
                    console.log("Instruction Layer x postion: "+studioObj.instructionLayer.x);
                    studioObj.instructionLayer.setPositionX( 100.0 );
                    
                }
                
                // iphone plus
                if(cc.view.getFrameSize().width >= 2208) {
					studioObj.instructionLayer.setScale( 0.5 );
				}                                                                                                                     
            }
            else if (cc.view.getFrameSize().width >= 1334) {                             
                setProperties( 'how_to_play_medium' , 'pause_btn_medium' , 'mediumRes' , '@2x' );                
            }
            else if (cc.view.getFrameSize().width >= 1136) {                               
                setProperties( 'how_to_play_medium' , 'pause_btn_small' , 'mediumRes' , '@2x' );                                                            
            }
            else {                               
                setProperties( 'how_to_play_small' , 'pause_btn_small');               
            }                           
        }
        else {               
            setProperties( 'how_to_play_small' , 'pause_btn_small');                           
        } 
        
        return studioObj;       
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