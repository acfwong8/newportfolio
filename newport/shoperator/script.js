//     accessKey:"AWSAccessKeyId=AKIAJOV5RN7PJ4EB2NHQ",
//     .com assTag:"AssociateTag=anguwongdood-20",
//.de assTag: "AssociateTag=anguwongdood-21",
//.jp assTag: "AssociateTag=anguswong105-22"
//.cn assTag: "AssociateTag=anguswong-23"
//.ca assTag: "AssociateTag=anguswongport-20"
// var SAKey = "F4NP/ayIOAwhhW3iYckiHN9T1rgs/loE3z/yQ6jw";

// ebay                           
// DEVID:
// 150b4dbd-7cc1-4b0d-8521-df53fcf5bd9f
// AppID:
// AngusWon-948f-4cf1-836c-9b2979a7f6ac
// CertID:
// f493a9e2-b4ee-44b4-9bb5-c4f78282ad83

// Oanda
//36a5e23c39b830be0fdfc4c7d0381ffa-7b0fa2a136018b8db0654151e10a5dca

var serverIP = 'localhost:3001'
var amazonRequest = {};
var oanda = {};
var ebayRequest = {};
var easypost = {};
var amazonRequests = "";
var offsetArray = "";

easypost.key = "PsOHuRJIvdYWGJFDkOZDAQ";
// amazonRequest.url =  "http://webservices.amazon."+TLD+"/onca/xml";
ebayRequest.url = "http://open.api.ebay.com/shopping";
oanda.url = "https://api-fxpractice.oanda.com/v1/";
easypost.url = "https://api.easypost.com/v2/shipments";
var FXgetter = loadFX();
$(document).ready(function(){
    
    FXsymbol();
})

function loadFX(){
    var FXarray = [];
    return {
        getFX: function(){
            return FXarray;
        },
        setFX: function(key){
            FXarray = key;
            return FXarray;
        }
    };

}

var FXpair = getPair();
function getPair(){
    var thePair ="";
    return{
        getPair: function(){
            return thePair;
        },
        setPair: function(currOne, currTwo){
            for (var i = 0; i < FXgetter.getFX().length; i++ ){
                if(FXgetter.getFX().indexOf(currOne+"_"+currTwo) > -1){
                    thePair = currOne+"_"+currTwo;
                    return {
                        currency:thePair,
                        counter:0
                    };
                } else if (FXgetter.getFX().indexOf(currTwo+"_"+currOne) > -1){
                    thePair = currTwo+"_"+currOne;
                    return{
                        currency:thePair,
                        counter:1
                    };
                } else {
                    thePair = "WTICO_USD";
                    return{
                        currency:thePair,
                        counter:2
                    };
                }
            }
        }
    }
}


$(".indices").on("change",function(){
    console.log($(".indices").val());
    // FXrate();
});
var userRate = $('.currency').val().toUpperCase();
var rateInit = {
    com:'USD',
    de:'EUR',
    ca:'CAD',
    co:{
        jp:'JPY',
        uk:'GBP'
    }
}

var boxes = checkedBox();
function checkedBox (){
    var checkedArray = [];
    return{
        setBoxes:function(checkbox){
            checkedArray = [];
            var a = $(checkbox).length;
            for (var i = 1; i <= a; i++){
                if($(checkbox+i).prop('checked')){
                    checkedArray.push($(checkbox+i+':checked').val());
                }
            }
            // checkedArray.splice(null);
            return checkedArray;
        }
    }
}

// $(".submitsearch").on("submit",function (evnt){
//     var ebay = 0;
//     evnt.preventDefault();
//     $("#stores").empty();
//     ebayRequest.url = "http://open.api.ebay.com/shopping"
//     oanda.url = "https://api-fxpractice.oanda.com/v1/"
//     TLDarray = boxes.setBoxes('.checkbox');
//     var firstCounter = 1;
//     for (var m = 0; m < TLDarray.length; m++){
        
