$(document).ready(function(){

	var scroll = false;
	var i = 0;
	var estados = 3;

	$("#scrolling").click(function(){
		if (!scroll) {
			scroll = true;
			$(this).html("<span class=\"glyphicon glyphicon-circle-arrow-top\"></span> Scrolling Manual");
		} else {
			scroll = false;
			$(this).html("<span class=\"glyphicon glyphicon-circle-arrow-down\"></span> Scrolling Automático");
		}
	    
	});

	$("#more-news").click(function(){
		if (i === 0){
			cargarJSON(i+1);
			i++;
		} else if (i === 1){
			cargarJSON(i+1);
			i++;
			$("#more-news").hide();
		} 
	});

	$(window).scroll(function(){
		if (($(window).scrollBottom()===0) && (scroll)){
			if (i === 0){
				cargarJSON(i+1);
				i++;
			} else if (i === 1){
				cargarJSON(i+1);
				i++;
				$("#more-news").hide();
			}
		}
	});

	$.fn.scrollBottom = function() { 
		return $(document).height() - this.scrollTop() - this.height(); 
	};

	function cargarJSON(i){
		fichero = "data/" + i + ".json";
		$.getJSON(fichero, function(jsonObject) {
	        ponerNoticias(jsonObject);
	    });
	}

	function ponerNoticias(json){
     $.each( json, function(j, item) {

		var noticia_container = $('<div>');
		var img = $('<img>');
		var section = $('<section>');
		var h2  = $('<h2>');
		var datetime = $('<div>');
		var info = $('<div>');
		var p   = $('<p>');
		var imagen = $('<div>');

		var li = $('<li>');
     	var a = $('<a>');

		noticia_container.attr('id', item.id);
		section.attr('class', 'jumbotron');
		h2.text(item.titulo);
		datetime.attr('class', 'datetime');
		datetime.text(item.datetime);
		info.attr('class', 'informacion');
		p.text(item.desc);
		datetime.attr('class', 'datetime');
		datetime.html('<span class=\"glyphicon glyphicon-calendar\"></span>' + item.datetime);
		img.attr('class', 'img-responsive center-block');
		img.attr('src', item.imgmid);

		h2.appendTo(section);
		datetime.appendTo(section);
		info.appendTo(section);
		p.appendTo(info);
		img.appendTo(imagen);
		imagen.appendTo(section);
		section.appendTo(noticia_container);
     	noticia_container.appendTo('.main-container');

     	a.attr('href', '#'+item.id);
     	a.text(item.nav_element);
     	a.appendTo(li);
     	li.appendTo(".nav");

     	estados++;
     }); 
}

});