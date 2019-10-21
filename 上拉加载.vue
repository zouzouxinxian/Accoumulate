<template>
    <div class="comments-list">
        <div class="top-info">
            <div class="container">
                <div class="left">
                    商品点评（{{list.total}}）
                </div>
            </div>
        </div>
        <div class="list-content">
            <ul
                v-infinite-scroll="getData"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="50" >
                <li  v-for="(item, index) in listData" :key="index" :id="item.dianping_id">
                    <div class="box">
                        <div class="top">
                            <a :href="item.ucenter_url"><img :src="item.avatar" alt="" class="au-img" @click='checkUser'></a>
                            <a :href="item.ucenter_url"><span class="nickname" @click='checkUser'>{{item.nickname}}</span></a>
                            <img class="level-img" :src="item.author_role.official_auth_icon" alt="" v-if="item.author_role.official_auth_icon">
                            <span class="cricle" v-if='item.followed !==3'></span>
                            <span class="focus" @click="focusUser(item.followed, item.user_smzdm_id, index, $event)">{{item.followed === 1 ? '关注' : item.followed === 0 ? '已关注' : ''}}</span>
                        </div>
                        <div class="block">
                            <div class="comment_avatar_time">
                                <span class="start" v-for='(element, i) in starList' :key='i'>
                                    <template v-if='i < item.star'>
                                        <i class="red icon-star"></i>
                                    </template>
                                    <template v-else>
                                        <i class="gray icon-star"></i>
                                    </template>
                                </span>
                                <span class="date">使用{{item.used_time}}</span>
                                <button class="tag" v-if="item.is_jinghua === 1">精华</button>
                            </div>
                            <div class="description">
                                <a :href="item.dianping_url" @click='checkDetail' class="content-detail">{{item.content}}</a>
                                <span class="more-txt" @click="more">展开</span>
                            </div>
                            <div class="pictures" v-if="item.pic_list">
                                <ul class="pic-list">
                                    <li v-for="(i, m) in item.pic_list" :key="m">
                                        <a href="javascript:;"><img :src="i" alt="" @click="checkImg(item.pic_list_big[m], m, item.pic_list_big)"></a>
                                    </li>
                                </ul>
                                <div class="clear"></div>
                            </div>
                            <div class="creat-time">
                                <span class="creat-date">{{item.format_date}}</span>
                                <span class="ping"><i class="icon-comment-o-thin"></i>{{item.comment_count}}</span>
                                <span class="zan"><i class="icon-thumb-up-o-thin"></i>{{item.favorite_count}}</span>
                            </div>
                            <div class="reply" v-if="item.latest_comment.nickname">
                                <a :href="item.dianping_url" @click="ckeckReplycontent()" class="reply-txt">
                                    <span class="reply-name">{{item.latest_comment.nickname}}:</span>{{item.latest_comment.comment_text}}
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="!allLoaded && loading" class="loading"><img src="//res.smzdm.com/activity/img/iphone_active/loading.gif"></div>
            <div class="nomore" v-if="nomore">没有了哦</div>
        </div>
    </div>
