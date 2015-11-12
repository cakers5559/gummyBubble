/****************************************************************************
 Copyright (c) 2010-2011 cocos2d-x.org
 Copyright (c) 2010      Ricardo Quesada
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
#import "RootViewController.h"
#import "cocos2d.h"
#import "platform/ios/CCEAGLView-ios.h"
#include "ide-support/SimpleConfigParser.h"


// Constant for getting test ads on the simulator using the testDevices method.
#define GAD_SIMULATOR_ID @"Simulator"


@interface RootViewController ()
{
    BOOL _bannerIsVisible;
    BOOL _androidADIsVisible;
    BOOL dontShowBanner;
    ADBannerView *_adBanner;
    GADBannerView *admobBannerView;
}
@end


@implementation RootViewController

/*
 // The designated initializer.  Override if you create the controller programmatically and want to perform customization that is not appropriate for viewDidLoad.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    if ((self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil])) {
        // Custom initialization
    }
    return self;
}
*/

/*
// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView {
}
*/


// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
    _bannerIsVisible = NO;
    dontShowBanner = NO;
}
 


- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    
    CGRect Rect =[[UIScreen mainScreen] bounds];
    
    if([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad) {
        // COMMENT BELOW TO TEST OR USE GOOGLE ADS
        _adBanner = [[ADBannerView alloc] initWithFrame:CGRectMake(0, self.view.frame.size.height-64, Rect.size.width, 64)];
    }
    else {
        _adBanner = [[ADBannerView alloc] initWithFrame:CGRectMake(0, self.view.frame.size.height-32, Rect.size.width, 32)];
    }
    
    _adBanner.delegate = self;
    
    
    // UNCOMMENT BELOW CODE FOR TESTING GOOGLE ADS
    //_adBanner = nil;
    //_bannerIsVisible = NO;
    //[self bannerView:_adBanner didFailToReceiveAdWithError:nil];
}

- (void)atGameScreen {
    dontShowBanner = YES;
}

- (void)awayFromGameScreen {
    dontShowBanner = NO;
}


