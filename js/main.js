"use strict";

//ハンバーガーメニュー
$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});


$(function () {
    $(".slideShow")
      // 最初のスライドに"add-animation"のclassを付ける(data-slick-index="0"が最初のスライドを指す)
    .on("init", function () {
        $('.slick-slide[data-slick-index="0"]').addClass("add-animation");
        })
      // 通常のオプション
    .slick({
        autoplay: true, // 自動再生ON
        fade: true, // フェードON
        arrows: false, // 矢印OFF
        speed: 3000, // スライド、フェードアニメーションの速度1000ミリ秒
        autoplaySpeed: 4000, // 自動再生速度3000ミリ秒
        pauseOnFocus: false, // フォーカスで一時停止OFF
        pauseOnHover: false, // マウスホバーで一時停止OFF
    })
    .on({
        // スライドが移動する前に発生するイベント
        beforeChange: function (event, slick, currentSlide, nextSlide) {
          // 表示されているスライドに"add-animation"のclassをつける
        $(".slick-slide", this).eq(nextSlide).addClass("add-animation");
          // あとで"add-animation"のclassを消すための"remove-animation"classを付ける
        $(".slick-slide", this).eq(currentSlide).addClass("remove-animation");
        },
        // スライドが移動した後に発生するイベント
        afterChange: function () {
          // 表示していないスライドはアニメーションのclassを外す
        $(".remove-animation", this).removeClass(
            "remove-animation add-animation"
        );
        },
    });
});

//スムーススクロール
$('#js-nav a').on('click',function(){
  let hrefElement = $(this).attr('href');
  let headerHeight = $('#header').outerHeight(true);
  let position = $(hrefElement).offset().top - headerHeight;
  $('body,html').animate({
    scrollTop:position
  },500);
  return false;
});

//スクロールアニメーション
function fadeIn (){
  $('.fadeUpTrigger').each(function(){
    let scroll = $(window).scrollTop();
    let triTop = $(this).offset().top + 100;
    let winHeight = $(window).height();
    if (scroll >= triTop - winHeight){
      $(this).addClass('fadeUp');
    } else {
      $(this).removeClass('fadeUp');
    }
    
  });

  $('.fadeLeftTrigger').each(function(){
    let scroll = $(window).scrollTop();
    let triTop = $(this).offset().top + 100;
    let winHeight = $(window).height();
    if (scroll >= triTop - winHeight){
      $(this).addClass('fadeLeft');
    } else {
      $(this).removeClass('fadeLeft');
    }
    
  });

  $('.fadeRightTrigger').each(function(){
    let scroll = $(window).scrollTop();
    let triTop = $(this).offset().top + 100;
    let winHeight = $(window).height();
    if (scroll >= triTop - winHeight){
      $(this).addClass('fadeRight');
    } else {
      $(this).removeClass('fadeRight');
    }
    
  });
}
  $(window).scroll(function(){
    fadeIn();
  });

//順番に要素がスクロールアップされる
function delayScrollAnime(){
  let time = 0.2 ;
  let value = time ;
  $('.delayScroll').each(function(){
    let parent = this;
    let elemPos =$(this).offset().top;
    let scroll =$(window).scrollTop();
    let windowHight =$(window).height();
    let childs = $(this).children();

    if (scroll >= elemPos - windowHight && !$(parent).hasClass("play")){
      $(childs).each(function () {

      if (!$(this).hasClass("fadeUp")){
        $(parent).addClass("play");
        $(this).css("animation-delay",value + "s");
        $(this).addClass("fadeUp");
        value = value + time

        let index =$(childs).index(this);
        if ((childs.length-1) == index){
          $(parent).removeClass("play");
        }
      }
    })
  } else {
    $(childs).removeClass("fadeUp");
    value = time;
  }
  })
}

$(window).scroll(function(){
  delayScrollAnime();
});

//スクロール途中でヘッダーが表示非表示
let beforePos =0 ;
function ScrollAnime(){
  let elemTop = $('#about').offset().top;
  let scroll = $(window).scrollTop();

  if (scroll == beforePos){

  }else if(elemTop > scroll|| 0 > scroll - beforePos){
    $('#header').removeClass('UpMove');
    $('#header').addClass('DownMove');
  }else {
    $('#header').removeClass('DownMove');
    $('#header').addClass('UpMove');
  }
  beforePos = scroll;
}

$(window).scroll(function(){
  ScrollAnime();
});


//診察時間RECEPTION-TIME

function FixedAnime(){
  let wid = $(window).width();
  
  if (wid > 1024) {
    $(window).scroll(function(){
      if ($(window).scrollTop()> 450){
        $('#reception-time').addClass('fixed');
      }else {
        $('#reception-time').removeClass('fixed');
      }
    });
  }

  if (wid > 768) {
    $(window).scroll(function(){
      if ($(window).scrollTop()> 916){
        $('#reception-time').addClass('fixed');
      }else {
        $('#reception-time').removeClass('fixed');
      }
    });
  }
}

$(window).scroll(function(){
  FixedAnime();
});

