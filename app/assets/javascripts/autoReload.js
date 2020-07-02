function buildHTML(message){
  if ( message.image ) {
    let html =
      `<div class="Main__messagebox" data-message-id=${message.id}>
        <div class="Main__messageinfo">
          <div class="Main__message_name">
            ${message.user_name}
          </div>
          <div class="Main__message_date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="Message__content">
            ${message.content}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>
      </div>`
    return html;
  } else {
    let html =
    `<div class="Main__messagebox" data-message-id=${message.id}>
      <div class="Main__messageinfo">
        <div class="Main__message_name">
          ${message.user_name}
        </div>
        <div class="Main__message_date">
          ${message.created_at}
        </div>
      </div>
      <div class="Message">
        <p class="Message__content">
          ${message.content}
        </p>
      </div>
    </div>`
    return html;
  };
}

let reloadMessages = function() {
    let last_message_id = $('.Main__messagebox:last').data("message-id");  
    
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.Main__chat_space').append(insertHTML);
        $('.Main__chat_space').animate({ scrollTop: $('.Main__chat_space')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);