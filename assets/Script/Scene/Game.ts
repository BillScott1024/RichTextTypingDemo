// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import DialogRichText from "../Dialog/DialogRichText";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    

    @property(cc.Prefab)
    richTextDialogPrefab: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:

    dialogNode: cc.Node = null;

    richTextString: string = "<color=#FFFF00><size = 20>[NPC][Lv.999]</size></color><color=	#8968CD><u>星✁辰Xingchen</u>:</color><color=#0FFF0F>勇者,你愿意跟我一起去冒险吗?<笑声></color><b><color=#00E5EE><i><size = 30>(引导者向你伸出了手)</size></i></color></b>";
    // richTextString: string = "[NPC][Lv.999]星✁辰Xingchen:勇者,你愿意跟我一起去冒险吗?<笑声>(引导者向你伸出了手)";
    // onLoad () {}

    start () {

    }

    onClickStartDialog() {
        if (this.dialogNode) { 
            this.dialogNode.removeFromParent(true);
        }
        this.dialogNode = cc.instantiate(this.richTextDialogPrefab);
        if (!this.dialogNode) { 
            return;
        }
        this.node.addChild(this.dialogNode);
        this.dialogNode.setPosition(0, 0);
        const dialogRichText = this.dialogNode.getComponent(DialogRichText);
        dialogRichText.setupRichText(this.richTextString, 2);
    }

    // update (dt) {}
}
