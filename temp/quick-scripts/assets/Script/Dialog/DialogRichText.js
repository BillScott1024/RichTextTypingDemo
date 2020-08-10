(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Dialog/DialogRichText.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '104eeI6U1xNkrDfiDqhD7fR', 'DialogRichText', __filename);
// Script/Dialog/DialogRichText.ts

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
/**
 * 富文本打字机效果
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DialogRichText = /** @class */ (function (_super) {
    __extends(DialogRichText, _super);
    function DialogRichText() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.richTextNode = null;
        _this.richTextString = "";
        _this.typeDuration = 2;
        _this.typeStringArr = [];
        _this.isSkipType = false;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    DialogRichText.prototype.start = function () {
        // this.startType();
        this.fitScreen();
    };
    DialogRichText.prototype.fitScreen = function () {
        this.richTextNode.maxWidth = this.node.width - 20;
        this.richTextNode.lineHeight = this.richTextNode.fontSize + 20;
    };
    DialogRichText.prototype.setupRichText = function (richTextString, duration) {
        if (duration === void 0) { duration = 2; }
        this.richTextString = richTextString;
        this.typeDuration = duration;
        this.richTextNode.string = "";
        this.startType();
    };
    DialogRichText.prototype.startType = function () {
        var _this = this;
        var str = this.richTextString;
        if (!str) {
            return;
        }
        var delimiterCharList = ["✁", "⸘", "§"];
        var allRegexp = new RegExp("<.+?/?>", "g");
        //获取富文本标签
        var matchArr = str.match(allRegexp);
        //获取一个文本中没有的替换符号
        var delimiterChar = delimiterCharList.find(function (item) { return str.indexOf(item) === -1; });
        var textRegexp = new RegExp("([^" + delimiterChar + "])", "g");
        //将所有的标签换成替换符号
        var replaceStr = str.replace(allRegexp, delimiterChar);
        //获取富文本中所有的文字
        var textStr = replaceStr.match(textRegexp);
        var textCount = textStr.length;
        var tagInfoArr = [];
        var index = 0;
        //将替换符号的地方换成标签,文字都变成空字符串
        for (var i = 0; i < replaceStr.length; i++) {
            if (replaceStr[i] == delimiterChar) {
                tagInfoArr[i] = matchArr[index++];
            }
            else {
                tagInfoArr[i] = "";
            }
        }
        //生成文本数据,放到一个数组中
        for (var i = 0; i < textStr.length; i++) {
            var index_1 = tagInfoArr.findIndex(function (item) {
                return item === "";
            });
            if (index_1 !== -1) {
                tagInfoArr[index_1] = textStr[i];
                this.typeStringArr.unshift(tagInfoArr.join(""));
            }
        }
        var configTypeInterval = this.typeDuration / (textCount - 1);
        var typingCallback = function () {
            if (!_this.typeStringArr.length) {
                return;
            }
            //每次拿最后一个数据
            var content = _this.typeStringArr.pop();
            _this.scheduleOnce(function () {
                //如果点击了面板,则显示所有文本
                if (_this.isSkipType) {
                    return;
                }
                _this.richTextNode.string = content;
                typingCallback();
            }, configTypeInterval);
        };
        typingCallback();
    };
    DialogRichText.prototype.onClickSkipType = function () {
        this.typeStringArr = [];
        this.richTextNode.string = '';
        this.richTextNode.string = this.richTextString;
        this.isSkipType = true;
    };
    DialogRichText.prototype.onClickReplay = function () {
        this.typeStringArr = [];
        this.richTextNode.string = '';
        this.isSkipType = false;
        this.unscheduleAllCallbacks();
        this.startType();
    };
    __decorate([
        property(cc.RichText)
    ], DialogRichText.prototype, "richTextNode", void 0);
    DialogRichText = __decorate([
        ccclass
    ], DialogRichText);
    return DialogRichText;
}(cc.Component));
exports.default = DialogRichText;

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
        //# sourceMappingURL=DialogRichText.js.map
        