//         amazonSearches(TLDarray[m], firstCounter);
//     }
//     if($('.ebaycheck').prop('checked')){
//         ebay = 1;
//         // ebayRequest.encode(firstCounter);
//         var itemList = new ebayRequest.encode.setItems();
//         console.log(ebayRequest.encode);
//         var filledList = itemList.then();
//         itemList.then({
//             filled: function(){
//                 console.log(filledList);
//             },
//             failed:function(){
//                 console.log('failed');
//             }
//         })
//         // var a = ebayRequest.encode(firstCounter).setItems();

//     } else {
//         ebay = 0;
//     };
//     scrollChecker(TLDarray,firstCounter);
//     var width = 1/(TLDarray.length + ebay)*100;
//     var widthPercent = width+'%'
//     // console.log(widthPercent);
//     $('.store').css({
//         'width':widthPercent
//     })
//     var currOne = eval("rateInit."+"com");
//     var currTwo = $('.currency').val().toUpperCase();
//     var theCurrency = FXgetter.getFX();
//     var userPair = FXpair.setPair(currOne, currTwo);
//     var USPair = FXpair.setPair("USD", currTwo);


// });
function displayOffset(TLD){
    eval('var offset'+TLD+'= 0;');
    return{
        setOffset: function(){
            eval('offset'+TLD+'++;');
            return eval('offset'+TLD+';');
        },
        getOffset:function(){
            return eval('offset'+TLD+';');
        }
    }
}


function amazonSearches(TLD,firstCounter,failCounter) {
    amazonRequest.url =  "https://webservices.amazon."+TLD+"/onca/xml"
    
    var currOne = eval("rateInit."+TLD)
    var currTwo = $('.currency').val().toUpperCase();
    var theCurrency = FXgetter.getFX();
    var userPair = FXpair.setPair(currOne, currTwo);
    var USPair = FXpair.setPair("USD", currTwo);
    var pagesearchLimit = 10;
    var minResults = 10;
    var pageDisplayLimit = 10;
    rateConvert.setConvert(userPair.currency, userPair.counter);

    var TLD2 = "";
    if (TLD == 'co.jp' || TLD == 'co.uk'){
        TLD2 = TLD.replace('.','');
    } else {
        TLD2 = TLD;
    }

    if (firstCounter === 1){
        eval('offsetArray'+TLD2+' = displayOffset(TLD2);');
        eval('amazonRequests'+TLD2+ '= amazonRequestCode(TLD,userPair.currency,firstCounter,pagesearchLimit,minResults);');
        eval('amazonRequests'+TLD2+'.setItems();');
    }

    var checkItems = setInterval(function(){
        if(eval('amazonRequests'+TLD2+'.getItems()').length <= minResults){
            eval('amazonRequests'+TLD2+'.setItems();');
        } else {
            stopCheck();
        }
    },5000);
    eval('console.log(amazonRequests'+TLD2+'.getItems());');

    var finishSearch = setInterval(function(){
        
        if (eval('amazonRequests'+TLD2+'.getItems()').length >= minResults){
            var a = eval('amazonRequests'+TLD2+'.getItems();');
            var displayStart = pageDisplayLimit * (firstCounter-1) + eval('offsetArray'+TLD2+'.getOffset()');
            var displayEnd = Math.min(pageDisplayLimit * (firstCounter) + eval('offsetArray'+TLD2+'.getOffset()'),a.length);
            console.log(a);
            // for(var k = pageDisplayLimit * (firstCounter-1); k < pageDisplayLimit * firstCounter; k++){
            for(var k = displayStart; k < displayEnd; k++){
                console.log(a[k].convprice);
                if($('.minPrice').val() && $('.maxPrice').val()){
                    if($('.minPrice').val() <= a[k].convprice && $('.maxPrice').val() >= a[k].convprice){
                        console.log('gogo');
                        productDisplay(a[k].shop,a[k].title,a[k].price,a[k].convprice,a[k].currency,a[k].convcurrency,a[k].link,a[k].picture,a[k].TLD,firstCounter);
                    } else {
                        console.log(eval('offsetArray'+TLD2+'.setOffset()'));
                        displayEnd = Math.min(pageDisplayLimit * (firstCounter) + eval('offsetArray'+TLD2+'.getOffset()'),a.length);
                    }
                } else if($('.minPrice').val()){
                    if($('.minPrice').val() <= a[k].convprice){
                        productDisplay(a[k].shop,a[k].title,a[k].price,a[k].convprice,a[k].currency,a[k].convcurrency,a[k].link,a[k].picture,a[k].TLD,firstCounter);
                    } else {
                        console.log(eval('offsetArray'+TLD2+'.setOffset()'));
                        displayEnd = Math.min(pageDisplayLimit * (firstCounter) + eval('offsetArray'+TLD2+'.getOffset()'),a.length);
                    }
                } else if($('.maxPrice').val()){
                    if($('.maxPrice').val() >= a[k].convprice){
                        productDisplay(a[k].shop,a[k].title,a[k].price,a[k].convprice,a[k].currency,a[k].convcurrency,a[k].link,a[k].picture,a[k].TLD,firstCounter);
                    } else{
                        console.log(eval('offsetArray'+TLD2+'.setOffset()'));
                        displayEnd = Math.min(pageDisplayLimit * (firstCounter) + eval('offsetArray'+TLD2+'.getOffset()'),a.length);
                    }
                } else {
                    productDisplay(a[k].shop,a[k].title,a[k].price,a[k].convprice,a[k].currency,a[k].convcurrency,a[k].link,a[k].picture,a[k].TLD,firstCounter);                    
                }
            }
            stopSearch();
        }
    },10);

    function stopSearch(){
        clearInterval(finishSearch);
    }
    function stopCheck(){
        clearInterval(checkItems);
    }

}

