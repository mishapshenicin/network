$(document).ready(function(){
			function updateText(btn, count, text){
				$(btn).html(text + " " + count);			}

			$('.likepost-btn').click(function(e){
				e.preventDefault()
				var this_ = $(this)
				var likeUrl = this_.attr("data-like-href")
				var likesCount = parseInt(this_.attr("data-likes-count"))

				$.ajax({
					url: likeUrl,
					method: 'GET',
					data: {},
					success: function(data){
						console.log(data)

						if (data.liked){
							updateText(this_, data.likes, '<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>')
							$(this_).addClass('text-danger')
							$(this_).removeClass('text-white')
						}else{
							updateText(this_, data.likes, '<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>')
							$(this_).removeClass('text-danger')
							$(this_).addClass('text-white')
						}
					},
					error: function(error){
						console.log(error)
						console.log("error")
					}
				})
			})
			$('.delpost-btn').click(function(e){
				e.preventDefault()
				var this_ = $(this)
				var postID = this_.attr("data-postid")
				var delpostUrl = "post_" + postID + "/remove"
				var divClass = '.postcard' + postID

				if (confirm("Вы действительно хотите удалить эту запись?"))
				{
					$.ajax({
						url: delpostUrl,
						method: 'GET',
						data: {},
						success: function(data){
							console.log(data)
							$(divClass).remove()
						},
						error: function(error){
							console.log(error)
							console.log("error")
						}
					})
				}
			})
			$('.comment-btn').click(function(e){
				e.preventDefault()
				var this_ = $(this)
				var postID = this_.attr("data-postid")
				var c_text = $('#commlabel'+postID).val()
				var comm_url = "post_" + postID + "/comment"

				$.ajax({
					url: comm_url,
					method: 'GET',
					data: {
						'text': c_text
					},
					success: function(data){
						console.log(data)
						if(data.success){
							$('#commbase' + postID).prepend('<div class="d-flex" style="height: 40px"><img src="'+data.author_avatar+'" class="rounded-circle d-inline" alt="..." style="width: 40px; height: 40px"><div class="ml-2"><a class=""  href="/id' + data.author_id + '" style="font-size: 10pt;">' + data.author_name + '</a><h6 class="" style="font-size: 10pt;">' + data.pub_date + '</h6></div></div><span>' + c_text + '</span><br><br>')
						}
					},
					error: function(error){
						console.log(error)
						console.log("error")
					}
				})
			})
			$('#addpost-btn').click(function(e){
				e.preventDefault()
				var this_ = $(this)
				var addpostUrl = "/api/add_post"

				var recipient = $('#addpost-field').attr("data-pageid")

                console.log(recipient.toString())

				$.ajax({
					url: addpostUrl,
					method: 'GET',
					data: {
						'text': $('#addpost-field').val(),
						'recipient': recipient.toString()
					},
					success: function(data){
						console.log(data)
						document.location.reload()
					},
					error: function(error){
						console.log(error)
						console.log("error")
					}
				})
			})
			$('#updatestatus-btn').click(function(e){
				e.preventDefault()
				var this_ = $(this)
				var url = "/user_update_status"
				console.log('rul')

				$.ajax({
					url: url,
					method: 'GET',
					data: {
						'text': $('#status-field').val()
					},
					success: function(data){
						console.log(data)
						document.location.reload()
					},
					error: function(error){
						console.log(error)
						console.log("error")
					}
				})
			})
			$('.repost-btn').click(function(e){
				e.preventDefault()
				var this_ = $(this)
				var postID = this_.attr("data-postid")
				var user_id = this_.attr("data-user_id")
				var c_text = $('#attch_text'+postID).val()
				var rep_method = parseInt($('#rep_method'+postID).val())
				var req_url = "repost"

				var methods = ['user_wall', 'messgage']

				$.ajax({
					url: req_url,
					method: 'GET',
					data: {
					    'post_id': postID,
						'text': c_text,
						'recipient': methods[rep_method],
						'id': user_id
					},
					success: function(data){
						console.log(data)
						if(data.success){

						}
					},
					error: function(error){
						console.log(error)
						console.log("error")
					}
				})
			})
		})