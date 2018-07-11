
$(document).ready(function($) {
	
	
	// user functionalities
	$("#useraddbtn").click(function(){
		
		$("#adduserModal").modal("show");
		
		
	});

	function isValidEmailAddress(emailAddress) {
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		return pattern.test(emailAddress);
	}
	
	$flag=1;
    	$("#name").focusout(function(){
    		if($(this).val()==''){
        		$(this).css("border-color", "#FF0000");
        			$('#submit').attr('disabled',true);
        			 $("#error_name").text("* You have to enter your name!");
        	}
        	else
        	{
        		$(this).css("border-color", "#2eb82e");
        		$('#submit').attr('disabled',false);
        		$("#error_name").text("");

        	}
       });
        $("#email").focusout(function(){
    		if($(this).val()==''){
					$(this).css("border-color", "#FF0000");
        			$('#submit').attr('disabled',true);
        			$("#error_email").text("* You have to enter your Email Id!");
        	}
        	else
        	{
				if(isValidEmailAddress($("#email").val()))
				{
					$(this).css("border-color", "#2eb82e");
					$('#submit').attr('disabled',false);
					$("#error_email").text("");
				} else {
					$(this).css("border-color", "#FF0000");
					$('#submit').attr('disabled',true);
        			$("#error_email").text("* Invalid Email Id!");
				}
				
        		
        	}
       });
      
       
      
        $("#phone").focusout(function(){
            $pho =$("#phone").val();
    		if($(this).val()==''){
        		$(this).css("border-color", "#FF0000");
        			$('#submit').attr('disabled',true);
        			$("#error_phone").text("* You have to enter your Phone Number!");
        	}
        	else if ($pho.length!=10)
        	{   
                    $(this).css("border-color", "#FF0000");
        			$('#submit').attr('disabled',true);
        			$("#error_phone").text("* Lenght of Phone Number Should Be Ten");
        	}
        	else if(!$.isNumeric($pho))
        	{
        	        $(this).css("border-color", "#FF0000");
        			$('#submit').attr('disabled',true);
        			$("#error_phone").text("* Phone Number Should Be Numeric");  
        	}
        	else{
        		$(this).css({"border-color":"#2eb82e"});
        		$('#submit').attr('disabled',false);
        		$("#error_phone").text("");
        	}

    	});
		
		
		  $("#password").focusout(function(){
			    pass =$("#password").val();
    		if($(this).val()==''){
        		$(this).css("border-color", "#FF0000");
        			$('#submit').attr('disabled',true);
        			$("#error_password").text("* You have to enter your Password!");
        	} else if ( pass.length<4 || pass.length >10)
        	{   
                    $(this).css("border-color", "#FF0000");
        			$('#submit').attr('disabled',true);
        			$("#error_password").text("* Lenght of Password should Be in between 4-10");
        	}
        	else
        	{
        		$(this).css({"border-color":"#2eb82e"});
        		$('#submit').attr('disabled',false);
        		$("#error_password").text("");

        	}
        	});

   		$( "#submit" ).click(function(e) {
   			if($("#name" ).val()=='')
   			{
        		$("#name").css("border-color", "#FF0000");
        			$('#submit').attr('disabled',true);
        			 $("#error_name").text("* You have to enter your Name!");
        	}
        	if($("#email" ).val()=='')
   			{
        		$("#email").css("border-color", "#FF0000");
        			$('#submit').attr('disabled',true);
        			 $("#error_email").text("* You have to enter your Email Id!");
        	}
   			
        	if($("#phone" ).val()=='')
   			{
        		$("#phone").css("border-color", "#FF0000");
        			$('#submit').attr('disabled',true);
        			 $("#error_phone").text("* You have to enter your Phone Number!");
        	}
			
			if($("#password" ).val()=='')
   			{
        		$("#password").css("border-color", "#FF0000");
        			$('#submit').attr('disabled',true);
        			 $("#error_password").text("* You have to enter your Password!");
        	}
			
			//Next we are saving content by ajax
			var url = "http://www.userproject_localhost.com/save-user/"; 
			if (e.isDefaultPrevented()) return
			$.ajax({
			   type: "POST",
			   url: url,
			   data: $("#useraddfm").serialize(), // serializes the form's elements.
			   success: function(data)
			   {
				 //  alert(data); // show response from the php script.
				   console.log(data);
				   if(data=="success")
				   {
					   $("#adduserModal").modal("hide");
					   $("#msgpopupcontent").fadeIn(350);
					   $("#msgpopupinner").html('<h2><i class="fa fa-check" aria-hidden="true"></i> Your details saved successfully.</h2><a class="popup-close" id="closepopup" data-popup-close="popup-1" href="#">x</a>');
					 e.preventDefault();
				   }else if(data=="exist"){
					    $("#adduserModal").modal("hide");
						$("#msgpopupcontent").fadeIn(350);
						$("#msgpopupinner").html('<h2><i class="fa fa-check" aria-hidden="true"></i>Username is already exist.</h2><a class="popup-close" id="closepopup1" data-popup-close="popup-1" href="#">x</a>');
						e.preventDefault();
					   
				   }else {
					    $("#adduserModal").modal("hide");
					    $("#msgpopupcontent").fadeIn(350);
					    $("#msgpopupinner").html('<h2><i class="fa fa-check" aria-hidden="true"></i>Error is occured while saving data.</h2><a class="popup-close" id="closepopup1" data-popup-close="popup-1" href="#">x</a>');
					
				   }
				   
			   }
			 });
			 e.preventDefault(); 
			return false;
			
			
			});
			
			
			
			$(document.body).on('click', '#closepopup' ,function(e){
				$("#msgpopupcontent").fadeOut(350);
				location.reload();
			});
			$(document.body).on('click', '#closepopup1' ,function(e){
				$("#msgpopupcontent").fadeOut(350);
				//location.reload();
			});

			
			
			//Edit User Functionality
			$(".edit-user").click(function(){
				console.log("hai..");
				emailId=$(this).attr("id");
				var url = "http://www.userproject_localhost.com/get-user/"; 
				$.ajax({
					   type: "POST",
					   url: url,
					   data:{emailId:emailId},  
					  dataType: 'json',
					   success: function(data)
					   {
						
						   if(data.emailId!="")
							{
								$("#editname").val(''+data.name);
								$("#editemail").val(''+data.email);
								
								$("#editphone").val(data.phone);
								$("#editpassword").val(data.password);
								
							}
							$("#edituserModal").modal("show");
						  
					   }
					 });
				
				
				
			});
			
			
			
			
			
		$("#editname").focusout(function(){
    		if($(this).val()==''){
        		$(this).css("border-color", "#FF0000");
				
				
				
        			$('#updateuserbtn').attr('disabled',true);
        			 $("#edit_error_name").text("* You have to enter your name!");
        	}
        	else
        	{
        		$(this).css("border-color", "#2eb82e");
        		$('#updateuserbtn').attr('disabled',true);
        		$("#edit_error_name").text("");

        	}
       });
        $("#edit_email").focusout(function(){
    		if($(this).val()==''){
					$(this).css("border-color", "#FF0000");
        			$('#updateuserbtn').attr('disabled',true);
        			$("#edit_error_email").text("* You have to enter your Email Id!");
        	}
        	else
        	{
				if(isValidEmailAddress($("#edit_email").val()))
				{
					$(this).css("border-color", "#2eb82e");
					$('#updateuserbtn').attr('disabled',true);
					$("#edit_error_email").text("");
				} else {
					$(this).css("border-color", "#FF0000");
					$('#updateuserbtn').attr('disabled',true);
        			$("#edit_error_email").text("* Invalid Email Id!");
				}
				
        		
        	}
       });
      
       
      
        $("#editphone").focusout(function(){
            $pho =$("#editphone").val();
    		if($(this).val()==''){
        		$(this).css("border-color", "#FF0000");
        			$('#updateuserbtn').attr('disabled',true);
        			$("#edit_error_phone").text("* You have to enter your Phone Number!");
        	}
        	else if ($pho.length!=10)
        	{   
                    $(this).css("border-color", "#FF0000");
					$('#updateuserbtn').attr('disabled',true);
        			$("#edit_error_phone").text("* Lenght of Phone Number Should Be Ten");
        	}
        	else if(!$.isNumeric($pho))
        	{
        	        $(this).css("border-color", "#FF0000");
        			$('#updateuserbtn').attr('disabled',true);
        			$("#edit_error_phone").text("* Phone Number Should Be Numeric");  
        	}
        	else{
        		$(this).css({"border-color":"#2eb82e"});
        		$('#updateuserbtn').attr('disabled',true);
        		$("#edit_error_phone").text("");
        	}

    	});
		
		
		  $("#editpassword").focusout(function(){
			    pass =$("#editpassword").val();
    		if($(this).val()==''){
        		$(this).css("border-color", "#FF0000");
        			$('#updateuserbtn').attr('disabled',true);
        			$("#edit_error_password").text("* You have to enter your Password!");
        	} else if ( pass.length<4 || pass.length >10)
        	{   
                    $(this).css("border-color", "#FF0000");
        			$('#updateuserbtn').attr('disabled',true);
        			$("#edit_error_password").text("* Lenght of Password should Be in between 4-10");
        	}
        	else
        	{
        		$(this).css({"border-color":"#2eb82e"});
        		$('#updateuserbtn').attr('disabled',false);
        		$("#edit_error_password").text("");

        	}
        	});
	
			
			
		// submit edit user form

   		$( "#updateuserbtn" ).click(function(e) {
   			if($("#editname" ).val()=='')
   			{
        		$("#editname").css("border-color", "#FF0000");
        			$('#updateuserbtn').attr('disabled',true);
        			 $("#edit_error_name").text("* You have to enter your Name!");
        	}
        	if($("#editemail" ).val()=='')
   			{
        		$("#editemail").css("border-color", "#FF0000");
        			$('#updateuserbtn').attr('disabled',true);
        			 $("#edit_error_email").text("* You have to enter your Email Id!");
        	}
   			
        	if($("#editphone" ).val()=='')
   			{
        		$("#editphone").css("border-color", "#FF0000");
        			$('#updateuserbtn').attr('disabled',true);
        			 $("#edit_error_phone").text("* You have to enter your Phone Number!");
        	}
			
			if($("#editpassword" ).val()=='')
   			{
        		$("#editpassword").css("border-color", "#FF0000");
        			$('#updateuserbtn').attr('disabled',true);
        			 $("#edit_error_password").text("* You have to enter your Password!");
        	}
			
			//Next we are saving content by ajax
			var url = "http://www.userproject_localhost.com/edit-user/"; 
			if (e.isDefaultPrevented()) return
			$.ajax({
			   type: "POST",
			   url: url,
			   data: $("#edituserfm").serialize(), // serializes the form's elements.
			   success: function(data)
			   {
				 //  alert(data); // show response from the php script.
				   console.log(data);
				   if(data=="success")
				   {
					   $("#edituserModal").modal("hide");
					   $("#msgpopupcontent").fadeIn(350);
					   $("#msgpopupinner").html('<h2><i class="fa fa-check" aria-hidden="true"></i> Your details updated successfully.</h2><a class="popup-close" id="closepopup" data-popup-close="popup-1" href="#">x</a>');
					 e.preventDefault();
				   
				   }else {
					    $("#edituserModal").modal("hide");
					    $("#msgpopupcontent").fadeIn(350);
					    $("#msgpopupinner").html('<h2><i class="fa fa-check" aria-hidden="true"></i>Error is occured while saving data.</h2><a class="popup-close" id="closepopup1" data-popup-close="popup-1" href="#">x</a>');
					
				   }
				   
			   }
			 });
			 e.preventDefault(); 
			return false;
			
			
			});		
			
			
			//Deletet User Functionality
			$(".delete-user").click(function(){
				console.log("hai..");
				emailId=$(this).attr("id");
				var url = "http://www.userproject_localhost.com/delete-user/"; 
				$.ajax({
					   type: "POST",
					   url: url,
					   data:{emailId:emailId},  
					 // dataType: 'json',
					   success: function(data)
					   {
						
						 
							 if(data=="success")
							  {
								 
								   $("#msgpopupcontent").fadeIn(350);
								   $("#msgpopupinner").html('<h2><i class="fa fa-check" aria-hidden="true"></i> Your details deleted successfully.</h2><a class="popup-close" id="closepopup" data-popup-close="popup-1" href="#">x</a>');
								 e.preventDefault();
							  
							  }else {
									
									$("#msgpopupcontent").fadeIn(350);
									$("#msgpopupinner").html('<h2><i class="fa fa-check" aria-hidden="true"></i>Error is occured while saving data.</h2><a class="popup-close" id="closepopup1" data-popup-close="popup-1" href="#">x</a>');
								
							  }
						  
					   }
					 });
				
				
				
			});
			
			
	
	$("#schoolfm").submit(function(e) {
			//e.preventDefault();
			e.stopImmediatePropagation();
			
			
			//validation
		if (!$("input[name='optschooltype']:checked").val()) {
			$("#messages").html('<span>Please choose School Type</span>');
			$("#messages").show();
			return false;
		}else{
			$("#messages").html('');
			$("#messages").hide();

		}		
			
			
			
		if (!$("input[name='optsex']:checked").val()) {
			$("#messages").html('<span>Please choose sex</span>');
			$("#messages").show();
			return false;
		}else{
			$("#messages").html('');
			$("#messages").hide();

		}		
		
			
		
		var checkValues = $('input[id=level]:checked').map(function()
            {
                return $(this).val();
            }).get();
		if(checkValues.length<=0)
		{
			$("#messages").html('<span>Please choose a level</span>');
			$("#messages").show();
			return false;
		}else{
			
			$("#messages").html('');
			$("#messages").hide();
		}
		var num = $("#phone").val();
		var n = num.toString();
		
		var firsttwodigit=n.substring(0, 2);
		
		
		
		//alert(firsttwodigit);
		if(firsttwodigit!="05")
		{
			
			$("#messages").html('<span>Phone number is not correct</span>');
			$("#messages").show();
			return false;
		}else{
			
			$("#messages").html('');
			$("#messages").hide();
		}
		
		
		passwd=$("#password").val();
		if(passwd.length<6 || passwd.length>15){
			
			$("#messages").html('<span>Password should be greater than 6 & less than 15.</span>');
			$("#messages").show();
			return false;
			
		}else{
			$("#messages").html('');
			$("#messages").hide();
			
			
		}
		if($("#password").val()!=$("#confirmpassword").val())
		{
			
			$("#messages").html('<span>Password is not matching</span>');
			$("#messages").show();
			return false;
		}else{
			
			$("#messages").html('');
			$("#messages").hide();
		}
		
		
		
		var url = "https://www.nenewe.com/admin/saveschools/"; 
		  if (e.isDefaultPrevented()) return
		$.ajax({
			   type: "POST",
			   url: url,
			   data: $("#schoolfm").serialize(), // serializes the form's elements.
			   success: function(data)
			   {
				   alert(data); // show response from the php script.
				   console.log(data);
				   if(data=="success")
				   {
				     $("#msgpopupcontent").fadeIn(350);
					 $("#msgpopupinner").html('<h2><i class="fa fa-check" aria-hidden="true"></i> Your details saved successfully.</h2><a class="popup-close" id="closepopup" data-popup-close="popup-1" href="#">x</a>');
					 e.preventDefault();
				   }else if(data=="exist"){
					   $("#msgpopupcontent").fadeIn(350);
					 $("#msgpopupinner").html('<h2><i class="fa fa-check" aria-hidden="true"></i>Username is already exist.</h2><a class="popup-close" id="closepopup" data-popup-close="popup-1" href="#">x</a>');
					 e.preventDefault();
					   
				   }else {
					   
					  $("#msgpopupcontent").fadeIn(350);
					 $("#msgpopupinner").html('<h2><i class="fa fa-check" aria-hidden="true"></i>Error is occured while saving data.</h2><a class="popup-close" id="closepopup" data-popup-close="popup-1" href="#">x</a>');
					
				   }
				   
			   }
			 });
			 e.preventDefault(); 
			return false;
	});
	
	
	
	
});