function scrollChecker(TLDarray,firstCounter){
    window.onscroll = function(ev){
        if((window.innerHeight + window.scrollY) >= $(document).height()){
            firstCounter++;
            for (var m = 0; m < TLDarray.length; m++){
                // amazonRequest.encode(TLD,userPair.currency,firstCounter);
                amazonSearches(TLDarray[m],firstCounter);
                
            }

            // if($('.ebaycheck').prop('checked')){
            //     ebayRequest.encode(firstCounter);
            // }
        }
    }
}

function FXsymbol(){
    var FXarray=[];
    $.ajax({
        url:oanda.url+'instruments',        
        type:"GET",
        dataType:"json",
        data:{
            accountId:'341013'
        },
        headers:{
            Authorization: "Bearer 36a5e23c39b830be0fdfc4c7d0381ffa-7b0fa2a136018b8db0654151e10a5dca"            
        },
        success:function(resp){
            for(var i=0; i<resp.instruments.length;i++){
                FXarray.push(resp.instruments[i].instrument);
            }
            FXgetter.setFX(FXarray);
        }
    });

           
      
}

var rateConvert = FXrate();
function FXrate () {
    var conversion = {};
    var rate = 0;
    return{
        setConvert:function(currencyOne, countOne){
            $.ajax({
                url:oanda.url+'prices',
                type:"GET",
                dataType:"json",
                data: {
                    instruments: currencyOne

                },
                headers:{
                    Authorization: "Bearer 36a5e23c39b830be0fdfc4c7d0381ffa-7b0fa2a136018b8db0654151e10a5dca"            
                }
            }).done(function(resp){
                console.log(resp);
                var rate2 = resp.prices[0].ask;
                if (countOne === 0){
                    rate = rate2;
                    conversion[currencyOne] = rate;
                } else if (countOne === 1){
                    rate = 1/rate2;
                    conversion[currencyOne] = rate;
                } else {
                    rate = 1;
                    conversion[currencyOne] = rate;              
                }
            })
            return conversion;                             
        },
        getConvert:function(){
            return conversion;
        }
    }

}

// ebayRequest.encode = function(firstCounter){


