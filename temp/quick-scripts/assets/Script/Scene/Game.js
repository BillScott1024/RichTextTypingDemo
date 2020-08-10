(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Scene/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fc585mOxQZLz5RcfL+Eo6TK', 'Game', __filename);
// Script/Scene/Game.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var DialogRichText_1 = require("../Dialog/DialogRichText");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.richTextDialogPrefab = null;
        // LIFE-CYCLE CALLBACKS:
        _this.dialogNode = null;
        _this.richTextString = "<color=#FFFF00><size = 20>[NPC][Lv.999]</size></color><color=	#8968CD><u>星✁辰Xingchen</u>:</color><color=#0FFF0F>勇者,你愿意跟我一起去冒险吗?<笑声></color><b><color=#00E5EE><i><size = 30>(引导者向你伸出了手)</size></i></color></b>";
        return _this;
        // update (dt) {}
    }
    // richTextString: string = "[NPC][Lv.999]星✁辰Xingchen:勇者,你愿意跟我一起去冒险吗?<笑声>(引导者向你伸出了手)";
    // onLoad () {}
    Game.prototype.start = function () {
    };
    Game.prototype.onClickStartDialog = function () {
        if (this.dialogNode) {
            this.dialogNode.removeFromParent(true);
        }
        this.dialogNode = cc.instantiate(this.richTextDialogPrefab);
        if (!this.dialogNode) {
            return;
        }
        this.node.addChild(this.dialogNode);
        this.dialogNode.setPosition(0, 0);
        var dialogRichText = this.dialogNode.getComponent(DialogRichText_1.default);
        dialogRichText.setupRichText(this.richTextString, 2);
    };
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "richTextDialogPrefab", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        