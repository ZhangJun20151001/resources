jQuery.cookie = function(a, c, b) {
    if ("undefined" != typeof c) {
        b = b || {};
        null === c && (c = "", b.expires = -1);
        var d = "";
        b.expires && ("number" == typeof b.expires || b.expires.toUTCString) && ("number" == typeof b.expires ? (d = new Date, d.setTime(d.getTime() + 864E5 * b.expires)) : d = b.expires, d = "; expires=" + d.toUTCString());
        var e = b.path ? "; path=" + b.path : "",
            f = b.domain ? "; domain=" + b.domain : "";
        b = b.secure ? "; secure" : "";
        window.document.cookie = [a, "=", encodeURIComponent(c), d, e, f, b].join("")
    } else {
        c = null;
        if (window.document.cookie && "" != window.document.cookie)
            for (b = window.document.cookie.split(";"), d = 0; d < b.length; d++)
                if (e = jQuery.trim(b[d]), e.substring(0, a.length + 1) == a + "=") {
                    c = decodeURIComponent(e.substring(a.length + 1));
                    break
                }
        return c
    }
};
var user = "297585985";
var name = "412061247";
var showName = "不想炸毛的猫";
var geci = "open";
var auto = "colse";
var random = "open";
var welcome = "open";
var tips = "welcome!";
var NeiCeLists;
// if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) $("#wenkmPlayer").hide();
// else if (top.location != self.location) $("#wenkmPlayer").hide();
// else {
var formatSecond = function(a) {
        return ("00" + Math.floor(a / 60)).substr(-2) + ":" + ("00" + Math.floor(a % 60)).substr(-2)
    },
    wenkmCicle = function() {
        $songTime.text(formatSecond(audio.currentTime) + " / " + formatSecond(audio.duration));
        audio.currentTime < audio.duration / 2 ? $btns.css("background-image", "linear-gradient(90deg, " + roundcolor + " 50%, transparent 50%, transparent), linear-gradient(" + (90 + 180 / (audio.duration / 2) * audio.currentTime) + "deg, " + lightcolor + " 50%, " + roundcolor + " 50%, " + roundcolor + ")") : $btns.css("background-image", "linear-gradient(" + (90 + 180 / (audio.duration / 2) * audio.currentTime) + "deg, " + lightcolor + " 50%, transparent 50%, transparent), linear-gradient(270deg, " + lightcolor + " 50%, " + roundcolor + " 50%, " + roundcolor + ")")
    };
apiurl = "http://api.neice.org/API_163/";
fileurl = apiurl + "wy_list.php?id=" + user;
"open" != geci ? (songFrom33 = "蜗牛", hasgeci = !1) : (songFrom33 = "蜗牛", hasgeci = !0);
random = "open" != random ? !1 : !0;
var audio = new Audio,
    $player = $("#wenkmPlayer"),
    $tips = $("#wenkmTips"),
    $lrc = $("#wenkmLrc"),
    $play = $(".switch-player", $player),
    $btns = $(".status", $player),
    $songName = $(".song", $player),
    $cover = $(".cover", $player),
    $songTime = $(".time", $player),
    $songList = $(".song-list .list", $player);