function ebayRequestCode(firstCounter){

    if(firstCounter === 1){
        var $div = $("<div>").attr('id','ebaycom').addClass('store');
        var $h1 = $('<h1>').text('Listings from eBay.com');
        $div.append($h1);
        $('#stores').append($div);
        $div.hide();
    }

    if(firstCounter === 1){
        $div.fadeIn(800);
    }

    var $ul = $("<ul>").addClass('storelist listpage');
    $('#ebaycom').append($ul);

    var searchAZ = $(".indices").val();
    var keywordAZ = $(".itemsearch").val();
    
    
    var sep = "&";
    
    // var qString = {
    //     appid: "appid=AngusWon-948f-4cf1-836c-9b2979a7f6ac",
    //     callname: "callname=FindPopularItems",
    //     callbackname:"callbackname=function",
    //     requestencoding: "requestencoding=XML",
    //     version: "version=517",
    //     serviceversion: "service-version=1.12.0",
    //     keywords: "QueryKeywords="+keywordAZ,
    //     siteid: "siteid=0",
    //     outputselector: "outputSelectorType=PictureURLLarge"
    // }
    // var string = qString.appid + sep + qString.callname + sep + qString.callbackname + sep + qString.requestencoding + sep + qString.version + sep + qString.keywords + sep + qString.serviceversion + sep + qString.outputselector + sep + qString.siteid;
    
    // var xml = ebayRequest.url + "?" + string;
    var itemArray = [];
    return {
        setItems: function(){
            var qString = {
                appid: "appid=AngusWon-948f-4cf1-836c-9b2979a7f6ac",
                callname: "callname=FindPopularItems",
                callbackname:"callbackname=function",
                requestencoding: "requestencoding=XML",
                version: "version=517",
                serviceversion: "service-version=1.12.0",
                keywords: "QueryKeywords="+keywordAZ,
                siteid: "siteid=0",
                outputselector: "outputSelectorType=PictureURLLarge",
                entriesPerPage: "pageNumber=22"
            }
            var string = qString.appid + sep + qString.callname + sep + qString.callbackname + sep + qString.requestencoding + sep + qString.version + sep + qString.keywords + sep + qString.serviceversion + sep + qString.outputselector + sep + qString.siteid + sep + qString.entriesPerPage;

            var xml = ebayRequest.url + "?" + string;
            
            $.ajax({
                url:"http://"+serverIP+"/parse",
                type:"POST",
                dataType:"json",
                data:{
                    id: xml
                    
                },
                success: function(res){
                    console.log(res);
                    
                    for (var i = 0; i < 100; i++){
                        var currency = "USD";
                        var title = (res.ItemArray.Item[i].Title);
                        var price = res.ItemArray.Item[i].ConvertedCurrentPrice
                        var link = (res.ItemArray.Item[i].ViewItemURLForNaturalSearch);
                        var shop = "ebay";
                        var picture = (res.ItemArray.Item[i].GalleryURL);
                        // var convprice = Math.round(price*currencyChange*100)/100;
                        var convcurrency = $('.currency').val().toUpperCase();
                        var convprice = Math.round(Number(price*rateConvert.getConvert()["USD_CAD"])*100)/100;
                        itemArray.push({
                            'currency': currency,
                            'title': title,
                            'price': price,
                            'link': link,
                            'shop': shop,
                            'picture':picture,
                            'convprice':convprice,
                            'convcurrency':convcurrency
                        });

                        // productDisplay(shop,title,price,convprice,currency,$('.currency').val().toUpperCase(),link,picture,'com',firstCounter);
                    };
                    console.log(itemArray);
                    return itemArray;

                }
                
            })
        },

        getItems: function(){
            return itemArray;
        }
        
    }


    
};


