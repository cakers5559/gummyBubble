var sceneGB = null;

var MainScene = cc.Scene.extend({
        
    mainscene: null,
    resFolderName:  "smallRes",
    resScaledTimes: "",         
    gummyBubbleSpeed: 10,                
    gummyBubblesOnScreen: 10,         
    gummyBubblesTypes: ['LEFT-RIGHT','RIGHT-LEFT','LEFT-UP-DIAGONAL-DOWN','RIGHT-UP-DIAGONAL-DOWN','LEFT-DOWN-DIAGONAL-UP',
                        'RIGHT-DOWN-DIAGONAL-UP','LEFT-CURVE-UP-DOWN','LEFT-CURVE-DOWN-UP','RIGHT-CURVE-UP-DOWN','RIGHT-CURVE-DOWN-UP',
                        'LEFT-RIGHT-SHAKE','RIGHT-LEFT-SHAKE'],
    gummyBubbleImages: ['bear-41x42','worm-34x42','fish-41x41'],
    gummyBubbleTag: 1,
    gummyBubbleTags: [],                
    gummyLastRandomNumbers: [],
    
    onEnter:function () {
        this._super();                                       
        var size = cc.winSize
        
        this.mainscene = ccs.load(res.MainScene_json);        
        
        this.addChild(this.mainscene.node);                
        
        // Setup Studio assets    
        var studioObj = this.getCocosStudioAssets(this.mainscene);                
        
        studioObj.bgLayer.setVisible( true );        
        
        studioObj.playBtn.setVisible( true );                
        studioObj.playBtn.setPosition( size.width / 2 , (size.height / 2) / 2 );
        
        studioObj.title.setPosition( size.width / 2 , ((size.height / 2) / 2) * 3 );   
               
        var rotAct = cc.rotateBy( 75, 360);
        var seq = cc.sequence(rotAct);
        studioObj.sunbrust.runAction(seq.repeatForever()); 
        studioObj.sunbrust.setPosition( size.width / 2 , ((size.height / 2) / 2) / 3);                       
                
        // start shooting out gummy bubbles                
        for(var g = 0; g < this.gummyBubblesOnScreen; g++) {
            var gummyRandom = this.generateRandomNumber();            
            this.runGummyBubbles(this.gummyBubblesTypes[gummyRandom]);
            this.gummyBubbleTag++;
        }
    },                                  
       
        
    getCocosStudioAssets: function(scene) {        
        var studioObj = {};          
        
        // Get the main screen title and the background sunbrust
        studioObj.title = scene.node.getChildByName( 'gummy_bubbles_title' );
        studioObj.sunbrust = scene.node.getChildByName( 'sunbrust' );
        
        // Get the proper res background for device 
        if (cc.sys.isNative) {                           
            if (cc.view.getFrameSize().width >= 2048) {                           
                console.log("Super Large Screen");
                studioObj.bgLayer = scene.node.getChildByName( 'bg_super_large' );
                studioObj.playBtn = scene.node.getChildByName( 'play_btn_big' );
                
                // ipad retina
                if (cc.view.getFrameSize().width == 2048 && cc.view.getFrameSize().height == 1536) {                    
                    console.log("iPhone Plus");
                    studioObj.title.setScale( 2.0 );
                    studioObj.playBtn.setScale( 1.0 );
                }
                
                // iphone plus
                if(cc.view.getFrameSize().width >= 2208) {
                    console.log("iPhone Plus");
                    studioObj.bgLayer.setScale( 0.5 );
                } 
                
                this.resFolderName = 'largeRes';
                this.resScaledTimes = '@3x';                                                                                                               
            }
            else if (cc.view.getFrameSize().width >= 1334) {
                console.log("Large Screen");                
                studioObj.bgLayer = scene.node.getChildByName( "bg_medium" );                                                                                                    
                studioObj.playBtn = scene.node.getChildByName( "play_btn_medium" );
                
                 this.resFolderName = 'mediumRes';
                this.resScaledTimes = '@2x';   
            }
            else if (cc.view.getFrameSize().width >= 1136) {                
                console.log("Large Medium");
                studioObj.bgLayer = scene.node.getChildByName( 'bg_medium' );  
                studioObj.playBtn = scene.node.getChildByName( 'play_btn_small' ); 
                                                
                this.resFolderName = 'mediumRes';
                this.resScaledTimes = '@2x';                                                             
            }
            else {                
                studioObj.bgLayer = scene.node.getChildByName( 'bg_small' );
                studioObj.playBtn = scene.node.getChildByName( 'play_btn_small' );               
            }                           
        }
        else {   
            console.log('Browser Size');    
            studioObj.bgLayer = scene.node.getChildByName( 'bg_super_large' );                           
        } 
        
        return studioObj;       
    },
    
    
    runGummyBubbles: function(bubbleType) {
        var size = cc.winSize;                                  
        var pathToAssets = 'res/images/' + this.resFolderName;                 
                       
        // Set the Bubble scale base on device        
        var imageScale = 1;                        
        if (cc.view.getFrameSize().width == 2048 && cc.view.getFrameSize().height == 1536) imageScale = 0.8;        
        else if (this.resScaledTimes === '@3x' && cc.view.getFrameSize().width !== 2048 && cc.view.getFrameSize().height !== 1536) imageScale = 0.4;       
        else if (this.resScaledTimes === '@2x') imageScale = 0.7;                          
     
        // Fire a bubble
        var RIGHT = (size.width + (size.width / 4));
        var LEFT = (0 - (size.width / 4));
        var MIDDLEX = (size.width / 2);
        var MIDDLEY = (size.height / 2);
        var DOWN = 0;
        var UP = size.height;
           
        var startPoints = [];
        var endPoints = [];
        var bezierTo = null;
        var shake = false;               
         
        // bubble movement transition               
        switch (bubbleType) {
            case 'LEFT-RIGHT':
                console.log("LEFT TO RIGHT");
                startPoints = [ LEFT , MIDDLEY ];
                endPoints = [ RIGHT , MIDDLEY];                  
            break;
            case 'RIGHT-LEFT':               
                console.log("RIGHT TO LEFT");                               
                startPoints = [ RIGHT , MIDDLEY ];
                endPoints = [ LEFT , MIDDLEY]; 
            break;
            case 'LEFT-UP-DIAGONAL-DOWN':
                console.log("LEFT UP DIAGONAL TO DOWN");
                startPoints = [ LEFT , UP ];
                endPoints = [ RIGHT , DOWN ];
            break;
            case 'LEFT-DOWN-DIAGONAL-UP':
                console.log("LEFT DOWN DIAGONAL TO UP");
                startPoints = [ LEFT , DOWN ];
                endPoints = [ RIGHT , UP ];
            break;
            case 'RIGHT-UP-DIAGONAL-DOWN':
                console.log("RIGHT UP DIAGONAL TO DOWN");
                startPoints = [ RIGHT , UP ];
                endPoints = [ LEFT , DOWN ];
            break;
            case 'RIGHT-DOWN-DIAGONAL-UP':
                console.log("RIGHT DOWN DIAGONAL TO UP");
                startPoints = [ RIGHT , DOWN ];
                endPoints = [ LEFT , UP ];
            break;
            case 'LEFT-CURVE-UP-DOWN':
                console.log("LEFT CURVE FROM UP TO DOWN");
                startPoints = [ LEFT , DOWN ];
                bezierTo = [ cc.p( LEFT , DOWN ) , cc.p( MIDDLEX , UP ) , cc.p( RIGHT , DOWN ) ];                
            break;
            case 'LEFT-CURVE-DOWN-UP':
                console.log("LEFT CURVE FROM DOWN TO UP");
                startPoints = [ LEFT , UP ];
                bezierTo = [ cc.p( LEFT , UP ) , cc.p( MIDDLEX , DOWN ) , cc.p( RIGHT , UP ) ];                
            break;
            case 'RIGHT-CURVE-UP-DOWN':
                console.log("RIGHT CURVE UP TO DOWN");
                startPoints = [ RIGHT , DOWN ];
                bezierTo = [ cc.p( RIGHT , DOWN ) , cc.p( MIDDLEX , UP ) , cc.p( LEFT , DOWN ) ];                
            break;
            case 'RIGHT-CURVE-DOWN-UP':
                console.log("RIGHT CURVE DOWN TO UP");
                startPoints = [ RIGHT , UP ];
                bezierTo = [ cc.p( RIGHT , UP ) , cc.p( MIDDLEX , DOWN ) , cc.p( LEFT , UP ) ];                
            break;
            case 'LEFT-RIGHT-SHAKE':
                console.log("LEFT TO RIGHT SHAKE");
                startPoints = [ LEFT , MIDDLEY ];
                endPoints = [ RIGHT , MIDDLEY]; 
                shake = true;                 
            break;
            case 'RIGHT-LEFT-SHAKE':
                console.log("RIGHT TO LEFT SHAKE");
                startPoints = [ RIGHT , MIDDLEY ];
                endPoints = [ LEFT , MIDDLEY]; 
                shake = true;                 
            break;
            default:                
                startPoints = [ LEFT , MIDDLEY ];
                endPoints = [ RIGHT , MIDDLEY ]; 
            break;                  
        }
         
        // create bubble   
        var bubble = new cc.Sprite( pathToAssets + '/bubble-89x84' + this.resScaledTimes + '.png' );        
        this.addChild(bubble);
        bubble.setPosition( startPoints[0] , startPoints[1] );
        bubble.setScale(imageScale);
        bubble.setTag( this.gummyBubbleTag );
        this.gummyBubbleTags.push(this.gummyBubbleTag);                                       
        
        
        //if ( cc.sys.capabilities.hasOwnProperty( 'touches' ) )
        //{            
            cc.eventManager.addListener(this.bubbleTouchEvent(this), bubble);
        //}
                
        // create gummy
        var gummyRandom = Math.floor(Math.random() * (this.gummyBubbleImages.length));          
        var gummy = new cc.Sprite( pathToAssets + '/' + this.gummyBubbleImages[gummyRandom] + this.resScaledTimes + '.png' );
        bubble.addChild(gummy);
        gummy.setPosition( bubble.width / 2 , bubble.height / 2 );       
         
        // Adds a up an down shake to bubble
        if(shake) {             
            // shake
            var move = cc.moveBy(0.2, cc.p(0,50));
            var move_back = move.reverse();
            var delay = cc.delayTime(0.25);
            var move_seq = cc.sequence( move, move_back );
            var move_rep = move_seq.repeatForever();
            bubble.runAction( move_rep );           
        }   
                                    
        // Add the bezier wave motion to bubble
        if(bezierTo) {                
                //var controlPoints = [ cc.p(size.width / 2, size.height), cc.p(size.width / 2, size.height), cc.p(size.width, 0) ];
                var bezier = cc.bezierTo(this.gummyBubbleSpeed, bezierTo);
                
                if (this.gummyBubbleTags.length === this.gummyBubblesOnScreen) bubble.runAction(cc.sequence(bezier, cc.callFunc(this.onFireBubbleComplete, this)));
                else bubble.runAction(bezier);                 
        }
        // Shoot bubble in straight direction
        else {                
                var actionTo = cc.moveTo(this.gummyBubbleSpeed, cc.p(endPoints[0], endPoints[1]));                
                if (this.gummyBubbleTags.length === this.gummyBubblesOnScreen) bubble.runAction(cc.sequence(actionTo, cc.callFunc(this.onFireBubbleComplete, this)));
                else bubble.runAction(actionTo); 
        }                               
            
        // Scales bubble in and out for pulse effect
        var bubblePulse = new cc.ScaleTo( 1, imageScale + 0.1);
        var bubblePulseBack = new cc.ScaleTo( 1, imageScale ); 
        bubble.runAction(cc.sequence(bubblePulse, bubblePulseBack).repeatForever());                                                                                                     
    },          
    
    
    onFireBubbleComplete: function() {                                    
        //cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
        
        console.log(this.gummyBubbleTags.join(","));
        
        // clean up            
        for(var i = 0; i < this.gummyBubbleTags.length; i++) {            
            this.mainscene.node.removeChildByTag( this.gummyBubbleTags[i] );
        }        
        
        console.log("fire bubble done! - "+this.gummyLastRandomNumbers.join(","));
        
        this.gummyBubbleTag = 1;
        this.gummyBubbleTags = [];
        this.gummyLastRandomNumbers = [];                  
                
        // start shooting out gummy bubbles                
        for(var g = 0; g < this.gummyBubblesOnScreen; g++) {
            var gummyRandom = this.generateRandomNumber();                        
            this.runGummyBubbles(this.gummyBubblesTypes[gummyRandom]);
            this.gummyBubbleTag++;
        }
                    
        
    },
                
    
    generateRandomNumber: function() {                
        var random = Math.floor(Math.random() * (this.gummyBubblesTypes.length));        
        
        if (this.gummyLastRandomNumbers.indexOf(random) > -1) { 
            return this.generateRandomNumber(); 
        }
        else {
            this.gummyLastRandomNumbers.push(random);
            return random;
        }               
    },
    
    
    bubbleTouchEvent: function(self) {
        return {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {                   
                // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.   
                var target = event.getCurrentTarget();  
        
                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
        
                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {                                                       
                    target.setVisible( false );
                    self.testIt();
                    return true;
                }
                return false;                                                      
            }
        }
    },
    
    
    testIt: function() {
        console.log('test');
    }                              
});

