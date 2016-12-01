var profileMasking = function() {
  var forumCheck = $('#pun-crumbs1').find('a:nth-of-type(2)').text(),
    profileMask = ['Hell\'s Kitchen', 'Flatiron District', 'Midtown', 'Greenwich Village', 'Lower East Side', 'Gramercy', 'Brighton Beach', 'Red Hook', 'Green-Wood Cemetery', 'Woodlawn Cemetery'],
    profileMaskFull = ['Hell\'s Kitchen', 'Midtown', 'Greenwich Village', 'Lower East Side', 'Gramercy', 'Green-Wood Cemetery'],
    uID = (4),
    viewtopic = /http\:\/\/(?:.*)viewtopic.php\?id\=((?:[^\&|\#| ])+).*/gi;

  if ($('#pun-viewtopic, #pun-edit, #pun-post').length > 0) {
    for (var maskIndex = 0, profileMaskLen = profileMask.length; profileMaskLen > maskIndex; ++maskIndex) {
      if (forumCheck === profileMask[maskIndex]) {
        $('td#button-addition').after('<td id="button-changeProfile" title="Смена имиджа для поста"><img src="/i/blank.gif"></td>');
        $('#form-buttons').after('<div class="container" id="changeProfile-area" style="width: 430px;"><div class="chIcon"> <span>Ссылка на аватар:</span> <span class="input"><input type="text" id="chIcon-text" placeholder="http://"></span> </div><div class="maskButtons"> <span class="chOkay"><a>ОК, готово!</a></span>&nbsp;&nbsp;&nbsp;<span><a onclick="$(\'#changeProfile-area\').find(\'input, textarea\').val(\'\');">Очистить всё</a></span>&nbsp;&nbsp;&nbsp;<span><a onclick="$(\'#changeProfile-area\').hide(); return false;">Закрыть окно</a></span> </div></div>');
        if (UserID === uID) {
          maskMenuFull();
        }
        if ($('#pun-viewtopic, #pun-edit').length > 0) {
          letsChangeIcon();
        }
        for (var maskFullIndex = 0, maskFullLen = profileMaskFull.length; maskFullLen > maskFullIndex; ++maskFullIndex) {
          if (forumCheck === profileMaskFull[maskFullIndex]) {
            letsChangeStuff();
            if (!($('#changeProfile-area').find('.maskWrapper').length)) {
              maskMenuFull();
            }
          }
          var topicType = location.href.toString().replace(/http\:\/\/(?:.*)\/(.*)/gi, '$1'),
            topicID,
            storedIcon = 'topic' + topicID + 'icon',
            storedNick = 'topic' + topicID + 'nick',
            storedChar = 'topic' + topicID + 'charinfo',
            storedStatus = 'topic' + topicID + 'status',
            storedSign = 'topic' + topicID + 'sign';
          if ($('#changeProfile-area').length > 0) {
            if ((/viewtopic|post.php?tid/gi).test(topicType)) {
              topicID = location.href.toString().replace(viewtopic, '$1');
              loadLocalStor(storedIcon, storedNick, storedChar, storedStatus, storedSign);
            } else if ((/edit/gi).test(topicType)) {
              topicID = $('#pun-crumbs1').find('a:nth-of-type(3)').attr('href').replace(viewtopic, '$1');
              loadLocalStor(storedIcon, storedNick, storedChar, storedStatus, storedSign);
            }
          }
        }
        $('.post-content').find('.changeMask').empty();
        break;
      }
    }
  }

  function loadLocalStor(icon, nick, chariform, status, sign) {
    $('#changeProfile-area').find('#chIcon-text').val(localStorage.getItem(icon));
    $('#changeProfile-area').find('#chNick-text').val(localStorage.getItem(nick));
    $('#changeProfile-area').find('#chCharinfo-text').val(localStorage.getItem(chariform));
    $('#changeProfile-area').find('#chStatus-text').val(localStorage.getItem(status));
    $('#changeProfile-area').find('#chSign-text').val(localStorage.getItem(sign));
  }

  function maskMenuFull() {
    var nickVal = '<div class="chNick"> <span>Никнейм:</span> <span class="input"><input type="text" id="chNick-text" placeholder="Name Surname" maxlength="25"></span></div>',
      charinfoBasic = '<strong>Шаблоны заполнения:</strong> <a onclick="\$(\'#chCharinfo-text\').val(\'[b]Имя Фамилия[/b]\\n## года/лет, занятость\');">простой</a> • <a onclick="\$(\'#chCharinfo-text\').val(\'[url=ссылкаНаИнфо]Имя Фамилия[/url]\\n## года/лет, занятость\');">со ссылкой на инфо</a><br>',
      charinfoRel = '<strong>Добавить отношения:</strong> <a onclick="\$(\'#chCharinfo-text\').val( \$(\'#chCharinfo-text\').val() + \'\\nВ отношениях с [b]Именем Фамилией[/b]\');">без ссылки</a> • <a onclick="\$(\'#chCharinfo-text\').val( \$(\'#chCharinfo-text\').val() + \'\\nВ отношениях с [url=ссылкаНаПару]Именем Фамилией[/url]\');">со ссылкой</a>',
      charinfoVal = '<div class="chCharinfo"> <span>Личное звание:</span><div class="resizable-textarea"><textarea id="chCharinfo-text" rows="3" class="processed"></textarea></div><i class="small-text">' + charinfoBasic + charinfoRel + '</i></div>',
      statusVal = '<div class="chStatus"> <span>Статус:</span> <span class="input"><input type="text" id="chStatus-text" placeholder="Текст статуса" maxlength="50"></span> </div>',
      signVal = '<div class="chSign"> <span>Подпись:<br><i class="small-text">(Работают все BB-коды, кроме кодов таблицы.)</i></span> <div class="resizable-textarea"><textarea id="chSign-text" rows="3" class="processed"></textarea></div></div>';
    $('#changeProfile-area').find('.chIcon').after('<div class="maskWrapper-button"><span>Добавить маску</span> </div><div class="maskWrapper" style="display: none;">' + nickVal + charinfoVal + statusVal + signVal + '</div>');
    $('#changeProfile-area').find('.chOkay').after('&nbsp;&nbsp;&nbsp;<span class="chBBcode"><a onclick="insert(\'[icon][/icon][nick][/nick][charinfo][/charinfo][status][/status][sign][/sign]\')">Вставить BB-код маски</a></span>');
    /* var charinfoBasicIn = function() {
      $('#chCharinfo-text').val('[b]Имя Фамилия[/b]\\n## года/лет, занятость');
    };
    var charinfoBasicLinkIn = function() {
      $('#chCharinfo-text').val('[b][url="ссылкаНаИнформациюОПерсонаже"]Имя Фамилия[/url][/b]\\n## года/лет, занятость');
    }; */
  }

  function letsChangeIcon() {
    $('.post-content').find('.changeMask').each(function() {
      var post = $(this).closest('.post'),
        postAuthor = post.find('.post-author'),
        fullMaskNick = /^Bartender$/g,
        postAuthorNick = postAuthor.find('.pa-author a').html();
      if (post.find('.changeMask.icon').length > 0) {
        if (postAuthor.find('.pa-avatar.item2').length > 0) {
          postAuthor.find('.pa-avatar.item2').html('<img title="changed icon"  class="changed icon" src="' + post.find('.changeMask.icon').text() + '">');
        } else {
          postAuthor.find('.pa-author').before('<li class="pa-avatar item2"><img title="changed icon" class="changed icon" src="' + post.find('.changeMask.icon').text() + '"></li>');
        }
      }
      if ((fullMaskNick).test(postAuthorNick)) {
        var $change = $(this);
        letsChangeEverything($change);
      }
    });
  }

  function letsChangeStuff() {
    $('.post-content').find('.changeMask').each(function(fullMaskNick) {
      var $change = $(this);
      letsChangeEverything($change);
    });
  }

  function letsChangeEverything($changer) {
    var post = $changer.closest('.post'),
      postAuthor = post.find('.post-author');
    if (post.find('.changeMask.sign').length > 0) {
      /* post.find('.changeMask.sign').find('img').each(function() {
          if ( (/изображение/gi).test( $('.post').find('.post-sig a').html() ) ) {
              $(this).closest('.changeMask.sign').html( $('img').closest('.changeMask.sign').html().replace(/<img (?:.*) src="(.*)" alt="\1">/gi, '<a href="$1" rel="nofollow"><изображение></a>'));
          }
      }); */
      if (post.find('.post-sig').length > 0) {
        post.find('.post-sig').find('dd').html( post.find('.changeMask.sign').html() );
      } else {
        post.find('.post-content').after('<dl class="post-sig"><dt></dt><dd>' + post.find('.changeMask.sign').html() + '</dd></dl>');
      }
      post.find('.changeMask.sign').find('img').attr('class', 'sigimage');
    }
    if (post.find('.changeMask.charinfo').length > 0) {
      if (postAuthor.find('.pa-fld1').length > 0) {
        postAuthor.find('.pa-fld1').html(post.find('.changeMask.charinfo').html());
      } else {
        postAuthor.find('.pa-title').before('<li class="pa-fld1">' + post.find('.changeMask.charinfo').html() + '</li>');
      }
    }
    if (post.find('.changeMask.status').length > 0) {
      postAuthor.find('.pa-title').html(post.find('.changeMask.status').html());
    }
    if (post.find('.changeMask.nick').length > 0) {
      postAuthor.find('.pa-author a').html(post.find('.changeMask.nick').html());
    }
  }

  $('td#button-changeProfile').click(function(event) {
    if (event.ctrlKey || event.altKey) {
      bbcode('[icon]', '[/icon]');
    } else {
      $('#changeProfile-area').toggle();
    }
  });

  $('#changeProfile-area').find('.maskWrapper-button span').click(function() {
    var $maskWrapper = $('#changeProfile-area').find('.maskWrapper');
    $maskWrapper.toggle();
    if ($maskWrapper.css('display') == 'block') {
      $(this).text('Закрыть поле редактирования маски');
    } else {
      $(this).text('Добавить маску');
    }
  });

  $('#changeProfile-area').find('.chOkay').click(function() {
    $('#changeProfile-area').find('input, textarea').each(function() {
      var classID = $(this).attr('id'),
        classCode = classID.toString().toLowerCase().replace(/^ch(.*)-text/g, '$1'),
        whatChanges = $(this).val(),
        viewtopic = /http\:\/\/(?:.*)viewtopic.php\?id\=((?:[^\&|\#| ])+).*/gi;

      var topicType = location.href.toString().replace(/http\:\/\/(?:.*)\/(.*)/gi, '$1'),
        topicID = location.href.toString().replace(viewtopic, '$1'),
        storeKey = 'topic' + topicID + classCode;

      if ((/viewtopic|post.php?tid/gi).test(topicType)) {
        localStorage.removeItem(storeKey);
      } else if ((/edit/gi).test(topicType)) {
        var storeEditKey = 'topic' + $('#pun-crumbs1').find('a:nth-of-type(3)').attr('href').replace(viewtopic, '$1') + classCode;
        localStorage.removeItem(storeEditKey);
      }

      if (whatChanges.length > 0) {
        if (classID == 'chIcon-text') {
          if (!(/\.(gif|jpg|jpeg|png|gif\?dl\=0|jpg\?dl\=0|jpeg\?dl\=0|png\?dl\=0|gif\?dl\=1|jpg\?dl\=1|jpeg\?dl\=1|png\?dl\=1)$/i).test(whatChanges)) {
            alert('Вы вставили ссылку не на картинку!');
          } else {
            insert('[' + classCode + ']' + whatChanges + '[/' + classCode + ']');
          }
        } else {
          insert('[' + classCode + ']' + whatChanges + '[/' + classCode + ']');
        }

        if ((/viewtopic|post.php?tid/gi).test(topicType)) {
          localStorage.setItem(storeKey, whatChanges);
        } else if ((/edit/gi).test(topicType)) {
          localStorage.setItem(storeEditKey, whatChanges);
        }

      }
      $('#changeProfile-area').toggle();
    });
  });

  $('#changeProfile-area').find('input, textarea').each(function() {
    $(this).parent().siblings('span').click(function(e) {
      var classCode = $(this).siblings().find('input, textarea').attr('id').toString().toLowerCase().replace(/^ch(.*)-text/g, '$1');
      if (e.ctrlKey || e.altKey) {
        bbcode('[' + classCode + ']', '[/' + classCode + ']');
      } else {
        return false;
      }
    });
  });

};