// amazonRequest.encode = function(TLD,currPair,firstCounter){
// $.ajax({
//     type:"POST",
//     dataType:'application/json',
//     data:{
//         id: 'hello there'
//     },
//     url:'http://'+serverIP+'/shoperator/parse',
//     success: function(response){
//         console.log(response);
//         console.log(1);
//     }
// });
function amazonRequestCode(TLD,currPair,firstCounter,pageSearchLimit,minResults){
    var TLD2 = "";
    if (TLD == 'co.jp' || TLD == 'co.uk'){
        TLD2 = TLD.replace('.','')
    } else {
        TLD2 = TLD;
    }

    if(firstCounter === 1){
        var $div = $("<div>").attr('id','amazon'+TLD2).addClass('store');
        var $h1 = $("<h1>").text('Listings from Amazon'+'.'+TLD);
        $div.append($h1);
        $('#stores').append($div);

    }
    // console.log(firstCounter);
    var $ul = $("<ul>").addClass('storelist listpage');
    $('#amazon'+TLD2).append($ul);

    // if(firstCounter === 1){
    //     $div.fadeIn(800);
    // }

    var searchAZ = $(".indices").val();
    var keyword = $(".itemsearch").val();
    var keywordAZ = keyword.replace(/ /g,"%20");
    console.log($.now());
    console.log(TLD2);

    var itemArray = [];
    var failCounter = 0;
    
    return {
        setItems:function(){
            var date = new Date();
            var years = date.getUTCFullYear();
            var months = date.getUTCMonth()+1;
            if (months < 10){
                months = "0"+months;
            };
            var days = date.getUTCDate();
            if (days < 10) {
                days = "0"+days;
            };
            var hours = date.getUTCHours();
            if (hours <10){
                hours = "0" + hours;
            }
            var minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = "0"+ minutes;
            };
            var seconds = date.getSeconds();
            if (seconds < 10) {
                seconds = "0"+ seconds;
            };
            var timeStamp = years+"-"+months+"-"+days+"T"+hours+"%3A"+minutes+"%3A"+seconds+"Z";

            var sep = "&";
            var pagelimit = pageSearchLimit;

            for (var m = 1; m <= pagelimit; m++){
                var qString = {
                    service:"Service=AWSECommerceService",
                    availability:"Availability=Available",
                    condition:"Condition=New",
                    itempage:"ItemPage="+m,
                    responsegroup:"ResponseGroup=ItemAttributes%2COffers%2CImages%2CVariationSummary",
                    operation:"Operation=ItemSearch",
                    accessKey:{
                        com:"AWSAccessKeyId=AKIAIDG7D3XYM4J6TBOA",
                        co:{
                            uk:"AWSAccessKeyId=AKIAJRQLAJXRD7Z5L2CA"
                        }
                    },
                    assTag:{
                        // com:"AssociateTag=anguwongdood-20",
                        com:"AssociateTag=anguwongsport-20",
                        de:"AssociateTag=anguswongdood-21",
                        co:{
                            jp:"AssociateTag=anguswong105-22",
                            uk:"AssociateTag=anguswongport-21"
                        },
                        ca:"AssociateTag=anguswongport-20",
                        cn:"AssociateTag=anguswong-23"
                    },
                    sIndex:"SearchIndex="+searchAZ,
                    keyword:"Keywords="+keywordAZ,
                    timestamp:"Timestamp="+timeStamp,
                    sort: "Sort=titlerank"
                };

                // console.log(eval("qString.assTag."+TLD))
                var SAKey = {
                    com:"0zIThiN/aoG4jP6eqBE2TpcuOvrGsGWOnZlDM6il",
                    co:{
                        uk:"m9dOx2+53meAjQ3BwXmDseekmxJWcPez0MtstYMo"
                    }
                };

                var authString = eval("qString.accessKey.com") + sep + eval("qString.assTag.com") + sep + qString.availability + sep + qString.condition + sep + qString.itempage + sep + qString.keyword + sep + qString.operation + sep + qString.responsegroup + sep + qString.sIndex + sep + qString.service + sep + qString.timestamp;

                // console.log(authString);
                
                var test_string =
                    "GET\n" +
                    "webservices.amazon."+TLD+"\n" +
                    "/onca/xml\n" +
                    authString;
                // console.log(eval("SAKey."+TLD));

                var signature2 = CryptoJS.HmacSHA256(test_string, eval("SAKey.com"));
                var authKey = signature2.toString(CryptoJS.enc.Base64);
                var newAuthKey = encodeURIComponent(authKey);
                var dataFull = authString + sep + "Signature=" + newAuthKey;


                // console.log(amazonRequest.url+"?"+dataFull);

                var xml = amazonRequest.url+"?"+dataFull;
                // amazonRequest.call(xml,TLD,currPair,firstCounter)
                // }                               
                
                // amazonRequest.call = function(dataSent,TLD,currPair,firstCounter){
                var data = {};
                data.id = xml;
                data.number = 2;
                $.ajax({
                    type:"POST",
                    dataType:"application/json",
                    data: data,
                    url:"http://"+serverIP+"/shoperator/parse",
                    error: function(resp, status, jqXHR){
                        console.log(1);
                        var response = JSON.parse(resp.responseText);
                        console.log(response);
                        if (response === false && itemArray.length <= minResults){
                            console.log(itemArray.length);
                        }else if(response === false) {
                            
                        }else{
                            for (var i = 0; i<10; i++){
                                var price = 0;
                                var currency = "";
                                var shop = 'amazon';
                                var title = (response.Items[0].Item[i].ItemAttributes[0].Title[0]);
                                // console.log(title);
                                if(response.Items[0].Item[i].OfferSummary[0].LowestNewPrice[0]){
                                    price = (response.Items[0].Item[i].OfferSummary[0].LowestNewPrice[0].Amount);
                                    if(TLD !== "co.jp"){
                                        price = price/100;
                                    }
                                    // console.log(price);
                                    currency = (response.Items[0].Item[i].OfferSummary[0].LowestNewPrice[0].CurrencyCode[0]);
                                } else if (response.Items[0].Item[i].ItemAttributes[0].ListPrice[0]){
                                    price = (response.Items[0].Item[i].ItemAttributes[0].ListPrice[0].Amount[0]);
                                    if (TLD !=="co.jp"){
                                        price = price/100;
                                    }
                                    currency = (response.Items[0].Item[i].ItemAttributes[0].ListPrice[0].CurrencyCode[0]);
                                } else if (response.Items[0].Item[i].VariationSummary){
                                    price = (response.Items[0].Item[i].VariationSummary.LowestPrice.Amount);
                                    if (TLD !=="co.jp"){
                                        price = price/100;
                                    }
                                    currency = (response.Items[0].Item[i].VariationSummary.LowestPrice.CurrencyCode);
                                } else {
                                    price = "";
                                    currency = "No Items";
                                }
                                
                                var link = (response.Items[0].Item[i].DetailPageURL[0]);
                                var picture = "";
                                // if(TLD == "com"){
                                //     picture = (response.Items.Item[i].LargeImage.URL);
                                if(response.Items[0].Item[i].ImageSets){
                                    if(response.Items[0].Item[i].ImageSets[0].ImageSet.length > 1){
                                        picture = (response.Items[0].Item[i].ImageSets[0].ImageSet[0].LargeImage[0].URL[0]);
                                    } else {
                                        picture = (response.Items[0].Item[i].ImageSets[0].ImageSet[0].LargeImage[0].URL[0]);
                                    }
                                }
                                var convcurrency = $('.currency').val().toUpperCase();
                                var convprice = Math.round(Number(price*rateConvert.getConvert()[currPair])*100)/100;
                                itemArray.push({
                                    'currency':currency,
                                    'title':title,
                                    'price':price,
                                    'link':link,
                                    'shop':shop,
                                    'picture':picture,
                                    'convprice':convprice,
                                    'convcurrency':convcurrency,
                                    'TLD':TLD2
                                });
                            }
                        }
                    },
                    success: function(xhr, error){
                        console.log('xhr: ');
                        console.log(xhr)
                        console.log(JSON.parse(xhr.responseText));
                        console.log('error: ');
                        console.log(error);
                    }
                });
            }
            console.log(itemArray);
            return itemArray;
        },
        getItems:function(){
            return itemArray;
        }
                   
    };
}

