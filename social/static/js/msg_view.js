 function scroll_down(){
        content_position = jQuery(window).scrollTop();
        $('body,html').animate({scrollTop:$('body').height()},100);
    }

    scroll_down()

    var read = '/api/read/' + $("#message_form").attr("data-chat")

    $.ajax({
        url: read,
        method: 'GET',
        data: {},
        success: function(data){
            console.log(data)

        },
        error: function(error){
            console.log(error)
            console.log("error")
        }
    })

    //$("#center-fixed-container").remove()

    chat_id = $('#message_form').attr('data-chat')

    user = $('#userinfo')

    user_ava = user.attr('data-avatar')
    user_name_surname = user.attr('data-name')
    user_id = user.attr('data-id')

    $("#id_message_send").click(function(e){
        e.preventDefault()
        txt = $("#id_message").val()
        $("#id_message").val("")
        url = "/api/send_message";

        $.ajax({
            url: url,
            method: 'GET',
            data: {'chat_id': chat_id,'text': txt},
            success: function(data){
                console.log(data);
                if(data.success){
                    $("#messages").append("<div class=\"row mt-2 w-100\" id=\"msg" + data.msg_id + "\"><div class=\"col-2 col-sm-1\"><img src=" + user_ava + " class=\"rounded-circle d-inline\" alt=\"...\" style=\"width: 40px; height: 40px\"></div><div class=\"col-10 col-sm-11\"><a class=\"btn text-secondary\" style=\"padding: 0\" href=\"/id" + user_id + "\">" + user_name_surname +  "</a><span class=\"float-right text-muted\">(" + data.curr_time + ")</span><div class=\"mt-1 text-white\">" + txt + "</div></div></div><div class=\"d-block dropdown-divider\"></div>");
                }
                scroll_down();
            },
            error: function(error){
                console.log(error);
                console.log("error");
            }
        })
    })

    $(".delmsg-btn").click(function(e){
        e.preventDefault()
        this_ = $(this)
        msgid = this_.attr("data-msgid")
        url = "/api/remove_message/" + msgid
        divid = '#msg'+msgid

        $.ajax({
            url: url,
            method: 'GET',
            data: {},
            success: function(data){
                console.log(data)
                if(data.removed){
                    $(divid).remove()
                }
            },
            error: function(error){
                console.log(error)
                console.log("error")
            }
        })
    })

    setInterval(function(){
        $.ajax({
            url: '/api/get_last_unreaded_message',
            method: 'GET',
            data: {'chat_id': chat_id},
            success: function(data){
                console.log(data);
                if(data.success){
                    $.ajax({
                        url: read,
                        method: 'GET',
                        data: {},
                        success: function(data){
                            console.log(data)

                        },
                        error: function(error){
                            console.log(error)
                            console.log("error")
                        }
                    })
                    $("#messages").append("<div class=\"row mt-2 w-100\" id=\"msg" + data.msg_id + "\"><div class=\"col-2 col-sm-1\"><img src=\"" + data.user_avatar + "\" class=\"rounded-circle d-inline\" alt=\"...\" style=\"width: 40px; height: 40px\"></div><div class=\"col-10 col-sm-11\"><a class=\"btn text-secondary\" style=\"padding: 0\" href=\"/id" + data.user_id + "\">" + data.user_firstname + " " + data.user_lastname + "</a><span class=\"float-right text-muted\">(" + data.curr_time + ")</span><div class=\"mt-1 text-white\">" + data.text + "</div></div></div><div class=\"d-block dropdown-divider\"></div>");
                }
            },
            error: function(error){
                console.log(error);
                console.log("error");
            }
        })
    }, 500)