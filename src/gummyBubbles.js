console.log("Gummy Bubles");
var GummyBubbles = {
    
    /*
     * public variables
     */
    scene: null,
    resFolderName:  "smallRes",
    resScaledTimes: "", 
    basket: null,      
	gummyBubbleSpeed: 10,                
    gummyBubblesOnScreen: 5,
    gummyBubbleDelayBetweenShoot: 2,         
    gummyBubblesTypes: ['LEFT-RIGHT','RIGHT-LEFT','LEFT-UP-DIAGONAL-DOWN','RIGHT-UP-DIAGONAL-DOWN',
                        'LEFT-DOWN-DIAGONAL-UP','RIGHT-DOWN-DIAGONAL-UP','LEFT-CURVE-UP-DOWN','LEFT-CURVE-DOWN-UP',
                        'RIGHT-CURVE-UP-DOWN','RIGHT-CURVE-DOWN-UP','LEFT-RIGHT-SHAKE','RIGHT-LEFT-SHAKE'],
    gummyBubbleImages: ['bear-41x42','worm-34x42','fish-41x41'],
    gummyBubbleTag: 1,
    gummyBubbleTags: [],                
    gummyLastRandomNumbers: [],
    gummyPoppedItems: [],
    gummyScore: 0,                    
    
	/************************************************************
     * Starts up the GummyBubbles shooter
     *************************************************************/
    bubbleInit: function(bubbleType) {
        var size = cc.winSize;                                  
        var pathToAssets = 'res/images/' + this.resFolderName;                 
                       
        // Set the Bubble scale base on device        
        var imageScale = this.getImageScale();                    
     
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
        this.scene.addChild(bubble);
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
        bubble.childGummyPath = pathToAssets + '/' + this.gummyBubbleImages[gummyRandom] + this.resScaledTimes + '.png';
        bubble.bubbleScale = imageScale;
        gummy.setPosition( bubble.width / 2 , bubble.height / 2 );       
        gummy.setOpacity( 150 ); 
        
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
                
                if (this.gummyBubbleTags.length === this.gummyBubblesOnScreen) bubble.runAction(cc.sequence(bezier, cc.delayTime(this.gummyBubbleDelayBetweenShoot), cc.callFunc(this.onFireBubbleComplete, this)));
                else bubble.runAction(bezier);                 
        }
        // Shoot bubble in straight direction
        else {                
                var actionTo = cc.moveTo(this.gummyBubbleSpeed, cc.p(endPoints[0], endPoints[1]));                
                if (this.gummyBubbleTags.length === this.gummyBubblesOnScreen) bubble.runAction(cc.sequence(actionTo, cc.delayTime(this.gummyBubbleDelayBetweenShoot), cc.callFunc(this.onFireBubbleComplete, this)));
                else bubble.runAction(actionTo); 
        }                               
            
        // Scales bubble in and out for pulse effect
        var bubblePulse = new cc.ScaleTo( 1, imageScale + 0.1);
        var bubblePulseBack = new cc.ScaleTo( 1, imageScale ); 
        bubble.runAction(cc.sequence(bubblePulse, bubblePulseBack).repeatForever());                                                                                                     
    },
    
    
    /*
     * create the basket for catching gummies
     */
    basketInit: function() {
        var size = cc.winSize;                                  
        var pathToAssets = 'res/images/' + this.resFolderName;
        var imageScale = this.getImageScale();
        
        // create basket
        /*var basket = Physics.addStaticObject( this.scene, 
                                pathToAssets + '/basket-empty-114x74' + this.resScaledTimes + '.png',
                                size.width / 2 , basket.height / 2 , imageScale ); */
        this.basket = new cc.Sprite( pathToAssets + '/basket-empty-114x74' + this.resScaledTimes + '.png' );        
        this.scene.addChild(this.basket , 100000);
        this.basket.setPosition( size.width / 2 , this.basket.height / 2 );
        this.basket.setScale(imageScale);                          
                        
        //if ( cc.sys.capabilities.hasOwnProperty( 'touches' ) )
        //{            
            cc.eventManager.addListener(this.basketTouchEvent(this), this.basket);
        //}  
    },
    
    
    getImageScale: function() {
        // Set the Bubble scale base on device        
        var imageScale = 1;                        
        if (cc.view.getFrameSize().width == 2048 && cc.view.getFrameSize().height == 1536) imageScale = 0.8;        
        else if (this.resScaledTimes === '@3x' && cc.view.getFrameSize().width !== 2048 && cc.view.getFrameSize().height !== 1536) imageScale = 0.5;       
        else if (this.resScaledTimes === '@2x') imageScale = 0.7;    
        
        return imageScale;
    },
    
    
    /*
     * generates a geniune random number for bubble maker
     */
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
    
    
    /*
     * touch event for when a bubble is tapped/touched
     */
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
                    cc.eventManager.removeListeners( target );
                    self.bubblePop(target.getPosition() , target.childGummyPath, target.getTag(), target.bubbleScale);                                        
                    return true;
                }
                return false;                                                      
            }
        }
    },
    
    
    /*
     * touch event for when a bubble is tapped/touched
     */
    basketTouchEvent: function(self) {
        var size = cc.winSize;
        
        return {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
        
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
        
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.opacity = 180;
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                if( target.x >= (target.width/2) && target.x <= (size.width - (target.width/2))) {
                    target.x += delta.x;
                }              
                else if( target.x < target.width ) {
                    target.x = (target.width/2) + 10;
                }
                else if( target.x > (size.width - (target.width/2))) {
                    target.x = size.width - (target.width/2) - 10;
                }
                //target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log("sprite onTouchesEnded.. ");
                target.setOpacity(255);
                if (target == sprite2) {
                    containerForSprite1.setLocalZOrder(100);
                } else if (target == sprite1) {
                    containerForSprite1.setLocalZOrder(0);
                }
            }
        }
    },
    
    
    /*
     * effect for when a bubble is popped
     */
    bubblePop: function(loc, gummyPath, tagNumber, scale) {               
        var size = cc.winSize;                                  
        var pathToAssets = 'res/images/' + this.resFolderName;
        
        var removeSplash = function(splash) {
            splash.removeFromParent();
            console.log('Splash Removed ');
        }          
        
        // bubble splash   
        var bubbleSplash = new cc.Sprite( pathToAssets + '/bubble-pop-133x134' + this.resScaledTimes + '.png' );        
        this.scene.addChild(bubbleSplash);
        bubbleSplash.setPosition( loc.x , loc.y ); 
        
        var splashOut = cc.fadeOut(1.0);                
        bubbleSplash.runAction(cc.sequence(splashOut, cc.callFunc(removeSplash, this)));                                            
        
        // create gummy                  
        var gummy = Physics.createPhysicsSprite(gummyPath , loc.x , loc.y , tagNumber);        
        gummy.setScale(scale);
        this.scene.addChild(gummy);                          
        
        console.log('TAG NUMBER '+tagNumber);                                        
    },                                        
    
    
    /*
     * Callback for when all fired bubbles is out of view
     */ 
    onFireBubbleComplete: function() {                                    
        //cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
        
        console.log(this.gummyBubbleTags.join(","));
        
        // clean up            
        for(var i = 0; i < this.gummyBubbleTags.length; i++) {            
            if(this.scene.mainscene) this.scene.mainscene.node.removeChildByTag( this.gummyBubbleTags[i] );
            else this.scene.gamescene.node.removeChildByTag( this.gummyBubbleTags[i] );
        }        
                        
        this.gummyBubbleTag = 1;
        this.gummyBubbleTags = [];
        this.gummyLastRandomNumbers = [];                  
        
        console.log("SHOOT ANOTHER ROUND OF BUBBLES! ITEM LEN - "+this.gummyPoppedItems.length);
        
        for(var g = 0; g < this.gummyBubblesOnScreen; g++) {                        
            var gummyRandom = this.generateRandomNumber();            
            this.bubbleInit(this.gummyBubblesTypes[gummyRandom]);                                               
            this.gummyBubbleTag++;            
        }   
                              
        for( var i = 0; i < this.gummyPoppedItems.length; i++) { 
                var sprite = this.gummyPoppedItems[i].sprite;
                var body = this.gummyPoppedItems[i].body;
                var shape = this.gummyPoppedItems[i].shape;                                             
                
                if(body) {                    
                    console.log("IN THE BODY");
                    Physics.space.removeShape(shape);
                    Physics.space.removeBody(body);
                    sprite.removeFromParent();                                                    
                }
        } 
           
        this.gummyPoppedItems = [];                              
    },
    
    
    cleanUp: function() {
        this.gummyBubbleTag = 1;
        this.gummyBubbleTags = [];
        this.gummyLastRandomNumbers = []; 
        
        for( var i = 0; i < this.gummyPoppedItems.length; i++) { 
                var sprite = this.gummyPoppedItems[i].sprite;
                var body = this.gummyPoppedItems[i].body;
                var shape = this.gummyPoppedItems[i].shape;                                             
                
                if(body) {                    
                    console.log("IN THE BODY");
                    Physics.space.removeShape(shape);
                    Physics.space.removeBody(body);
                    sprite.removeFromParent();                                                    
                }
        }
        
        this.gummyPoppedItems = [];                    
    }        
};