$(".submitsearch").on("submit",function (evnt){
    var ebay = 0;
    evnt.preventDefault();
    $("#stores").empty();
    ebayRequest.url = "http://open.api.ebay.com/shopping"
    oanda.url = "https://api-fxpractice.oanda.com/v1/"
    TLDarray = boxes.setBoxes('.checkbox');
    var firstCounter = 1;
    for (var m = 0; m < TLDarray.length; m++){
        
        amazonSearches(TLDarray[m], firstCounter);
    }
    if($('.ebaycheck').prop('checked')){
        ebay = 1;
        var ebayCall = ebayRequestCode(firstCounter);
        ebayCall.setItems();
        // var itemList = new Promise(function(resolve,reject){
        //     var a = ebayCall.getItems();
        //     if (a.length === 0){
        //         reject('error');                
        //     }else{
        //         resolve(a);
        //     };
            
        // });

        // var filledList = itemList.then();
        // itemList.then(function(value){
        //     console.log(value);
        //     console.log(2);
        // },function(reason){
        //     console.log(reason);
        // });
        var completed = setInterval(function(){
            var a = ebayCall.getItems();
            if (a.length !== 0){
                console.log(a);
                for (var i = 0; i < firstCounter*10; i++){
                    productDisplay(a[i].shop,a[i].title,a[i].price,a[i].convprice,a[i].currency,a[i].convcurrency,a[i].link,a[i].picture,'com',firstCounter);                   
                }
                stopcheck(completed);
                return a;

            };
        },10);

        function stopcheck(varname){
            clearInterval(varname);
        };

    }else {
        ebay = 0;
    };
    
    scrollChecker(TLDarray,firstCounter);
    var width = 1/(TLDarray.length + ebay)*100;
    var widthPercent = width+'%'
    // console.log(widthPercent);
    $('.store').css({
        'width':widthPercent
    })
    var currOne = eval("rateInit."+"com");
    var currTwo = $('.currency').val().toUpperCase();
    var theCurrency = FXgetter.getFX();
    var userPair = FXpair.setPair(currOne, currTwo);
    var USPair = FXpair.setPair("USD", currTwo);

    $('.form').addClass('hidesection');
    $('.unhideButton').removeClass('hiddenbutton');

});

