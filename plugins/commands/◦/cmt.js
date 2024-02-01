const config = {
    name: "cmt",
    description: "uwu",
    permissions: [2]
}

const icons = ['🐼', '🦦', '🐙',];
let defaultComment = ["Tr Minh Thuan","mthuan yeu em moa moa" ];

function getGUID() {
    let _0x161e32 = Date.now(),
        _0x4ec135 = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (_0x32f946) {
                let _0x141041 = Math.floor((_0x161e32 + Math.random() * 16) % 16)
                _0x161e32 = Math.floor(_0x161e32 / 16)
                let _0x31fcdd = (
                    _0x32f946 == 'x' ? _0x141041 : (_0x141041 & 7) | 8
                ).toString(16)
                return _0x31fcdd
            }
        )
    return _0x4ec135
}
async function onCall({ message, args }) {
    let postID, quantity, delay;

    if (isNaN(args[1])) return message.reply("Số lượng không khả dụng!");
    if (isNaN(args[2])) return message.reply("Delay không khả dụng!");

    postID = args[0];
    quantity = parseInt(args[1]);
    delay = parseInt(args[2]);

    const feedback_id = Buffer.from('feedback:' + postID).toString('base64');

    message.reply("Đã Nhận Lệnh Spam Cmt Bài Biết ✅");

    let arr = [];

    for (let i = 0; i < quantity; i++) {
        try {
            const ss1 = getGUID();
            const ss2 = getGUID();
            const randomComment = defaultComment[Math.floor(Math.random() * defaultComment.length)];
            const randomIcon1 = icons[Math.floor(Math.random() * icons.length)];

            

            const form = {
                av: global.botID,
                fb_api_req_friendly_name: "CometUFICreateCommentMutation",
                fb_api_caller_class: "RelayModern",
                doc_id: "4744517358977326",
                variables: JSON.stringify({
                    "displayCommentsFeedbackContext": null,
                    "displayCommentsContextEnableComment": null,
                    "displayCommentsContextIsAdPreview": null,
                    "displayCommentsContextIsAggregatedShare": null,
                    "displayCommentsContextIsStorySet": null,
                    "feedLocation": "TIMELINE",
                    "feedbackSource": 0,
                    "focusCommentID": null,
                    "includeNestedComments": false,
                    "input": {
                        "attachments": null,
                        "feedback_id": feedback_id,
                        "formatting_style": null,
                        "message": {
                            "ranges": [],
                            "text": `${randomComment} ${randomIcon1}`
                        },
                        "is_tracking_encrypted": true,
                        "tracking": [],
                        "feedback_source": "PROFILE",
                        "idempotence_token": "client:" + ss1,
                        "session_id": ss2,
                        "actor_id": global.botID,
                        "client_mutation_id": Math.round(Math.random() * 19)
                    },
                    "scale": 3,
                    "useDefaultActor": false,
                    "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute"
                })
            };

            const res = JSON.parse(await global.api.httpPost('https://www.facebook.com/api/graphql/', form));
            if (res.data.comment_create) {
                arr.push(`Comment ${i + 1}: đã gửi thành công ✅`)
            } else {
                message.reply(`Comment ${i + 1}: ❌\n${res.errors[0].description}`);
                return;
            }
        } catch (err) {
            arr.push(`Comment ${i + 1}: ❌`);
            console.error(err);
            break;
        }

        await new Promise(resolve => setTimeout(resolve, delay * 1000));
    }

    message.reply(arr.join("\n"));
}

export default {
    config,
    onCall
}