- (void)iADShowBanner {
    //if (!_bannerIsVisible) {
        [UIView beginAnimations:@"animateAdBannerOn" context:NULL];
    
        if(_adBanner != nil) {
            if([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad) {
                // Assumes the banner view is just off the bottom of the screen.
                _adBanner.frame = CGRectMake(0, self.view.frame.size.height-64, self.view.frame.size.width, 64);
                //CGRectOffset(_adBanner.frame, 0, -32);
            }
            else {
                // Assumes the banner view is just off the bottom of the screen.
                _adBanner.frame = CGRectMake(0, self.view.frame.size.height-32, self.view.frame.size.width, 32);

            }
        }
        else if(admobBannerView != nil) {
            if([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad) {
                admobBannerView.frame =  CGRectMake((self.view.frame.size.width / 2) - 364,self.view.frame.size.height-90, 728, 90);
            }
            else {
                admobBannerView.frame =  CGRectMake((self.view.frame.size.width / 2) - 160,self.view.frame.size.height-50, 320, 50);
            }
        }
    
        [UIView commitAnimations];
        
        //_bannerIsVisible = YES;
    //}
}

- (void)iADHideBanner {
    //if (_bannerIsVisible) {
        [UIView beginAnimations:@"animateAdBannerOn" context:NULL];
    
        if(_adBanner != nil) {
            // Assumes the banner view is just off the bottom of the screen.
            _adBanner.frame = CGRectMake(0, self.view.frame.size.height, self.view.frame.size.width, 32);
            //CGRectOffset(_adBanner.frame, 0, _adBanner.frame.size.height);
        }
        else if (admobBannerView != nil) {
            if([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad) {
                admobBannerView.frame =  CGRectMake((self.view.frame.size.width / 2) - 364,self.view.frame.size.height, 728, 90);
            }
            else {
                admobBannerView.frame =  CGRectMake((self.view.frame.size.width / 2) - 160,self.view.frame.size.height, 320, 50);
            }
        }
    
        [UIView commitAnimations];
        
        //_bannerIsVisible = NO;
        
   // }
}

// Override to allow orientations other than the default portrait orientation.
// This method is deprecated on ios6
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    
    if (SimpleConfigParser::getInstance()->isLanscape()) {
        return UIInterfaceOrientationIsLandscape( interfaceOrientation );
    }else{
        return UIInterfaceOrientationIsPortrait( interfaceOrientation );
    }
    
}

// For ios6, use supportedInterfaceOrientations & shouldAutorotate instead
- (NSUInteger) supportedInterfaceOrientations{
#ifdef __IPHONE_6_0
    if (SimpleConfigParser::getInstance()->isLanscape()) {
        return UIInterfaceOrientationMaskLandscape;
    }else{
        return UIInterfaceOrientationMaskPortrait;
    }
#endif
}

- (BOOL) shouldAutorotate {
    if (SimpleConfigParser::getInstance()->isLanscape()) {
        return YES;
    }else{
        return NO;
    }
}

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation {
    [super didRotateFromInterfaceOrientation:fromInterfaceOrientation];

    cocos2d::GLView *glview = cocos2d::Director::getInstance()->getOpenGLView();

    if (glview)
    {
        cocos2d::CCEGLView *eaglview = (cocos2d::CCEGLView*) glview->getEAGLView();

        if (eaglview)
        {
            CGSize s = CGSizeMake([eaglview getWidth], [eaglview getHeight]);
            cocos2d::Application::getInstance()->applicationScreenSizeChanged((int) s.width, (int) s.height);
        }
    }
}

//fix not hide status on ios7
- (BOOL)prefersStatusBarHidden
{
    return YES;
}

- (void)didReceiveMemoryWarning {
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

- (void)viewDidUnload {
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void)bannerViewDidLoadAd:(ADBannerView *)banner
{
    if (!_bannerIsVisible)
    {
        //NSLog(@"Load iOS AD");
        // If banner isn't part of view hierarchy, add it
        if (_adBanner.superview == nil)
        {
            [self.view addSubview:_adBanner];
            
            if(dontShowBanner) {
                // Assumes the banner view is just off the bottom of the screen.
                banner.frame = CGRectOffset(banner.frame, 0, banner.frame.size.height);
            }
        }
        
        _bannerIsVisible = YES;
    }
}

- (BOOL)bannerViewActionShouldBegin:(ADBannerView *)banner willLeaveApplication:(BOOL)willLeave {
    
    
    _adBanner.frame = CGRectOffset(_adBanner.frame, 0, _adBanner.frame.size.height);
    
    
    return YES;
}

- (void)bannerViewActionDidFinish:(ADBannerView *)banner {
    
    //_adBanner = banner;
    
    _adBanner.frame = CGRectOffset(_adBanner.frame, 0, -_adBanner.frame.size.height);
}

- (void)bannerView:(ADBannerView *)banner didFailToReceiveAdWithError:(NSError *)error
{
    //NSLog(@"Failed to retrieve ad iOS");
    
    // Set Google banner AdMob ads instead
    [banner removeFromSuperview];
    _adBanner = nil;
    
    
    if(admobBannerView == nil){
        if([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad) {
            admobBannerView = [[GADBannerView alloc]
                           initWithFrame:CGRectMake((self.view.frame.size.width / 2) - 364,self.view.frame.size.height-90, 728, 90)];
        }
        else {
            admobBannerView = [[GADBannerView alloc]
                           initWithFrame:CGRectMake((self.view.frame.size.width / 2) - 160,self.view.frame.size.height-50, 320, 50)];
        }
    
        admobBannerView.adUnitID = @"ca-app-pub-7557251095062547/2802590115";
        admobBannerView.rootViewController = self;
        admobBannerView.delegate = self;
        [admobBannerView loadRequest:[GADRequest request]];
    }
    
    // SIMULATOR FOR TESTING ADS
    //GADRequest *request = [GADRequest request];
    // Make the request for a test ad. Put in an identifier for
    // the simulator as well as any devices you want to receive test ads.
    //request.testDevices = @[ @"a12940d2c37740ebfbfd9a8c0f07a78f" ];
    //request.testDevices = [NSArray arrayWithObjects:GAD_SIMULATOR_ID, nil];
    //request.testDevices = [NSArray arrayWithObjects:GAD_SIMULATOR_ID,@"TheIDAppearingInLogs",nil];
    //[admobBannerView loadRequest:request];
}

- (void)adViewDidReceiveAd:(GADBannerView *)adView {

    if (!_androidADIsVisible)
    {
        //NSLog(@"Google Receive adViewDidReceiveAd");
        
        if (admobBannerView.superview == nil)
        {
            [self.view addSubview:admobBannerView];
            
            if(dontShowBanner) {
                dontShowBanner = NO;
                adView.frame = CGRectOffset(adView.frame, 0, adView.frame.size.height);
            }
        }
        
        _androidADIsVisible = YES;
    }
}

- (void)adView:(GADBannerView *)view didFailToReceiveAdWithError:(GADRequestError *)error {
    
    if (_androidADIsVisible)
    {
        //NSLog(@"Fail To Get Google Add");
        //[UIView beginAnimations:@"animateAdBannerOff" context:NULL];
        
        admobBannerView.frame = CGRectOffset(admobBannerView.frame, 0, admobBannerView.frame.size.height);
        
        //[UIView commitAnimations];
        
        _androidADIsVisible = NO;
    }
}


- (void)dealloc {
    [super dealloc];
}


@end
