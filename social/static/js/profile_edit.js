$('#editprofile-apply').click(function(e){
			e.preventDefault()
			var this_ = $(this)

			var first_name = $('#first_name-fld').val()
			var last_name = $('#last_name-fld').val()
			var birth_date = $('#date-fld').val()

			var close_wall = $('#close_wall').attr("checked") == 'checked' ? "1" : "0"
			var target_url = 'user_update'

			$.ajax({
				url: target_url,
				method: 'GET',
				data: {
					'first_name': first_name,
					'last_name': last_name,
					'birth_date': birth_date,
					'close_wall': close_wall
				},
				success: function(data){
					console.log(data)
					console.log(target_url)
					if(data.success){
						//document.location.reload()
					}
				},
				error: function(error){
					console.log(error)
					console.log("error")
				}
			})
		})