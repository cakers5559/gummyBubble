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
    gummyLevel: 1,
    gummyBubbleDelayBetweenShoot: 0.5,           
    gummyBubblesTypes: ['UP-DOWN','DOWN-UP','LEFT-RIGHT','RIGHT-LEFT','LEFT-UP-DIAGONAL-DOWN','RIGHT-UP-DIAGONAL-DOWN',
                        'LEFT-DOWN-DIAGONAL-UP','RIGHT-DOWN-DIAGONAL-UP','LEFT-CURVE-UP-DOWN','LEFT-CURVE-DOWN-UP',
                        'RIGHT-CURVE-UP-DOWN','RIGHT-CURVE-DOWN-UP','LEFT-RIGHT-SHAKE','RIGHT-LEFT-SHAKE'],
    gummyBubbleImages: ['bear-41x42','worm-34x42','fish-41x41','bomb'],
    gummyBubbleTag: 1,
    gummyBubbleTags: [], 
    gummyBubblesStored: [],                   
    gummyLastRandomNumbers: [],    
    gummyPoppedItems: [], 
    gummyBubbleCollide: false,   
    gummyScore: 0,
    gummyPaused: false,
    gummyComboTouches: 0,
    gummyInBasket: 0,
    isGameActive : false,
    touchTransition: false,
    gummyMisses: 1,
    poppedLength: 0, 
    timer: null,                              
    
	/************************************************************
     * Starts up the GummyBubbles shooter
     *************************************************************/
    bubbleInit: function(bubbleType) {
       
        var size = cc.winSize;                                  
        var pathToAssets = 'res/images/' + this.resFolderName;                 
                       
        // Set the Bubble scale base on device        
        var imageScale = this.getImageScale();                    
        
        
        var MIDDLELEVELX = [size.width - (size.width / 5) , size.width / 2 , size.width / 5];
        var MIDDLELEVELY = [size.height - (size.height / 5) , size.height / 2 , size.height / 5];
        var randomX = Math.floor(Math.random() * (MIDDLELEVELX.length));
        var randomY = Math.floor(Math.random() * (MIDDLELEVELY.length));                
        
        // Fire a bubble
        var RIGHT = (size.width + (size.width / 4));
        var LEFT = (0 - (size.width / 4));
        var MIDDLEX = MIDDLELEVELX[randomX];
        var MIDDLEY = MIDDLELEVELY[randomY];
        var DOWN = 0;
        var UP = size.height;
           
        var startPoints = [];
        var endPoints = [];
        var bezierTo = null;
        var shake = false;               
         
        // bubble movement transition               
        switch (bubbleType) {
            case 'LEFT-RIGHT':                
                startPoints = [ LEFT , MIDDLEY ];
                endPoints = [ RIGHT , MIDDLEY];                  
            break;
            case 'RIGHT-LEFT':                                                              
                startPoints = [ RIGHT , MIDDLEY ];
                endPoints = [ LEFT , MIDDLEY]; 
            break;
            case 'UP-DOWN':                
                startPoints = [ MIDDLEX , UP + (size.height/3) ];
                endPoints = [ MIDDLEX , DOWN - (size.height/3) ];                  
            break;
            case 'DOWN-UP':                                                              
                startPoints = [ MIDDLEX , DOWN - (size.height/3) ];
                endPoints = [ MIDDLEX , UP + (size.height/3) ]; 
            break;
            case 'LEFT-UP-DIAGONAL-DOWN':                
                startPoints = [ LEFT , UP ];
                endPoints = [ RIGHT , DOWN ];
            break;
            case 'LEFT-DOWN-DIAGONAL-UP':                
                startPoints = [ LEFT , DOWN ];
                endPoints = [ RIGHT , UP ];
            break;
            case 'RIGHT-UP-DIAGONAL-DOWN':                
                startPoints = [ RIGHT , UP ];
                endPoints = [ LEFT , DOWN ];
            break;
            case 'RIGHT-DOWN-DIAGONAL-UP':                
                startPoints = [ RIGHT , DOWN ];
                endPoints = [ LEFT , UP ];
            break;
            case 'LEFT-CURVE-UP-DOWN':                
                startPoints = [ LEFT , DOWN ];
                bezierTo = [ cc.p( LEFT , DOWN ) , cc.p( MIDDLEX , UP ) , cc.p( RIGHT , DOWN ) ];                
            break;
            case 'LEFT-CURVE-DOWN-UP':                
                startPoints = [ LEFT , UP ];
                bezierTo = [ cc.p( LEFT , UP ) , cc.p( MIDDLEX , DOWN ) , cc.p( RIGHT , UP ) ];                
            break;
            case 'RIGHT-CURVE-UP-DOWN':                
                startPoints = [ RIGHT , DOWN ];
                bezierTo = [ cc.p( RIGHT , DOWN ) , cc.p( MIDDLEX , UP ) , cc.p( LEFT , DOWN ) ];                
            break;
            case 'RIGHT-CURVE-DOWN-UP':                
                startPoints = [ RIGHT , UP ];
                bezierTo = [ cc.p( RIGHT , UP ) , cc.p( MIDDLEX , DOWN ) , cc.p( LEFT , UP ) ];                
            break;
            case 'LEFT-RIGHT-SHAKE':                
                startPoints = [ LEFT , MIDDLEY ];
                endPoints = [ RIGHT , MIDDLEY]; 
                shake = true;                 
            break;
            case 'RIGHT-LEFT-SHAKE':                
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
        this.scene.addChild(bubble , 1000);
        bubble.setPosition( startPoints[0] , startPoints[1] );        
        bubble.setScale(imageScale);
        bubble.setTag( this.gummyBubbleTag );
        bubble.isPopped = false;
        bubble.isRemoved = false;  
        bubble.isCallBack = false;                             
        this.gummyBubbleTags.push(this.gummyBubbleTag);                                                               
        this.gummyBubblesStored.push( bubble );
        //if ( cc.sys.capabilities.hasOwnProperty( 'touches' ) )
        //{            
            cc.eventManager.addListener(this.bubbleTouchEvent(this), bubble);
        //}
                                                  
        // create gummy
        var gummyChoices = (gummyStage !== 'stage1') ? this.gummyBubbleImages.length : (this.gummyBubbleImages.length - 1);        
        var gummyRandom = Math.floor(Math.random() * (gummyChoices));          
        var gummy = new cc.Sprite( pathToAssets + '/' + this.gummyBubbleImages[gummyRandom] + this.resScaledTimes + '.png' );
        bubble.addChild(gummy);
        bubble.childGummyPath = pathToAssets + '/' + this.gummyBubbleImages[gummyRandom] + this.resScaledTimes + '.png';       
        bubble.bubbleScale = imageScale;
        bubble.isBomb = (this.gummyBubbleImages[gummyRandom] === 'bomb') ? true : false;
        gummy.setPosition( bubble.width / 2 , bubble.height / 2 );       
        gummy.setOpacity( 150 ); 
        
        // Adds a up an down shake to bubble
        if(shake) {             
            // shake
            var move = cc.moveBy(0.2, cc.p(0,100));
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
                
                /*if (this.gummyBubbleTags.length === this.gummyBubblesOnScreen) {
                    bubble.runAction(cc.sequence(bezier, cc.delayTime(this.gummyBubbleDelayBetweenShoot), cc.callFunc(this.onFireBubbleComplete, this)));
                    bubble.isCallBack = true;
                }*/
                bubble.runAction(bezier);                 
        }
        // Shoot bubble in straight direction
        else {                                                                                
                var actionTo = cc.moveTo( this.gummyBubbleSpeed , cc.p(endPoints[0], endPoints[1]));                
                /*if (this.gummyBubbleTags.length === this.gummyBubblesOnScreen) {
                    bubble.runAction(cc.sequence(actionTo, cc.delayTime(this.gummyBubbleDelayBetweenShoot), cc.callFunc(this.onFireBubbleComplete, this)));
                    bubble.isCallBack = true;
                }*/
                bubble.runAction(actionTo); 
        }                               
            
        // Scales bubble in and out for pulse effect
        var bubblePulse = (gummyStage === 'stage3') ? new cc.ScaleTo( 1, imageScale - 0.2) : new cc.ScaleTo( 1, imageScale + 0.1);
        var bubblePulseBack = (gummyStage === 'stage3') ? new cc.ScaleTo( 1, imageScale - 0.3 ) : new cc.ScaleTo( 1, imageScale); 
        bubble.runAction(cc.sequence(bubblePulse, bubblePulseBack).repeatForever()); 
        
        
        var bombOrBubble = (this.gummyBubbleImages[gummyRandom] === 'bomb') ? 'lighten_match' : 'shoot_out_bubble';                
        var playSound = function() {
            cc.audioEngine.setEffectsVolume( 0.05 );
            cc.audioEngine.playEffect( "res/audio/"+bombOrBubble+".mp3" );            
        }
        
        if (this.gummyBubbleTags.length === this.gummyBubblesOnScreen) {                       
            var self = this;             
            this.timer = setTimeout(function() {
                self.onFireBubbleComplete();
            } , ((this.gummyBubbleSpeed*1000) + 1000));
        }
        setTimeout(playSound , 500);                                                                                                    
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
            this.scene.addChild(this.basket , 1000);                                     
            this.basket.setScale(imageScale);
            
            if(cc.view.getFrameSize().width === 960 && cc.view.getFrameSize().height === 640 ) {
                this.basket.setPosition( size.width / 2 , this.basket.height / 2 );
                this.basket.setScale(imageScale - 0.2);
            }
            if(cc.view.getFrameSize().width === 960 && cc.view.getFrameSize().height === 540 ) {
                this.basket.setPosition( size.width / 2 , this.basket.height / 3.1 );
                this.basket.setScale(imageScale - 0.1);
            }           
            else if(cc.view.getFrameSize().width >= 2208) this.basket.setPosition( size.width / 2 , this.basket.height / 4 );    		    
            else this.basket.setPosition( size.width / 2 , this.basket.height / 3 );               
            
            cc.eventManager.addListener(this.basketTouchEvent(this), this.basket);
                                        
                        
        //if ( cc.sys.capabilities.hasOwnProperty( 'touches' ) )
        //{            
           // if(this.basket) cc.eventManager.addListener(this.screenEvent(this), this.scene);   
        //}  
    },
    
    
    getImageScale: function() {
        // Set the Bubble scale base on device        
        var imageScale = 1;                        
        if (cc.view.getFrameSize().width == 2048 && cc.view.getFrameSize().height == 1536) imageScale = 1.0;        
        else if (this.resScaledTimes === '@3x' && cc.view.getFrameSize().width !== 2048 && cc.view.getFrameSize().height !== 1536) imageScale = 0.5;       
        else if (this.resScaledTimes === '@2x') imageScale = 0.75;
        else if (cc.view.getFrameSize().width == 960 && cc.view.getFrameSize().height == 640) imageScale = 1.4;    
        
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
            swallowTouches: false,
            onTouchBegan: function (touch, event) {     
                
                // move the basket to the tap location                                                                              
                if(self.basket && !self.touchTransition && !self.gummyPaused) {                    
                    self.touchTransition = true;
                    var screen = touch.getLocation();
                    
                    var touchDone = function() {                       
                        self.touchTransition = false;
                    }
                    
                    var actionTo = cc.moveTo( 0.1 , cc.p(screen.x, self.basket.y));
                    self.basket.runAction(cc.sequence(actionTo, cc.callFunc(touchDone, self)));                                                                                         
                }
                
                // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.   
                var target = event.getCurrentTarget();                                                  
                
                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
        
                //Check the click area                                   
                    if (cc.rectContainsPoint(rect, locationInNode)) {                                                                                                                                                                                                                              
                        if(!target.isPopped) { 
                            target.setVisible( false );                                                         
                            target.isPopped = true;
                            target.stopActionByTag(target.getTag());                                                        
                            
                            if(target.isBomb) self.bombExplode(target.getPosition() , self);                                                            
                            
                            self.bubblePop(target.getPosition() , target.childGummyPath, target.getTag(), target.bubbleScale, target.isBomb);                          
                            self.gummyComboTouches++;
                            return true;
                        }                                                 
                    }                                                                                                                                                                                           
                return false;                                                      
            },
            
            onTouchEnded: function (touch, event) {               
                                                      
                // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.   
                var target = event.getCurrentTarget();                                                  
                            
                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width+100, s.height+100);
                var pos = touch.getLocation();
    
                if (cc.rectContainsPoint(rect, locationInNode)) {
                            for(var i = 0; i < self.gummyBubblesStored.length; i++) {                                    
                                if(!self.gummyBubblesStored[i].isRemoved && !target.isRemoved && !target.isBomb) {
                                    if(self.gummyBubblesStored[i].getTag() === target.getTag()) {                                                                                                                                                                                                      
                                        target.removeFromParent(); 
                                        target.isRemoved = true;
                                        self.gummyBubblesStored[i] = { isPopped: true , isRemoved: true };
                                        
                                        if(self.gummyComboTouches > 1) {                                                                                                                                    
                                            var comboNum = self.gummyComboTouches;
                                            self.gummyComboTouches = 0;
                                            self.comboEffect(pos , comboNum , self);
                                            self.gummyScore += self.gummyComboTouches*2;                                                                                                                                                                                                    
                                        }
                                    }
                                }                                
                              }                                      
                            self.gummyComboTouches = 0;                                                                                                                                                            
                            //return true; 
                } 
                                                                                                                                                
               return true;
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
                    target.opacity = 250;
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
    bubblePop: function(loc, gummyPath, tagNumber, scale, bomb) {               
        // unload the sound file from memory when it no longer needs to be used
        cc.audioEngine.setEffectsVolume( 3.25 );
        cc.audioEngine.playEffect( "res/audio/pop.mp3" );
        
        
        var size = cc.winSize;                                  
        var pathToAssets = 'res/images/' + this.resFolderName;
        var locX = (loc.x) ? loc.x : 0;
        var locY = (loc.y) ? loc.y : 0;
        
        var removeSplash = function(splash) {
            splash.removeFromParent();            
        }          
        
        // bubble splash   
        var bubbleSplash = new cc.Sprite( pathToAssets + '/bubble-pop-133x134' + this.resScaledTimes + '.png' );        
        this.scene.addChild(bubbleSplash);
        bubbleSplash.setScale(scale);
        bubbleSplash.setPosition( locX , locY ); 
        
        var splashOut = cc.fadeOut(1.0);                
        bubbleSplash.runAction(cc.sequence(splashOut, cc.callFunc(removeSplash, this)));                                            
        
        // create gummy                  
        var gummy = Physics.createPhysicsSprite(gummyPath , locX , locY , tagNumber);        
        gummy.setScale(scale);                
        gummy.isBomb = false;
        if(bomb) {
            gummy.setVisible( false );
            gummy.isBomb = true;
        }
        this.scene.addChild(gummy);
        
        /*var playSound = function() {
            cc.audioEngine.setEffectsVolume( 0.10 );
            cc.audioEngine.playEffect( "res/audio/fall_and_spat.mp3" );            
        }
        
        setTimeout(playSound , 500);*/                                                                                          
    }, 
        
    bombExplode: function(loc, self) {  
        cc.audioEngine.setEffectsVolume( 3.25 );
        cc.audioEngine.playEffect( "res/audio/explode.mp3" );      
          
        
        var flasher = setInterval(function(){ flashOnOff() }, 50);
                
        function flashOnOff() {            
            if(!self.scene.studio.bombFlash.isVisible()) self.scene.studio.bombFlash.setVisible(true);
            else self.scene.studio.bombFlash.setVisible(false);            
        }
        
        var explosion = cc.ParticleSystem( "res/images/explosion.plist" );        
        explosion.setPosition( loc.x , loc.y );
        explosion.setLocalZOrder(100);        
        self.scene.addChild(explosion);                                                  
        
        var stopFlash = function() {
            clearInterval(flasher);            
        }
        
        var stopFlashing = setTimeout(stopFlash, 1000);
    },    
    
    comboEffect: function(loc , comboNumber , self) { 
        cc.audioEngine.setEffectsVolume( 0.10 );
        cc.audioEngine.playEffect( "res/audio/combo.mp3" ); 
                                       
        var pathToAssets = 'res/images/' + self.resFolderName;
        
         // particle combo
        var removeStars = function(s) {
           
            s.removeFromParent();            
        }    
                
        var stars = cc.ParticleSystem( "res/images/fireworks.plist" );
        stars.setScale( "1."+comboNumber );
        stars.setPosition( loc.x , loc.y );
        stars.setLocalZOrder(100);        
        self.scene.addChild(stars);         
        var starsDelay = cc.delayTime(1.0);                
        stars.runAction(cc.sequence(starsDelay, cc.callFunc(removeStars, stars)));   
        
        // bubble combo                                                        
        var removeCombo = function(combo) {
            combo.removeFromParent();            
        }                                  
        
        var comboString = '/x'+ comboNumber;
        var chanceNumber = self.gummyMisses + comboNumber;
        
        if(comboNumber === 2) {
            comboString = '/1'  
            chanceNumber = self.gummyMisses + 1;  
        }
        else if(comboNumber === 3) {
            comboString = '/2'
            chanceNumber = self.gummyMisses + 2;    
        }
        else if(comboNumber === 4) {
            comboString = '/x2'
            chanceNumber = self.gummyMisses * 2;
        }
        else if(comboNumber === 5 || comboNumber === 6) {
            comboString = '/x3'
            chanceNumber = self.gummyMisses * 3;
        }
        
                   
        var bubbleCombo = new cc.Sprite( pathToAssets + comboString + self.resScaledTimes + '.png' );                
        bubbleCombo.setScale( 0.3 );
        bubbleCombo.setLocalZOrder(101);
        self.scene.addChild(bubbleCombo);                        
        bubbleCombo.setPosition( loc.x , loc.y );         
                        
        var comboOut = cc.fadeOut(0.5);
        var nodeAction = cc.scaleTo( 0.5, 0.7, 0.7 );               
        bubbleCombo.runAction(cc.sequence(nodeAction, comboOut, cc.callFunc(removeCombo, bubbleCombo)));
        
        self.gummyMisses = (self.gummyMisses >= 10) ? 10 : chanceNumber;
        
        if(self.gummyMisses >= 10) {
            self.scene.studio.missesTxt.setString( "Maxed Out!");
        }
        else {
            self.scene.studio.missesTxt.setString( "Chances: "+ self.gummyMisses);
        }
                                                                                                                     
    },                                        
    
    
    /*
     * Callback for when all fired bubbles is out of view
     */ 
    onFireBubbleComplete: function() {                                                                            
        var poppedTotal = this.gummyBubblesStored.length;
        var howManyPopped = 0;
        
        // clean up                                                                     
        if(this.scene.gamescene && this.isGameActive) {            
            for(var i = 0; i < this.gummyBubblesStored.length; i++) {                
                var bub = this.gummyBubblesStored[i];
                                
                if(bub.isBomb && bub.isPopped){
                    this.gummyMisses = 0;
                }                
                else if(bub.isBomb) {                    
                    poppedTotal--;                                          
                }
                else if(bub.isPopped) {                                   
                    howManyPopped++;
                }                
                else {                    
                    this.gummyMisses--;
                    this.scene.studio.missesTxt.setString( "Chances: "+ this.gummyMisses);
                    this.scene.studio.gummiesTxt.setString( "Gummies: "+ this.gummyScore + "/" + this.scene.gummyLvl);
                }                
                
                if(!bub.isRemoved) bub.removeFromParent();                
            } 
            
            if(howManyPopped === poppedTotal /*&& this.gummyInBasket === poppedTotal*/) {            
                this.gummyLevel++;
                this.scene.levelChange();
            }
            else if(howManyPopped !== this.gummyInBasket && this.gummyBubbleCollide) {
                this.gummyBubbleCollide = false;
                this.scene.gameOver();
            } 
        } 
        else {
            for(var i = 0; i < this.gummyBubblesStored.length; i++) {
                var bub = this.gummyBubblesStored[i];
                if(!bub.isRemoved) bub.removeFromParent();                
            }
        } 
        
            for( var i = 0; i < this.gummyPoppedItems.length; i++) { 
                    var sprite = this.gummyPoppedItems[i].sprite;
                    var body = this.gummyPoppedItems[i].body;
                    var shape = this.gummyPoppedItems[i].shape;                                             
                    
                    if(body) {                                        
                        Physics.space.removeShape(shape);
                        Physics.space.removeBody(body);
                        sprite.removeFromParent();                                                    
                    }                
            }                
                        
        this.gummyBubbleTag = 1;
        this.gummyBubbleTags = [];
        this.gummyLastRandomNumbers = []; 
        this.gummyBubblesStored = [];                 
        this.gummyInBasket = 0;                         
        this.gummyComboTouches = 0;              
        this.gummyPoppedItems = [];                              
        
        for(var g = 0; g < this.gummyBubblesOnScreen; g++) {                        
            var gummyRandom = this.generateRandomNumber();            
            this.bubbleInit(this.gummyBubblesTypes[gummyRandom]);                                               
            this.gummyBubbleTag++;            
        }                                                                                                         
    },
    
    
    hideAllBubbles: function() {
        this.basket.setVisible( false );
        
        for(var i = 0; i < this.gummyBubblesStored.length; i++) {                                    
            this.gummyBubblesStored[i].setVisible( false );            
        }          
    },
    
    
    showAllBubbles: function() {                  
        this.basket.setVisible( true );
        
        for(var i = 0; i < this.gummyBubblesStored.length; i++) {                                    
            this.gummyBubblesStored[i].setVisible( true );            
        }   
    },
    
    
    cleanUp: function(pauseBasket) {        
        this.gummyBubbleTag = 1;
        this.gummyBubbleTags = [];
        this.gummyLastRandomNumbers = [];
        this.gummyBubblesStored = [];
        this.gummyInBasket = 0;
        this.gummyLevel = 1; 
        this.gummyScore = 0;
        this.gummyMisses = 1;
        this.touchTransition = false;
        this.gummyBubbleCollide = false;
        this.poppedLength = 0;        
        
        this.basket = null;                
        
        if(!this.scene.gamescene && !this.isGameActive) {
            this.gummyBubbleSpeed = 10;                
            this.gummyBubblesOnScreen = 5;
        }
        
        for( var i = 0; i < this.gummyPoppedItems.length; i++) { 
                var sprite = this.gummyPoppedItems[i].sprite;
                var body = this.gummyPoppedItems[i].body;
                var shape = this.gummyPoppedItems[i].shape;                                             
                
                if(body) {                                        
                    Physics.space.removeShape(shape);
                    Physics.space.removeBody(body);
                    sprite.removeFromParent();                                                    
                }
        }
        
        //this.scene = null;
        this.gummyPoppedItems = [];                    
    }        
};
