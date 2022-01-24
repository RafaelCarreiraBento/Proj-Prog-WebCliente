window.onload= function(){
	pedidoAPI();
}

var moeda ="usd";
var simbolo="$"

	//	url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false" PEDIDO EUR
	//	url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=100&page=1&sparkline=false"  PEDIDO VOLUME DESC
	//	url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=volume_desc&per_page=100&page=1&sparkline=false"  PEDIDO EUR VOLUME DESC

function pedidoAPI (){			//FAZ O PEDIDO À API	
	$.ajax({
		method: "GET",
		url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency="+moeda+"&order=market_cap_desc&per_page=100&page=1&sparkline=false",
		dataType: 'json',

		success: function(dados) {
			console.log(dados);
			listagem(dados);			
		}
	})
}

function listagem(dados){		//FAZ A LISTA DAS COINS
	var cloneMedia = $('.media').clone();
	$('.media-list').html('');
	var liMedia = '';
	//console.log(dados.id[1]);
	dados.forEach(function(result){
		var liMedia = cloneMedia.clone();			
	 	$('a', liMedia).attr('href', 'https://www.coingecko.com/en/coins/'+result.id); // link quando se clica na imagem
	 	//dados
		$('#image', liMedia).attr("src", result.image);
		$('.title', liMedia).text(result.name + ' - ' + result.symbol);
		$('.patual', liMedia).text('Preço Atual: '+result.current_price+simbolo);
		//$('.dp24h', liMedia).text('Diferença de preço nas 24h:  '+result.price_change_24h.toFixed(2)+simbolo);
		$('.marketcap', liMedia).text('Market Cap: '+result.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+simbolo); // separa o número por virgulas
		$('.rank', liMedia).text('#'+result.market_cap_rank);
		$('.media-list').append(liMedia);
	})
}	


function barraPesquisa() {
    var input = document.getElementById('myInput').value
    input=input.toLowerCase();
    var li = document.getElementsByClassName('title media-heading');
    var ul = document.getElementsByClassName('media');
    for (i = 0; i < li.length; i++) { 
        if (!li[i].innerHTML.toLowerCase().includes(input)) {
            ul[i].style.display="none";
        }
        else {
            ul[i].style.display="list-item";             
        }
    }
}

function top10(){
	var li = document.getElementsByClassName('title media-heading');
    var ul = document.getElementsByClassName('media');
    for (i = 10; i < 100; i++) { 
        ul[i].style.display="none";
    }
}

function top100(){
	var li = document.getElementsByClassName('title media-heading');
    var ul = document.getElementsByClassName('media');
    for (i = 0; i < 100; i++) { 
        ul[i].style.display="list-item";
    }
}

function eur(){
	var j;
	moeda="eur";
	simbolo="€";
	/*for(var i=0; li=lis[i]; i++) {
    	li.parentNode.removeChild(li);

	}*/
	$('.thumbnail').empty();
	$('.title').empty();
	$('.patual').empty();
	$('.marketcap').empty();
	$('.rank').empty();
	pedidoAPI();
}

function usd(){
	moeda="usd";
	simbolo="$";
	$('#media-list').empty();
	pedidoAPI();
}