// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

/**
 * 富文本打字机效果
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class DialogRichText extends cc.Component {

    @property(cc.RichText)
    richTextNode: cc.RichText = null;

    private richTextString: string = "";

    private typeDuration: number = 2;

    private typeStringArr: string[] = [];
    
    private isSkipType: boolean = false;

    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

        // this.startType();
        this.fitScreen();
    }

    private fitScreen() { 
        this.richTextNode.maxWidth = this.node.width - 20;
        this.richTextNode.lineHeight = this.richTextNode.fontSize + 20;
    }


    public setupRichText(richTextString: string, duration: number = 2) { 
        this.richTextString = richTextString;
        this.typeDuration = duration;
        this.richTextNode.string = "";
        this.startType();
    }

    
    private startType() { 
        let str = this.richTextString;
        if (!str) { 
            return;
        }
        const delimiterCharList = ["✁","⸘","§"];
        const allRegexp = new RegExp(`<.+?\/?>`, `g`);

        //获取富文本标签
        let matchArr = str.match(allRegexp);
        //获取一个文本中没有的替换符号
        let delimiterChar = delimiterCharList.find((item) => str.indexOf(item) === -1);
        const textRegexp = new RegExp(`([^${delimiterChar}])`,`g`);
        
        //将所有的标签换成替换符号
        let replaceStr = str.replace(allRegexp, delimiterChar);
        //获取富文本中所有的文字
        let textStr = replaceStr.match(textRegexp);
        const textCount = textStr.length;
        let tagInfoArr = [];
        let index = 0;
        //将替换符号的地方换成标签,文字都变成空字符串
        for (let i = 0; i < replaceStr.length; i++) {
            if (replaceStr[i] == delimiterChar) {
                tagInfoArr[i] = matchArr[index++];
            } else { 
                tagInfoArr[i] = "";
            }
            
        }

        //生成文本数据,放到一个数组中
        for (let i = 0; i < textStr.length; i++) {
            let index = tagInfoArr.findIndex((item) => {
                return item === "";
            });
            if (index !== -1) { 
                tagInfoArr[index] = textStr[i];
                this.typeStringArr.unshift(tagInfoArr.join(""));
            }
        }

        let configTypeInterval = this.typeDuration / (textCount - 1) ;

        let typingCallback = () => {
            if (!this.typeStringArr.length) {
                return;
            }
            //每次拿最后一个数据
            const content = this.typeStringArr.pop();

            this.scheduleOnce(() => {
                //如果点击了面板,则显示所有文本
                if (this.isSkipType) {
                    return;
                }
                this.richTextNode.string = content;
                typingCallback();
            }, configTypeInterval);

        };
        typingCallback();
    }

    onClickSkipType() { 
        this.typeStringArr = [];
        this.richTextNode.string = '';
        this.richTextNode.string = this.richTextString;
        this.isSkipType = true;
    }

    onClickReplay() { 
        this.typeStringArr = [];
        this.richTextNode.string = '';
        this.isSkipType = false;
        this.unscheduleAllCallbacks();
        this.startType();
    }

    // update (dt) {}
}
