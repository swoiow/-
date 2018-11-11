// weui-cell__disabled
// weui-icon-success
// weui-icon-success-no-circle
// weui-icon-cancel
const app = getApp()

Page({
    data: {
        showAnalysis: false,
        topic: null,
    },
    onLoad: function () {
        let storage = wx.getStorageSync('jk_topic') || require('../../utils/data')
        wx.setStorageSync('jk_topic', { data: storage.data })
        wx.showToast({
            icon: 'none',
            title: '本地共加载 ' + storage.data.length + ' 道题目',
            duration: 1800
        })

        this.getTopic()
    },
    enableSelectbox: function () { 
        this.setData({
            selectboxDom: "weui-cells weui-cells_after-title"
        })
    },
    disableSelectbox: function () {
        this.setData({
            selectboxDom: "weui-cells weui-cells_after-title weui-cells__disabled"
        })
     },

    checkAnswer: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var answerItems = this.data.topic.answers;
        for (var i = 0, len = answerItems.length; i < len; ++i) {
            answerItems[i].checked = answerItems[i].k == e.detail.value;
        }

        let n_topic = this.data.topic
        n_topic.answers = answerItems
        this.setData({
            topic: n_topic,
            showAnalysis: true
        });

        this.disableSelectbox()
    },
    getTopic: function () {
        let ctx = this
        let storage = wx.getStorageSync('jk_topic')
        let topic = Math.round(Math.random() * (storage.data.length - 1))
        ctx.setData({ topic: storage.data[topic], showAnalysis: false, })
        ctx.enableSelectbox()
    },
    myEvent: function (e) {
        let ctx = this

        wx.showLoading({
            title: '下一题',
            success: ctx.getTopic,
            complete: wx.hideLoading
        })
    },

    showTopTips: function () {
        var that = this;
        this.setData({
            showTopTips: true
        });
        setTimeout(function () {
            that.setData({
                showTopTips: false
            });
        }, 3000);
    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }

        this.setData({
            radioItems: radioItems
        });
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        var checkboxItems = this.data.checkboxItems, values = e.detail.value;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if (checkboxItems[i].value == values[j]) {
                    checkboxItems[i].checked = true;
                    break;
                }
            }
        }

        this.setData({
            checkboxItems: checkboxItems
        });
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },
    bindCountryCodeChange: function (e) {
        console.log('picker country code 发生选择改变，携带值为', e.detail.value);

        this.setData({
            countryCodeIndex: e.detail.value
        })
    },
    bindCountryChange: function (e) {
        console.log('picker country 发生选择改变，携带值为', e.detail.value);

        this.setData({
            countryIndex: e.detail.value
        })
    },
    bindAccountChange: function (e) {
        console.log('picker account 发生选择改变，携带值为', e.detail.value);

        this.setData({
            accountIndex: e.detail.value
        })
    },
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    }
});