$albumList = $(".album-list", $player);
$songFrom = $(".player .artist", $player);
$songFrom1 = $(".player .artist1", $player);
$songFrom2 = $(".player .moshi", $player);
$songFrom3 = $(".player .geci", $player);
$songFrom4 = $(".player .switch-ksclrc", $player);
$songFrom5 = $(".player .switch-down", $player);
songFrom55 = songFrom44 = "";
roundcolor = "#6c6971";
lightcolor = "#81c300";
cur = "current";
volume = $.cookie("player_volume") ? $.cookie("player_volume") : ".9";
songTotal = songId = albumId = 0;
ycgeci = showLrc = !0;
musicfirsttip = hasdefault = !1;
var cicleTime = null;
$cover.html('<img src="http://api.neice.org/API_163/default.jpg">');
$songName.html('<a style="color:#f00">请稍等...</a>');
$songFrom.html('<a style="color:#f00">测试</a>');
$songFrom1.html('<a href="http://www.neice.org" target="_blank" style="color:#f00">NeiCe.ORG</a>');
$songFrom3.html('<i class="fa fa-times-circle"></i>');
$player.css({
    background: "#38343e"
});
$play.css({
    background: "#38343e"
});
$lrc.css({
    background: "#38343e"
});
$tips.css({
    background: "#38343e"
});
var wenkmMedia = {
        play: function() {
            $player.addClass("playing");
            cicleTime = setInterval(wenkmCicle, 800);
            hasLrc && (lrcTime = setInterval(wenkmLrc.lrc.play, 500), $("#wenkmLrc").addClass("show"), $(".switch-down").css("right", "65px"), $(".switch-default").css("right", "95px"), hasdefault ? setTimeout(function() {
                $(".switch-ksclrc").show()
            }, 300) : $(".switch-ksclrc").show())
        },
        pause: function() {
            clearInterval(cicleTime);
            $player.removeClass("playing");
            $(".switch-ksclrc").hide();
            $(".switch-down").css("right", "35px");
            $(".switch-default").css("right", "65px");
            hasLrc && wenkmLrc.lrc.hide()
        },
        error: function() {
            clearInterval(cicleTime);
            $player.removeClass("playing");
            wenkmTips.show(NeiCeLists[albumId].song_list[songId].song_title);
            setTimeout(function() {
                wenkmMedia.prev()
            }, 1E3);
            $(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide()
        },
        seeking: function() {
            clearInterval(cicleTime);
            $player.removeClass("playing");
            wenkmTips.show("不想炸毛的猫...")
        },
        volumechange: function() {
            var a = window.parseInt(100 * audio.volume);
            $(".volume-on", $player).width(a + "%");
            wenkmTips.show("不想炸毛的猫" + a + "%")
        },
        getInfos: function(a) {
            $cover.removeClass("coverplay");
            $songFrom5.hide();
            songId = a;
            id = NeiCeLists[albumId].song_list[songId].song_id;
            mp3url = NeiCeLists[albumId].song_list[songId].mp3url;
            audio.src = mp3url;
            $songFrom5.show();
            $songFrom5.html('<a class="down"><i class="fa fa-cloud-download" title="' + NeiCeLists[albumId].song_list[songId].song_title + " - " + NeiCeLists[albumId].song_list[songId].singer + '"></i></a>');
            $(".down").click(function() {
                window.open(audio.src, "newwindow")
            });
            lrcurl = apiurl + "wy_lrc.php/" + id + ".lrc";
            $songName.html("<span>" + LimitStr(NeiCeLists[albumId].song_list[songId].song_title) + "</span>");
            $songFrom.html("<span>" + LimitStr(NeiCeLists[albumId].song_list[songId].singer) + "</span>");
            $songFrom1.html("<span>" + LimitStr(NeiCeLists[albumId].song_list[songId].album) + "</span>");
            allmusic();
            var c = new Image;
            c.src = NeiCeLists[albumId].song_list[songId].pic;
            $cover.addClass("changing");
            loadblur(c.src);
            c.onload = function() {
                setTimeout(function() {
                    $(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide()
                }, 800);
                setTimeout(function() {
                    $cover.removeClass("changing")
                }, 100);
                $.ajax({
                    url: apiurl + "color.php?url=" + c.src,
                    type: "GET",
                    dataType: "script",
                    success: function() {
                        $(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide();
                        playercolor()
                    },
                    error: function() {
                        $(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide();
                        playercolor()
                    }
                })
            };
            c.error = function() {
                setTimeout(function() {
                    $(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide()
                }, 800);
                c.src = apiurl + "default.jpg";
                setTimeout(function() {
                    wenkmTips.show(NeiCeLists[albumId].song_list[songId].song_title + " - ")
                }, 4E3)
            };
            $cover.html(c);
            audio.volume = volume; - 1 != window.document.cookie.indexOf("player=") ? (wenkmMedia.pause(), $("#wenkmLrc").hide(), setTimeout(function() {
                $(".switch-ksclrc").hide();
                $(".switch-down").css("right", "35px");
                $(".switch-default").css("right", "65px")
            }, 1), setTimeout(function() {
                wenkmTips.show("不想炸毛的猫")
            }, 3E3)) : "close" != auto ? (wenkmTips.show(NeiCeLists[albumId].song_list[songId].song_title), audio.play(), $cover.addClass("coverplay")) : (wenkmMedia.pause(), $("#wenkmLrc").hide(), setTimeout(function() {
                $(".switch-ksclrc").hide();
                $(".switch-down").css("right", "35px");
                $(".switch-default").css("right", "65px")
            }, 1), setTimeout(function() {
                wenkmTips.show("不想炸毛的猫")
            }, 3E3));
            wenkmLrc.load();
            RootCookies.SetCookie("player_show", "yes", 1)
        },
        getSongId: function(a) {
            return a >= songTotal ? 0 : 0 > a ? songTotal - 1 : a
        },
        next: function() {
            random ? wenkmMedia.getInfos(window.parseInt(Math.random() * songTotal)) : wenkmMedia.getInfos(wenkmMedia.getSongId(songId + 1))
        },
        prev: function() {
            random ? wenkmMedia.getInfos(window.parseInt(Math.random() * songTotal)) : wenkmMedia.getInfos(wenkmMedia.getSongId(songId - 1))
        }
    },
    wenkmTipsTime = null,
    wenkmTips = {
        show: function(a) {
            clearTimeout(wenkmTipsTime);
            $("#wenkmTips").text(a).addClass("show");
            this.hide()
        },
        hide: function() {
            wenkmTipsTime = setTimeout(function() {
                $("#wenkmTips").removeClass("show");
                0 == musicfirsttip && (musicfirsttip = !0, "open" == welcome && wenkmTips.show(tips))
            }, 4E3)
        }
    };
audio.addEventListener("play", wenkmMedia.play, !1);
audio.addEventListener("pause", wenkmMedia.pause, !1);
audio.addEventListener("ended", wenkmMedia.next, !1);
audio.addEventListener("playing", wenkmMedia.playing, !1);
audio.addEventListener("volumechange", wenkmMedia.volumechange, !1);
audio.addEventListener("error", wenkmMedia.error, !1);
audio.addEventListener("seeking", wenkmMedia.seeking, !1);
$play.click(function() {
    $player.toggleClass("show")
});
$(function() {
    window.RootCookies = {};
    window.RootCookies.SetCookie = function(a, c, b) {
        var d = new Date;
        d.setTime(d.getTime() + 864E5 * b);
        window.document.cookie = a + "=" + window.escape(c) + (null == b ? "" : ";expires=" + d.toGMTString()) + ";path=/"
    }
});
$(".pause", $player).click(function() {
    hasgeci = !1;
    $("li", $albumList).eq(albumId).addClass(cur).find(".artist").html("不想炸毛的猫 > ").parent().siblings().removeClass(cur).find(".artist").html("").parent();
    wenkmTips.show(NeiCeLists[albumId].song_list[songId].song_title);
    setTimeout(function() {
        wenkmTips.show("不想炸毛的猫")
    }, 4E3);
    $cover.removeClass("coverplay");
    RootCookies.SetCookie("player", "no", 30);
    audio.pause()
});
$(".play", $player).click(function() {
    hasgeci = !0;
    RootCookies.SetCookie("player", "no", -1);
    auto = "";
    $("#wenkmLrc").show();
    $("li", $albumList).eq(albumId).addClass(cur).find(".artist").html("不想炸毛的猫 > ").parent().siblings().removeClass(cur).find(".artist").html("").parent();
    wenkmTips.show(NeiCeLists[albumId].song_list[songId].song_title);
    setTimeout(function() {
        wenkmTips.show("不想炸毛的猫")
    }, 4E3);
    $cover.addClass("coverplay");
    audio.play()
});
$(".prev", $player).click(function() {
    RootCookies.SetCookie("player", "no", -1);
    hasgeci = !0;
    auto = "";
    $("#wenkmLrc").show();
    wenkmMedia.prev();
    $(".myhk_pjax_loading_frame,.myhk_pjax_loading").show()
});
$(".next", $player).click(function() {
    RootCookies.SetCookie("player", "no", -1);
    hasgeci = !0;
    auto = "";
    $("#wenkmLrc").show();
    wenkmMedia.next();
    $(".myhk_pjax_loading_frame,.myhk_pjax_loading").show()
});
$(".random", $player).click(function() {
    $(this).addClass(cur);
    $(".loop", $player).removeClass(cur);
    random = !0;
    wenkmTips.show("不想炸毛的猫");
    $songFrom2.html('<i class="random fa fa-random current"></i>不想炸毛的猫')
});
$(".loop", $player).click(function() {
    $(this).addClass(cur);
    $(".random", $player).removeClass(cur);
    random = !1;
    wenkmTips.show("不想炸毛的猫");
    $songFrom2.html('<i class="loop fa fa-retweet"></i> 不想炸毛的猫')
});
var $progress = $(".progress", $player);
$progress.click(function(a) {
    var c = $progress.width(),
        b = $progress.offset().left;
    volume = (a.clientX - b) / c;
    $.cookie("player_volume", volume, {
        path: "/",
        expires: 0
    });
    audio.volume = volume
});
var isDown = !1;
$(".drag", $progress).mousedown(function() {
    isDown = !0;
    $(".volume-on", $progress).removeClass("ts5")
});
$(window).on({
    mousemove: function(a) {
        if (isDown) {
            var c = $progress.width(),
                b = $progress.offset().left;
            a = a.clientX;
            a >= b && a <= b + c && ($(".volume-on", $progress).width((a - b) / c * 100 + "%"), volume = (a - b) / c, audio.volume = volume)
        }
    },
    mouseup: function() {
        isDown = !1;
        $(".volume-on", $progress).addClass("ts5")
    }
});
$(".switch-playlist").click(function() {
    $player.toggleClass("showAlbumList")
});
$songList.mCustomScrollbar();
$(".song-list .musicheader,.song-list .fa-angle-right", $player).click(function() {
    $player.removeClass("showSongList")
});
$(".switch-ksclrc").click(function() {
    $player.toggleClass("ksclrc");
    $("#wenkmLrc").toggleClass("hide");
    $("#wenkmLrc").hasClass("hide") ? (ycgeci = !1, hasLrc && $songFrom3.html('<i class="fa fa-times-circle"></i>'), wenkmTips.show("不想炸毛的猫"), songFrom33 = "网易", $songFrom4.html('<i class="fa fa-toggle-off" title="不想炸毛的猫"></i>')) : (ycgeci = !0, hasLrc && $songFrom3.html('<i class="fa fa-check-circle"></i>'), wenkmTips.show("不想炸毛的猫"), songFrom33 = "网易", $songFrom4.html('<i class="fa fa-toggle-on" title="不想炸毛的猫"></i>'))
});
$(".switch-default").click(function() {
    songTotal = songId = albumId = id = 0;
    $player.removeClass("showSongList");
    $(".myhk_pjax_loading_frame,.myhk_pjax_loading").show();
    $.ajax({
        url: fileurl,
        type: "GET",
        dataType: "script",
        success: function() {
            wenkmTips.show(NeiCeLists[albumId].song_album);
            $(".switch-default").hide();
            hasdefault = !1;
            wenkmPlayer.playList.creat.album();
            $(".play", $player).click()
        },
        error: function(a, c, b) {
            wenkmTips.show("不想炸毛的猫!");
            $(".switch-default").show()
        }
    })
});
$.ajax({
    url: fileurl,
    type: "GET",
    dataType: "script",
    success: function() {
        wenkmPlayer.playList.creat.album()
    },
    error: function(a, c, b) {
        wenkmTips.show("不想炸毛的猫!")
    }
});
wenkmPlayer.newplayList = {
    creat: {
        album: function() {
            var a = NeiCeLists.length,
                c = "";
            $(".musicheader", $albumList).text(showName + "(" + a + ")");
            for (var b = 0; b < a; b++) c += '<li><i class="fa fa-angle-right"></i><span class="index">' + (b + 1) + '</span><span class="artist"></span>' + NeiCeLists[b].song_album + " - " + NeiCeLists[b].song_album1 + "</li>";
            $(".list", $albumList).html("<ul>" + c + "</ul>").mCustomScrollbar();
            $("li", $albumList).click(function() {
                var a = $(this).index();
                $(this).hasClass(cur) ? wenkmPlayer.newplayList.creat.song(a, !0) : wenkmPlayer.newplayList.creat.song(a, !1);
                $player.addClass("showSongList")
            });
            songTotal = NeiCeLists[albumId].song_list.length
        },
        song: function(a, c) {
            songTotal = NeiCeLists[a].song_list.length;
            var b = "";
            $(".song-list .musicheader span", $player).text(NeiCeLists[a].song_album + "(" + songTotal + ")");
            for (var d = 0; d < songTotal; d++) b += '<li><span class="index">' + (d + 1) + '</span><span class="artist"></span>' + LimitStr(NeiCeLists[a].song_list[d].song_title + " - " + NeiCeLists[a].song_list[d].singer, 22) + "</li>";
            $("ul", $songList).html(b);
            $songList.attr("data-album", a);
            $songList.mCustomScrollbar("update");
            c ? ($("li", $songList).eq(songId).addClass(cur).siblings().removeClass(cur), $songList.mCustomScrollbar("scrollTo", $("li.current", $songList).position().top - 120)) : $songList.mCustomScrollbar("scrollTo", "top");
            $("li", $songList).click(function() {
                hasgeci = !0;
                auto = "";
                $(".myhk_pjax_loading_frame,.myhk_pjax_loading").show();
                albumId = a;
                $(this).hasClass(cur) ? ($(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide(), wenkmTips.show(NeiCeLists[a].song_list[d].song_title)) : (RootCookies.SetCookie("player", "no", -1), $(this).addClass(cur).siblings().removeClass(cur), songId = $(this).index(), wenkmMedia.getInfos(songId))
            })
        }
    }
};
wenkmPlayer.playList = {
    creat: {
        album: function() {
            var a = NeiCeLists.length,
                c = "";
            $(".musicheader", $albumList).text(name + "(" + a + ")");
            for (var b = 0; b < a; b++) c += '<li><i class="fa fa-angle-right"></i><span class="index">' + (b + 1) + '</span><span class="artist"></span>' + NeiCeLists[b].song_album + " - " + NeiCeLists[b].song_album1 + "</li>";
            $(".list", $albumList).html("<ul>" + c + "</ul>").mCustomScrollbar();
            $("li", $albumList).click(function() {
                var a = $(this).index();
                $(this).hasClass(cur) ? wenkmPlayer.playList.creat.song(a, !0) : wenkmPlayer.playList.creat.song(a, !1);
                $player.addClass("showSongList")
            });
            songTotal = NeiCeLists[albumId].song_list.length;
            random ? wenkmMedia.getInfos(window.parseInt(Math.random() * songTotal)) : wenkmMedia.getInfos(wenkmMedia.getSongId(songId))
        },
        song: function(a, c) {
            songTotal = NeiCeLists[a].song_list.length;
            var b = "";
            $(".song-list .musicheader span", $player).text(NeiCeLists[a].song_album + "(" + songTotal + ")");
            for (var d = 0; d < songTotal; d++) b += '<li><span class="index">' + (d + 1) + '</span><span class="artist"></span>' + LimitStr(NeiCeLists[a].song_list[d].song_title + " - " + NeiCeLists[a].song_list[d].singer, 22) + "</li>";
            $("ul", $songList).html(b);
            $songList.attr("data-album", a);
            $songList.mCustomScrollbar("update");
            c ? ($("li", $songList).eq(songId).addClass(cur).siblings().removeClass(cur), $songList.mCustomScrollbar("scrollTo", $("li.current", $songList).position().top - 120)) : $songList.mCustomScrollbar("scrollTo", "top");
            $("li", $songList).click(function() {
                hasgeci = !0;
                auto = "";
                $(".myhk_pjax_loading_frame,.myhk_pjax_loading").show();
                albumId = a;
                $(this).hasClass(cur) ? ($(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide(), wenkmTips.show(NeiCeLists[a].song_list[d].song_title)) : (RootCookies.SetCookie("player", "no", -1), $(this).addClass(cur).siblings().removeClass(cur), songId = $(this).index(), wenkmMedia.getInfos(songId))
            })
        }
    }
};
var hasLrc = !1,
    lrcTimeLine = [],
    lrcHeight = $("#wenkmLrc").height(),
    lrcTime = null,
    letterTime1 = null,
    letterTime2 = null,
    lrcCont = "",
    kscCont = "",
    tempNum1 = 0,
    tempNum2 = 0,
    wenkmLrc = {
        load: function() {
            hasgeci || $("#wenkmLrc").addClass("hide");
            wenkmLrc.lrc.hide();
            hasLrc = !1;
            $("#wenkmLrc").html("");
            $(".switch-ksclrc").hide();
            $(".switch-down").css("right", "35px");
            $(".switch-default").css("right", "65px");
            hasgeci ? $songFrom3.html('<i class="fa fa-check-circle"></i>' + songFrom33) : $songFrom3.html('<i class="fa fa-times-circle"></i>' + songFrom33);
            $(".switch-down").css("right", "65px");
            $(".switch-default").css("right", "95px");
            hasdefault ? setTimeout(function() {
                $(".switch-ksclrc").show()
            }, 300) : $(".switch-ksclrc").show();
            $.ajax({
                url: apiurl + "wy_lrc.php/" + id + ".lrc",
                type: "GET",
                dataType: "script",
                success: function() {
                    0 <= cont.indexOf("[00") ? setTimeout(function() {
                        songFrom44 = $("#wenkmLrc").hasClass("hide") ? "不想炸毛的猫" : " 不想炸毛的猫";
                        wenkmLrc.lrc.format(cont)
                    }, 500) : (songFrom44 = "网易", $songFrom3.html('<i class="fa fa-times-circle"></i>'), $(".switch-ksclrc").hide(), $(".switch-down").css("right", "35px"), $(".switch-default").css("right", "65px"))
                }
            })
        },
        lrc: {
            format: function(a) {
                function c(a) {
                    var b = a.split(":");
                    a = +b[0];
                    var c = +b[1].split(".")[0],
                        b = +b[1].split(".")[1];
                    return 60 * a + c + Math.round(b / 1E3)
                }
                hasLrc = !0;
                a = a.replace(/\[[A-Za-z]+:(.*?)]/g, "").split(/[\]\[]/g);
                var b = "";
                lrcTimeLine = [];
                for (var d = 1; d < a.length; d += 2) {
                    var e = c(a[d]);
                    lrcTimeLine.push(e);
                    b = 1 == d ? b + ('<li class="wenkmLrc' + e + ' current">' + a[d + 1].replace("\n", "") + "</li>") : b + ('<li class="wenkmLrc' + e + '">' + a[d + 1].replace("\n", "") + "</li>")
                }
                $("#wenkmLrc").html("<ul>" + b + "</ul>");
                setTimeout(function() {
                    $("#wenkmLrc").addClass("show")
                }, 500);
                lrcTime = setInterval(wenkmLrc.lrc.play, 500)
            },
            play: function() {
                var a = Math.round(audio.currentTime);
                0 < $.inArray(a, lrcTimeLine) ? (a = $(".wenkmLrc" + a), a.hasClass(cur) || (a.addClass(cur).siblings().removeClass(cur), $("#wenkmLrc").animate({
                    scrollTop: lrcHeight * a.index()
                }))) : Cont = ""
            },
            hide: function() {
                clearInterval(lrcTime);
                $("#wenkmLrc").removeClass("show")
            }
        }
    }
    // }
function LimitStr(a, c, b) {
    c = c || 6;
    b = b || "...";
    for (var d = "", e = a.length, f = 0, g = 0; f < 2 * c && g < e; g++) f += 128 < a.charCodeAt(g) ? 2 : 1, d += a.charAt(g);
    g < e && (d += b);
    return d
}

function loadblur(a) {
    var c = "",
        b = $(".blur"),
        d = new Image;
    d.onload = function() {
        if (a == c) {
            var d = b.clone();
            b.parent().append(d.css({
                display: "none",
                top: -b.height() - 3 + "px"
            }).attr("src", a));
            d.fadeIn(1E3, function() {
                d.css("top", "0px");
                b.remove();
                b = d
            })
        }
    };
    c = d.src = a
}

function allmusic() {
    $("li", $albumList).eq(albumId).addClass(cur).find(".artist").html("不想炸毛的猫").parent().siblings().removeClass(cur).find(".artist").html("").parent();
    "" == !$("ul", $songList).html() && $("[data-album=" + albumId + "]").length && ($("[data-album=" + albumId + "]").find("li").eq(songId).addClass(cur).siblings().removeClass(cur), $songList.mCustomScrollbar("scrollTo", $("li.current", $songList).position().top - 120))
}

function playercolor() {
    $player.css({
        background: "rgba(" + cont + ",.8)"
    });
    $play.css({
        background: "rgba(" + cont + ",.8)"
    });
    $lrc.css({
        background: "rgba(" + cont + ",.8)"
    });
    $tips.css({
        background: "rgba(" + cont + ",.8)"
    })
}

function music(a, c) {
    $("#wenkmLrc").show();
    albumId = a - 1;
    $player.removeClass("showSongList");
    $(".myhk_pjax_loading_frame,.myhk_pjax_loading").show();
    $.ajax({
        url: fileurl,
        type: "GET",
        dataType: "script",
        success: function() {
            $(".switch-default").hide();
            hasdefault = !1;
            wenkmPlayer.newplayList.creat.album();
            wenkmMedia.getInfos(c - 1);
            $(".play", $player).click()
        },
        error: function(a, c, e) {
            wenkmTips.show("不想炸毛的猫");
            $(".switch-default").show()
        }
    })
}
$(window.document).ready(function() {
    $(window).keydown(function(a) {
        192 == a.keyCode && (auto = "", audio.paused ? $(".play", $player).click() : $(".pause", $player).click())
    })
});
$(window).scroll(function() {
    var a = $(this).scrollTop(),
        c = $(window.document).height(),
        b = $(this).height();
    a + b == c ? hasgeci && ycgeci && ($player.addClass("ksclrc"), $("#wenkmLrc").addClass("hide"), $songFrom3.html('<i class="fa fa-times-circle"></i>'), $songFrom4.html('<i class="fa fa-toggle-off" title="不想炸毛的猫"></i>'), hasLrc && wenkmTips.show("不想炸毛的猫")) : hasgeci && ycgeci && ($player.removeClass("ksclrc"), $("#wenkmLrc").removeClass("hide"), hasLrc && $songFrom3.html('<i class="fa fa-check-circle"></i>'), $songFrom4.html('<i class="fa fa-toggle-on" title="不想炸毛的猫"></i>'))
});
