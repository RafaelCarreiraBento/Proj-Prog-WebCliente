var moeda ="usd";
var simbolo="$";
var ordem = "market_cap_desc";
var contador=0;

if (contador==0){
	var cloneMedia = $('.media').clone();
	contador++;
}

			//FAZ O PEDIDO À API
function pedidoAPI (){			
	$.ajax({
		method: "GET",
		url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency="+moeda+"&order="+ordem+"&per_page=100&page=1&sparkline=false",
		dataType: 'json',

		success: function(dados) {
			listagem(dados);
		}
	})
}
			//FAZ A LISTA DAS COINS
function listagem(dados){		
	$('.media-list').html('');
	var liMedia = '';
	dados.forEach(function(result){
		var liMedia = cloneMedia.clone();		

	 	$('#detail', liMedia).attr('href', 'detalhes.html?id='+result.id); // link quando se clica na imagem
	 	$('#addFav', liMedia).attr('href', 'adicionarfav.html?id='+result.id)
	 	//			DADOS
		$('#image', liMedia).attr("src", result.image);
		$('.title', liMedia).text(result.name + ' - ' + result.symbol);
		$('.patual', liMedia).text('Preço Atual: '+result.current_price+simbolo);
		$('.marketcap', liMedia).text('Market Cap: '+result.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+simbolo); // separa o número por virgulas
		if (result.market_cap_rank != null){
			$('.rank', liMedia).text('#'+result.market_cap_rank);
		} 
		else $('.rank', liMedia).text('#0');			
		$('.media-list').append(liMedia);
	})
}	

		// FILTRA AS COINS DA LISTA
function barraPesquisa() {
    var input = document.getElementById('myInput').value;
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
		// ALTERNAR ENTRE TOP 10 E TOP 100
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
		// ALTERNAR ENTRE EUR E DOLAR
function eur(){
	var j;
	moeda="eur";
	simbolo="€";
	pedidoAPI();
}

function usd(){
	moeda="usd";
	simbolo="$";
	pedidoAPI();
}

function ordemvolume(){
	ordem="volume_desc";
	pedidoAPI();
}

function ordemMarketCap(){
	ordem="market_cap_desc";
	pedidoAPI();
}