$('.unhideButton').on('click',function(){
    $('.form').removeClass('hidesection');
    $('.unhideButton').addClass('hiddenbutton');
})



function productDisplay(shop,title,price,convprice,currency,convcurrency,link,picture,TLD,firstCounter){

    var $listitem = $("<li>");
    var $title = $("<a>");
    $title.text(title);
    $title.attr("href",link)
    var $price = $("<p>");
    $price.text(currency + " " + price + "    " + convcurrency + " " + convprice).addClass("pricing");
    var $image = $("<img>");
    var $imagediv = $("<div>");
    var $titlediv = $("<div>");
    $titlediv.append($title).addClass('titlediv');
    $imagediv.addClass('imagediv')
    $image.attr("src",picture).addClass("");
    $imagediv.append($image);
    $listitem.append($imagediv,$titlediv,$price).addClass('shopitems hidden');
    $("#"+shop+TLD+" .listpage").append($listitem);
    setTimeout(function(){
        $listitem.removeClass('hidden');
    },500);
    // $(this).attr('style','background-image: url('+picture+')')
    // $("#"+shop).removeClass("hidden");
    // $("li").on("mouseover", function(){
    //     $(this).find("img").removeClass("hidden");
    // })
    $("a").on("mouseover",function(){
        $(this).find("a").addClass("redlink");
    })
    
    // $("li").on("mouseout",function(){
    //     $(this).find("img").addClass("hidden");
    // })
    $("a").on("mouseout",function(){
        $(this).find("a").removeClass("redlink");
    })
    
}



$("input").on("mouseover",function(){
    $(this).addClass("buttonhover");
})

$("input").on("mouseout",function(){
    $(this).removeClass("buttonhover");
})

$(".amazonRegions li").on("mouseover",function(){
    $(this).addClass("regionhover");
})

$(".amazonRegions li").on("mouseout",function(){
    $(this).removeClass("regionhover");
})
