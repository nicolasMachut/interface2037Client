function demanderQuestion()
{
	$("#retourReponse").empty();
	$("#retourReponse").removeClass();
	$("#reponseText").val("");
	var nomExpert = $("#expertName").val();
	if(nomExpert==""){
		$("#reponse").empty();
		message = "Renseignez votre nom d'expert";
		$("#reponse").addClass("alert alert-danger col-sm-10");
		$("#reponse").append("<p>"+message+"</p>");
		return;
	}
	
	
	$("#reponse").removeClass();
	$("#reponse").empty();

	var req = $.ajax({
		url : "http://192.168.43.129:8282/interface2037/expert/question/"+nomExpert,
		dataType : "text",
		type : "GET"
	});
	
	var message;

	req.success(function(req, status, xhr) {
		if (xhr.status == 202) {
			var question = JSON.parse(xhr.responseText) 
			message = "Voici la question : ";
			$("#reponse").addClass("alert alert-info col-sm-10");
			$("#reponse").empty();
			$("#reponse").append("<p>"+message+"</p>");
			
			message = "";
			$("#reponse").append("<p>"+question.question+"</p>");
			$("#idQuestion").val(question.id);
		}
		
		if (xhr.status == 204) {
			message = "Pas de question en attente.";
			$("#reponse").addClass("alert alert-danger col-sm-10");
			$("#reponse").empty();
			$("#reponse").append("<p>"+message+"</p>");
			
		}
	});

	req.error(function( req, status, xhr ) {
			message = "une erreur est survenue.";
			$("#reponse").addClass("alert alert-danger col-sm-10");
			$("#reponse").empty();
			$("#reponse").append("<p>"+message+"</p>");
	});

}

function EnvoyerReponse()
{
	var idQuestion = $("#idQuestion").val();
	var reponse = $("#reponseText").val();
	var nameOfExpert = $("#expertName").val();
	if (idQuestion == "" || reponse == "") {
		$("#retourReponse").empty();
		message = "Demandez une question";
		$("#retourReponse").addClass("alert alert-danger col-sm-10");
		$("#retourReponse").append("<p>"+message+"</p>");
		return;
	}
	var data ={};
	data["idExpert"]= nameOfExpert;
	data["idQuestion"]= idQuestion;
	data["reponseText"]=reponse;
	var req = $.ajax({
		url : "http://192.168.43.129:8282/interface2037/expert/question",
		type : "PUT",
		data : data,
		crossOrigin : false,
		timeout : 10000
	});

	req.success(function(req, status, xhr) {
		
		if (xhr.status == 200) {
			message = "Votre reponse a bien été enregistrée, vous pouvez demander d'autres questions.";
			$("#retourReponse").addClass("alert alert-success col-sm-10");
			$("#retourReponse").empty();
			$("#retourReponse").append("<p>"+message+"</p>");
			$("#idQuestion").empty();
			$("#reponseText").empty();
		}
		
	});

	req.error(function( req, status, err ) {
		if (req.status == 403) {
			message = "Vous n'avez pas le droit de répondre à cette question, soit vous y avez déjà répondu, soit un autre systeme expert est en train de la traiter.";
		}else{
			message = "Une erreur est survenue";
		}
		$("#retourReponse").addClass("alert alert-danger col-sm-10");
		$("#retourReponse").empty();
		$("#retourReponse").append("<p>"+message+"</p>");
		$("#idQuestion").empty();
		$("#reponseText").empty();
	});

}

function signifierReponseImpossible()
{
	var idQuestion = $("#idQuestion").val();
	var reponse = $("#reponseText").val();
	var nameOfExpert = $("#expertName").val();

	if (idQuestion == "") {
		$("#retourReponse").empty();
		message = "Demandez une question";
		$("#retourReponse").addClass("alert alert-danger col-sm-10");
		$("#retourReponse").append("<p>"+message+"</p>");
		return;
	}
	
	var data={};
	data["idQuestion"]=idQuestion;
	data["idExpert"]=nameOfExpert;
	var req = $.ajax({
		url : "http://192.168.43.129:8282/interface2037/expert/question/impossible",
		dataType : "text",
		type : "PUT",
		data:data,
		crossOrigin : false,
		timeout : 10000
	});

	req.success(function(req, status, xhr) {
		
		if (xhr.status == 200) {
			message = "Vous avez signalé cette question comme sans réponse possible";
			$("#retourReponse").addClass("alert alert-success col-sm-10");
			$("#retourReponse").empty();
			$("#retourReponse").append("<p>"+message+"</p>");
			$("#idQuestion").empty();
			$("#reponseText").empty();
		}
		
	});

	req.error(function( req, status, err ) {
		if (req.status == 403) {
			message = "Vous n'avez pas le droit de répondere à cette question";
		}else{
			message = "Une erreur est survenue";
		}
		$("#retourReponse").addClass("alert alert-danger col-sm-10");
		$("#retourReponse").empty();
		$("#retourReponse").append("<p>"+message+"</p>");
		$("#idQuestion").empty();
		$("#reponseText").empty();
	});

}