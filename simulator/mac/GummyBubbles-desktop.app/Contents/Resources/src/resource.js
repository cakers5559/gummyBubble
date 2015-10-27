var res = {    
    MainScene_json : "res/MainScene.json",
    GameScene_json : "res/GameScene.json",
    SettingsScene_json : "res/SettingScene.json",   
    bubble: "res/main_menu_assets",
    
    //Levels one json
    bg_super_large_level_1: "res/game_menu_assets/layers/level_1/bg_super_large_level_1.json",
    bg_large_level_1: "res/game_menu_assets/layers/level_1/bg_large_level_1.json",
    bg_medium_level_1: "res/game_menu_assets/layers/level_1/bg_medium_level_1.json",
    bg_small_level_1: "res/game_menu_assets/layers/level_1/bg_small_level_1.json"    
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}



