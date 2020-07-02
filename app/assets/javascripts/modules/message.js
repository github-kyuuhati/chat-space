$(function(){
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


  $('.Main__formcontents').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

   .done(function(data){
     let html = buildHTML(data);
     $('.Main__chat_space').append(html);
     $('.Main__chat_space').animate({ scrollTop: $('.Main__chat_space')[0].scrollHeight});
     $('form')[0].reset();
  })
  .fail(function(){
    alert('メッセージ送信に失敗しました');
  })
  
});



  //送信ボタンを二回以上押せるようにする。
  $('.Main__formcontents').click(function() {
    $('input').prop('disabled', false);
  })
});
