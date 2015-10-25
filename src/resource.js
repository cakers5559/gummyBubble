var res = {    
    MainScene_json : "res/MainScene.json",
    bubble: "res/main_menu_assets"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

var g_groundHeight = 0;
var g_runnerStartX = 80;
