
/*!--------------------------------*\
   3-Jekyll Theme
   @author Peiwen Lu (P233)
   https://github.com/P233/3-Jekyll
\*---------------------------------*/

// Detect window size, if less than 1280px add class 'mobile' to sidebar therefore it will be auto hide when trigger the pjax request in small screen devices.
if ($(window).width() <= 1280) {
  $('#sidebar').addClass('mobile')
}

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        }
        ,BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        }
        ,iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }
        ,Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        }
        ,Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        }
        ,any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

// Variables
var sidebar    = $('#sidebar'),
    container  = $('#post'),
    content    = $('#pjax'),
    button     = $('#icon-arrow');

// Tags switcher
var clickHandler = function(id) {
  return function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.pl__all').hide();
    $('.' + id).delay(50).fadeIn(350);
  }
};

$('#tags__ul li').each(function(index){
  $('#' + $(this).attr('id')).on('click', clickHandler($(this).attr('id')));
});

// If sidebar has class 'mobile', hide it after clicking.
$('.pl__all').on('click', function() {
  $(this).addClass('active').siblings().removeClass('active');
  if (sidebar.hasClass('mobile')) {
    $('#sidebar, #pjax, #icon-arrow').addClass('fullscreen');
  }
});

// Enable fullscreen.
$('#js-fullscreen').on('click', function() {
  if (button.hasClass('fullscreen')) {
    sidebar.removeClass('fullscreen');
    button.removeClass('fullscreen');
    
    content.delay(300).queue(function(){
      $(this).removeClass('fullscreen').dequeue();
      $('#postcontainer').removeClass('postcontainer-full');
    });
    
    $('#post__toc').css({
                                position:'static'
                                ,top:0
                                ,left:0
                                ,display: 'none'
                            });
                            
    
  } else {
    sidebar.addClass('fullscreen');
    button.addClass('fullscreen');
    $('#postcontainer').addClass('postcontainer-full');
    content.delay(200).queue(function(){
      $(this).addClass('fullscreen').dequeue();
    });
    content.delay(300).queue(function(){
               $('#post__toc').css({
                                position:'fixed'
                                ,top:'20px'
                                ,left:$('#pjax').width()+$('#pjax').offset().left+30
                      });
                      $('#post__toc').show();
                      $(this).dequeue();
  
    });


  }
});



$('#mobile-avatar').on('click', function(){
  $('#sidebar, #pjax, #icon-arrow').addClass('fullscreen');
});

// Pjax
$(document).pjax('#avatar, #mobile-avatar, .pl__all', '#pjax', { fragment: '#pjax', timeout: 10000 });
$(document).on({
  'pjax:click': function() {
    content.removeClass('fadeIn').addClass('fadeOut');
    NProgress.start();
  },
  'pjax:start': function() {
    content.css({'opacity':0});
  },
  'pjax:end': function() {
    NProgress.done();
    container.scrollTop(0);
    content.css({'opacity':1}).removeClass('fadeOut').addClass('fadeIn');
    afterPjax();
  }
});

// Re-run scripts for post content after pjax
function afterPjax() {
  // Open links in new tab
  $('#post__content a').attr('target','_blank');

  // Generate post TOC for h1 h2 and h3
  var toc = $('#post__toc-ul');
  // Empty TOC and generate an entry for h1
  toc.empty().append('<li class="post__toc-li post__toc-h1"><a href="#post__title" class="js-anchor-link">' + $('#post__title').text() + '</a></li>');

  // Generate entries for h2 and h3
  var indexNum=0;
  $('#post__content').children('h2,h3').each(function() {
    // Generate random ID for each heading
    $(this).attr('id', function() {
      var ID = "menuIndex"+(indexNum++);
      return ID;
    });

    if ($(this).prop("tagName") == 'H2') {
      toc.append('<li class="post__toc-li post__toc-h2"><a href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
    } else {
      toc.append('<li class="post__toc-li post__toc-h3"><a href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
    }
  });



               
                $(window).resize(function(){
                    var menuIndexTop = $('#post__toc').offset().top;
                    var menuIndexLeft = $('#post__toc').offset().left;
                    //log($('#post__toc').offset().left);
                    //log();
                    $('#post__toc').css({
                                position:'fixed'
                                ,top:'20px'
                                ,left:$('#pjax').width()+$('#pjax').offset().left+30
                      });
                    
                    $(window).trigger('scroll');
                    $('#post__toc').css('max-height',$(window).height()-80);
                });
                
                   $('#post__toc').css('max-height',$(window).height()-80);

  // Lazy Loading Disqus
  // http://jsfiddle.net/dragoncrew/SHGwe/1/
  /*var ds_loaded = false,
  top = $('#disqus_thread').offset().top;
  window.disqus_shortname = $('#disqus_thread').attr('name');

  function check() {
    if ( !ds_loaded && container.scrollTop() + container.height() > top ) {
      $.ajax({
        type: 'GET',
        url: 'http://' + disqus_shortname + '.disqus.com/embed.js',
        dataType: 'script',
        cache: true
      });
      ds_loaded = true;
    }
  }check();
  container.scroll(check);*/

}afterPjax();
function log(logstr){
console.log(logstr);
}
(function(){
        //var ie6 = ($.browser.msie && $.browser.version=="6.0") ? true : false;

    })();