var moeda ="usd";
var simbolo ="$";

function pedidoAPI(){
	var path = window.location.href;				// vai buscar o url
	var coin= path. split("/").pop();				// retira os caminhos anteriores à pagina
	coin = coin.replace('detalhes.html?id=','');	// obtém o id
	console.log(coin);
	$.ajax({
		method: "GET",
		url: "https://api.coingecko.com/api/v3/coins/"+coin,
		dataType: 'json',

		success: function(dados) {
			console.log(dados);
			detalhes(dados);
		}
	})
}

function detalhes(dados){	
	$('#site').attr('href', dados.links.homepage[0]);
	$("#imagem").attr("src",dados.image.large);
	$("#namerank").text(dados.name+'  #'+dados.market_cap_rank);
	$("#symbol").text(dados.symbol);
	$("#low24").text(dados.market_data.low_24h[moeda]+simbolo);
	$("#high24").text(dados.market_data.high_24h[moeda]+simbolo);
	$("#ath").text(dados.market_data.ath[moeda]+simbolo);
	$("#atl").text(dados.market_data.atl[moeda]+simbolo);
	$("#ath_date").text(dados.market_data.ath_date.eur);
	$("#atl_date").text(dados.market_data.atl_date.eur);
	$("#total_volume").text(dados.market_data.total_volume[moeda]+simbolo);
	$("#price_change_24h_in_currency").text(dados.market_data.price_change_24h_in_currency[moeda]+simbolo);
	$("#market_cap").text(dados.market_data.market_cap[moeda].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+simbolo);
	$("#current_price").text(dados.market_data.current_price[moeda]+simbolo);

}

function eur(){
	moeda = "eur";
	simbolo = "€";
	pedidoAPI();
}

function usd(){
	moeda = "usd";
	simbolo= "$";
	pedidoAPI();
}