</template>
<script>
import AlloyFinger from 'alloyfinger';
import axios from 'axios';
import Jsonp from 'jsonp';
export default {
    data () {
        return {
            allLoaded: false,
            loading: false, // 若为真，则无限滚动不会被触发
            nomore: false,
            moreTxt: true,
            moreDom: false,
            list: {},
            listData: [],
            limit: '10',
            starList: new Array(5),
            time_sort: '',
            channel_id: '', // 频道ID
            category_level1: '', // 一级分类
            article_id: '', // 文章ID
            cd13: 'youhui', // 频道
            queryParam: '',
            cricle: false
        };
    },
    computed: {
    },
    beforeMount () {
    },
    mounted () {
        // 屏幕统计
        this.screenSdkAll(`好价/点评列表页/${this.article_id}`);
        // 手势库
        this.AlloyFinger();
    },
    components: {
    },
    watch: {
    },
    methods: {
        // 关注 (走接口实现功能)
        focusUser (followed, userId, index, event) {
            var userCookie = this.getCookie('id');
            console.log(userCookie);
            if (userCookie) {
                if (followed === 1) {
                    // 点击关注
                    // event.target.innerHTML = '已关注';
                    this.$set(this.listData[index], 'followed', 0);
                } else {
                    // 点击已关注
                    // event.target.innerHTML = '关注';
                    this.$set(this.listData[index], 'followed', 1);
                }
                Jsonp('url' + '&keyword=' + userId, '', (err, res) => {
                    if (err) {
                        throw (err);
                    }
                    if (res.error_code === 0) {
                        console.log('focusUser*****', res);
                    } else if (res.error_code === 1) {
                        let message = {
                            module: 'module_detail_common',
                            action: 'call_client_login'
                        };
                        this.callNative(message);
                    }
                });
            } else {
                console.log('请登陆');
                let message = {
                    module: 'module_detail_common',
                    action: 'call_client_login'
                };
                this.callNative(message);
            }
            // 关注用户的follow比商品的多了一个状态,是否已经关注 0:自己，1未关注, 2已关注。不考虑为0关注自己的情况,因为已经被另一个接口隐藏了
            let data = {
                type: 'user',
                keyword: userId,
                follow: followed
            };
            console.log('datadatadatadata*****', data);
            // $操作：加关注；取消关注
            let text;
            if (followed === 1) {
                text = '加关注';
            } else {
                text = '取消关注';
            }
        },
        // 查看更多
        more (event) {
            this.addClass(event.target.parentNode, 'list-close');
        },
        close (event) {
            this.removeClass(event.target.parentNode, 'list-close');
        },
        hasClass (obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        addClass (obj, cls) {
            if (!this.hasClass(obj, cls)) obj.className += ' ' + cls;
        },
        removeClass (obj, cls) {
            if (this.hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        },
        arrToQueryString (arr) {
            arr.forEach((item, index) => {
                this.queryParam = this.queryParam + Object.keys(item).map(function (key) {
                    let trueKey = 'keywords[' + index + '][' + key + ']';
                    return ''.concat(encodeURIComponent(trueKey), '=').concat(encodeURIComponent(item[key])) + '&';
                }).join('');
            });
            return this.queryParam;
        },
        // 获取url的value值
        queryLinkParams (param) {
            let reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)', 'i');
            let search = window.location.search.substr(1).match(reg);
            if (search !== null) {
                return unescape(search[2]);
            }
            return null;
        },
        // 数据请求
        getData () {
            this.loading = true;
            let param = this.queryLinkParams('wiki_id');
            var listUrl = 'https:.......';
            axios.get(listUrl, {
                params: {
                    limit: this.limit,
                    timesort: this.time_sort
                }
            }).then(res => {
                if (res.data.error_code === 0) {
                    console.log('resssssss', res.data);
                    this.list = res.data.data;
                    if (this.list.rows && this.list.rows.length) {
                        this.listData = this.listData.concat(this.list.rows);
                        this.loading = false;
                        // 展开收起
                        this.$nextTick(() => {
                            let contentDom = document.querySelectorAll('.content-detail');
                            contentDom = [...contentDom];
                            console.log(contentDom);
                            contentDom.forEach((item, index) => {
                                let height = item.offsetHeight;
                                if (height > 92) {
                                    this.addClass(item.parentNode, 'list-more');
                                }
                            });
                            let contentId = this.queryLinkParams('content_id');
                            if (contentId) {
                                document.getElementById(contentId).scrollIntoView();
                            }
                        });
                        var dataArr = [];
                        this.listData.forEach((item, index) => {
                            dataArr.push({
                                type: 'user',
                                keyword: item.user_smzdm_id
                            });
                        });
                        this.arrToQueryString(dataArr);
                        Jsonp('url' + this.queryParam, { name: 'callback' }, (err, data) => {
                            if (err) {
                                throw (err);
                            }
                            // 关注用户的follow比商品的多了一个状态,是否已经关注 0:自己，1未关注, 2已关注。
                            if (data.error_code === 0) {
                                console.log('isFocusAjaxRequest', data);
                                let focusData = data.data;
                                if (focusData && focusData.length) {
                                    focusData.forEach((Element, i) => {
                                        if (Element.followed === 1) {
                                            // 未关注，文字显示关注
                                            this.$set(this.listData[i], 'followed', 1);
                                            this.cricle = true;
                                        } else if (Element.followed === 2) {
                                            // 已关注，文字显示已关注
                                            this.$set(this.listData[i], 'followed', 0);
                                            this.cricle = true;
                                        } else {
                                            this.$set(this.listData[i], 'followed', 3);
                                            this.cricle = false;
                                        }
                                    });
                                }
                            } else {
                                console.log(data.error_msg);
                            }
                            console.log('dddddd******', data);
                        });
                        this.time_sort = this.listData[this.listData.length - 1].timesort;
                    } else {
                        this.loading = true;
                        this.allLoaded = true;
                        this.nomore = true;
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        AlloyFinger () {
            const that = this;
            return new AlloyFinger(document.getElementsByTagName('body')[0], {
                swipe: function (evt) {
                    if (evt.direction === 'Up' && that.allLoaded) {
                        that.nomore = true;
                    }
                }
            });
        }
    },
    beforeCreate () {
        let html = document.querySelector('html');
        let docWidth = html.getBoundingClientRect().width;
        if (!docWidth) return;
        if (docWidth > 750) {
            html.style.fontSize = 750 / 10 + 'px';
        } else {
            html.style.fontSize = docWidth * 0.1 + 'px';
        }
    },
    created () {
        this.channel_id = document.getElementById('channel_id').value;
        console.log(this.channel_id);
        this.category_level1 = document.getElementById('category_level1').value;
        console.log(this.category_level1);
        this.article_id = document.getElementById('article_id').value;
        console.log(this.article_id);
        if (this.channel_id === '2') {
            this.cd13 = 'faxian';
        } else if (this.channel_id === '5') {
            this.cd13 = 'haitao';
        }
        console.log(this.cd13);
    }
};
</script>
<style lang="scss">
    @import 'src/commons/styles/common.scss';
    @function rem($px) {
        @return $px/75 * 2rem;
    }
    body {
        max-width: 750px;
        margin: 0 auto;
    }
    button{
        margin:0;
        padding:0;
        background-color:#ffffff;
        line-height:inherit;
        border-radius:0;
        border:none;
        justify-content:center;
        align-items:center;
    }
    button::after{
        border: none;
    }
    .loading {
        text-align: center;
        padding: 15px 0 30px;

        img {
            height: 24px;
        }
    }

    .nomore {
        font-size: 14px;
        color: #999;
        text-align: center;
        padding: 0 0 35px;
    }
    .top-info {
        width: 100%;
        padding-top: rem(13);
        padding-bottom: rem(7);
        background: #EEEEEE;

        .container {
            padding: 0 rem(15);
            font-size: 12px;
            color: #999999;
            line-height: 12px;
            display: flex;
            justify-content: space-between;

            i{
                font-size: 12px;
                vertical-align: -1px;
            }
        }
    }
    .label-box {
        padding: 0 rem(15);
        margin-top: 15px;
        margin-bottom: 20px;

        ul {
            width: 100%;
            height: 80px;
            li{
                float: left;
                height: auto;
                margin-right: 10px;
                margin-top: 10px;

                .meta-tags a{
                    display: inline-block;
                    background: #FFFFFF;
                    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.08);
                    border-radius: 2px;
                    font-size: 12px;
                    color: #333333;
                    line-height: 12px;
                    padding: rem(9) rem(12);
                }
            }
        }
    }
    .more {
        padding: 0 rem(15);
        font-size: 14px;
        color: #E62828;
        letter-spacing: 0;
        line-height: 15px;
        i {
            margin-left: 5px;
            vertical-align: -1px;
        }
    }
    .list-content {
        padding: 0 rem(15);
        margin-top: 25px;
        ul li {
            margin-bottom: 35px;

            .box {
                height: auto;
            }
            .top {
                height: 32px;
                line-height: 32px;
                .au-img {
                    height: 32px;
                    width: 32px;
                    border-radius: 50% 50%;
                    float: left;
                }
                .nickname {
                    font-size: 14px;
                    color: #333333;
                    line-height: 16px;
                    margin-left: 12px;
                }
                .level-img {
                    height: 13px;
                    width: 13px;
                    margin-left: 3px;
                    vertical-align: -1px;
                }
                .cricle {
                    display: inline-block;
                    background: #999999;
                    border-radius: 50% 50%;
                    height: 2px;
                    width: 2px;
                    margin: 0 5px;
                    position: relative;
                    top: -5px;
                }
                .focus {
                    font-size: 14px;
                    color: #E62828;
                    letter-spacing: 0;
                    line-height: 15px;
                }
            }
            .block {
                background: #FFFFFF;
                box-shadow: 0 5px 20px 0 rgba(0,0,0,0.05);
                border-radius: 2px;
                padding: 0 15px;

                .comment_avatar_time {
                    margin-top: 10px;
                    padding-top: 17px;
                    padding-bottom: 7px;
                    .start {
                        .red {
                            color: #E62828;
                        }
                        .gray {
                            color: #DDDDDD;
                        }
                    }
                    .date {
                        font-size: 12px;
                        color: #999999;
                        text-align: justify;
                        line-height: 12px;
                        margin-left: 10px;
                        position: relative;
                        top: -1px;
                    }
                    .tag {
                        background: #E62828;
                        border-radius: 2px;
                        font-size: 11px;
                        color: #FFFFFF;
                        line-height: 11px;
                        padding: 2px 4px;
                        margin-top: 2px;
                        float: right;
                    }
                }

                .description {
                    font-size: 14px;
                    text-align: justify;
                    line-height: 23px;
                    position: relative;

                    &.list-more {
                        .content-detail {
                            display: inline-block;
                            color: #333333;
                            height: 92px;
                            overflow: hidden;
                        }
                        .more-txt{
                            display: block;
                        }
                        // .close-more {
                        //     display: none;
                        // }
                    }

                    &.list-close {
                        .content-detail {
                            display: inline-block;
                            color: #333333;
                            height: auto;
                        }
                        .more-txt{
                            display: none;
                        }
                        // .close-more {
                        //     display: block;
                        // }
                    }
                    .more-txt {
                        display: none;
                        width: 50px;
                        text-align: right;
                        background-color: #fff;
                        color: #5188A6;
                        float: right;
                        position: absolute;
                        right: 0;
                        margin-top: -22px;
                        background: url('https://res.smzdm.com/h5/h5_haojia/dist/img/more-bg.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .close-more {
                        display: none;
                        width: 40px;
                        text-align: center;
                        background-color: #fff;
                        color: #5188A6;
                        float: right;
                        position: absolute;
                        right: 0;
                        margin-top: -22px;
                        background-image: url('https://res.smzdm.com/h5/h5_haojia/dist/img/more-bg.png')
                    }
                }

                .pictures {
                    margin-top: 4px;
                    .pic-list {
                        height: auto;
                        li {
                            height: rem(100);
                            width: rem(100);
                            float: left;
                            margin-right: 5px;
                            margin-top: 5px;
                            margin-bottom: 0;
                            text-align: center;
                            border-radius: 2px;
                            overflow: hidden;

                            img{
                                max-width: 100%;
                                max-height: 100%;
                                vertical-align: middle;
                            }

                            &::before {
                                content: "";
                                display: inline-block;
                                width: 0;
                                height: 100%;
                                vertical-align: middle;
                            }
                        }
                    }
                    .clear {
                        clear: both;
                    }
                }
                .txt-tags {
                    padding-top: 12px;
                    height: 16px;
                    ul {
                        height: 16px;
                        li {
                            float: left;
                            background: #F5F5F5;
                            border-radius: 2px;
                            font-size: 12px;
                            color: #999999;
                            line-height: 12px;
                            padding: 2px 4px;
                            margin-right: 5px;
                        }
                    }
                }
                .creat-time {
                    padding-top: 10px;
                    height: 12px;
                    padding-bottom: 14px;
                    position: relative;

                    .creat-date {
                        font-size: 12px;
                        color: #999999;
                        letter-spacing: 0;
                        text-align: right;
                        line-height: 12px;
                        position: absolute;
                        left: 0;
                    }
                    .zan {
                        font-size: 12px;
                        min-width: 52px;
                        color: #999999;
                        letter-spacing: 0;
                        line-height: 12px;
                        float: right;
                        i {
                            font-size: 12px;
                            margin-right: 5px;
                        }
                    }
                    .ping {
                        float: right;
                        min-width: 52px;
                        font-size: 12px;
                        color: #999999;
                        letter-spacing: 0;
                        line-height: 12px;
                        i {
                            font-size: 12px;
                            margin-right: 5px;
                        }
                    }
                }
                .reply {
                    padding-top: 10px;
                    border-top: 1px solid #f5f5f5;
                    padding-bottom: 18px;

                    .reply-name {
                        font-size: 13px;
                        color: #5188A6;
                        line-height: 23px;
                        margin-right: 5px;
                        font-weight: bold;
                    }
                    .reply-txt {
                        font-size: 13px;
                        color: #666666;
                        line-height: 23px;
                        max-height: 46px;
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }
            }
        }
    }
</style>
