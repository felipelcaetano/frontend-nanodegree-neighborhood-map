## Projeto Mapa da Vizinhança

### Execução do Projeto
1. Para executar o projeto, primeiro baixe o código que está no repositório [frontend-nanodegree-neighborhood-map](https://github.com/felipelcaetano/frontend-nanodegree-neighborhood-map) do GitHub, ou faça um fork do projeto e clone-o em seu computador. Faça como achar melhor.
2. Abra o arquivo index.html, contido na pasta raíz do projeto, em seu editor de textos preferido e altere a linha 47, substituindo o YOUR_KEY por sua chave para utilização das APIs do Google:```<script defer
  src="https://maps.googleapis.com/maps/api/js?libraries=geometry,places&key=YOUR_KEY=initMap"></script>```
3. Caso você não possua uma chave, visiste o [site do Google](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=pt-br) para obter sua chave.
4. Abra o arquivo globalVars.js, contido na pasta js no diretório raiz do projeto, e altere as linhas 16 e 17, com as variáveis fsClientId e fsClienteSecret com suas credenciais de desenvolvedor do Foursquare.
5. Caso você não possua as credenciais, visite o [site do Foursquare](https://developer.foursquare.com/), faça seu cadastro e obtenha as credenciais.
5. Após alterada as credenciais do Google e Foursquare, abra o arquivo index.html, contido na pasta raíz do projeto, em seu navegador de preferência.

### O Projeto

##### O Mapa
Ao carregar o mapa, são exibidas 6 localizações de parques pré-definidas pelo sistema. 
Todas as localizações são de parques da cidade de São Paulo e trazem detalhes sobre os parques, unindo informações do Google e do Foursquare.

É possível navegar entre as opções, selecionando-as na lista oferecida ou clicando em seus marcadores diretamente no mapa. Ao selecionar um dos parques, alguns detalhes serão exibidos em uma janela de informações, acima de seu marcador.

##### A Busca

Caso você não se interesse pelas opções disponíveis, é possível pesquisar outras opções de parques no estado de São Paulo.
Após digitar o nome que procura, uma lista com possíveis localizações irá aparecer em uma janela abaixo do campo digitado. Selecione a opção digitada que o sistema te levará até a localização do parque, com seus detalhes sendo exibidos em sua janela de informações.

**Lembre-se! A busca funciona apenas para parques localizados no estado de São Paulo.**

#### Problemas Conhecidos

**Pesquisa de parques:** Alguns parques não estão classificados como o tipo *Parque* nos sistemas do Google, impossibilitando ecnontrá-los no mapa e obter seus detalhes após sua seleção.


**Detalhes dos parques pré-selecionados:** Existe um limite de requisições diárias que é possível fazer as APIs do Foursquare, podendo ocasionar na exibição de menos informações sobre os parques.