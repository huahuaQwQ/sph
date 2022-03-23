export const sendEmailCode = (email) => {

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '378876524@qq.com',
            pass: 'xgafkekekfsrbhed' //授权码,通过QQ获取
        }
    });

    var mailOptions = {
        from: '378876524@qq.com', // 发送者
        to: this.emial, // 接受者,可以同时发送多个,以逗号隔开
        subject: '尚品汇邮箱验证码', // 标题
        text: '验证码:123456', // 文本
        // html: `nodemailer基本使用:`,
    };



    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('发送成功');
    });
}