var $j = jQuery.noConflict();
var urlHost = "http://localhost/prototypappapi/api.php/";
var userName, city;
var currentPage = 4;
var parent = $j("#target-for-insert-content");
var tempName, tempPageTitle;
$j(document).ready(function(e){
  if(currentPage !== 1){
    window.history.pushState({data: "home"}, null, "home");
    console.log("ready state");
  }
});
$j(function(){

  $j(document).on("click", "#cat-list-reff li a", function(){
    var d = $j(this).attr("href");
    window.history.pushState(
      {
        data: d,
        l: "main",
        title: "home"
      }
      , d, d);
    console.dir("push: currentPage : "+ currentPage);
    //console.dir(d);
  });
  $j(document).on("click", "#sub-item-click", function(){
    var d = $j(this).attr("href");
    window.history.pushState(
      {
        data: d,
        l: "sub",
        title: tempPageTitle
      }
      , d, d);
    console.dir("push: currentPage : "+ currentPage);
  });
  $j(window).on("popstate", function(e){
    var state = e.originalEvent.state;
    if (state !== null) {
      if(state.data == "homeandgarden"){
        console.log("not null: "+state.data + state.title);
        getSubCategory(parent, state.data, state.title);
      }
      if(state.data == "home"){
        getCategory();
      }
    }else if (state === null) {
      console.log("state is null!");
      //window.history.pushState({data: "home"}, null, "home");
      window.history.back();
    }
    // console.dir(state);
    // if(e.state == null){
    //   console.dir(currentPage);
    //   if (currentPage === 2) {
    //     getCategory();
    //   }else if (currentPage === 3) {
    //     getSubCategory();
    //   }
    // }else{
    //   console.dir(e.state ? e.state.data : null);
    // }
  });

});
$j(document).ready(function(){
  var qs = (function(a){
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; i++){
      var p = a[i].split("=", 2);
      if(p.length == 1)
        b[p[0]] = "";
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));

    }
    return b;
  })(window.location.search.substr(1).split('&'));
  userName = qs['userName'];
  city = qs['city'];
  // console.dir(userName);
  // console.dir(city);
  // Fix this, retarded rerouting to this.
  getCategory();
  // closing popupmenu
  var close_popup = $j("#close-popup-selector");
  $j(close_popup).click(function(){
    var tar = $j("#popup-selector");
    $j(tar).css({"display":"none"});
  });
});
$j(document).on("click", "#settingsBtn", function(e){
  e.preventDefault();
  var tar = $j("#popup-selector");
  $j(tar).css({"display": "inherit", "transition":"opacity 2s"});
});
$j(document).on("click", "#back-provider-button", function(e){
  e.preventDefault();
  getCategory();
});
$j(document).on("click", "#cat-list-reff li a", function(e){
  e.preventDefault();
  var name = $j(this).attr("href");
  var pageTitle = $j(this).find(".cat-name-span").html();
  var parent = $j("#target-for-insert-content");
  getSubCategory(parent, name, pageTitle);
});
$j(document).on("click", "#sub-item-click", function(e){
  e.preventDefault();
  var parent = $j("#target-for-insert-content");
  var title = $j(this).find(".name-ref").html();
  var id = $j(this).attr("href");
  displaySubItem(parent, id, title);
});
function getCategory(){
  //currentPage = 1;
  //window.history.pushState({data: "d"}, "kategorier", "Kategorier");
    var parent = $j("#target-for-insert-content");
    $j(parent).load("/menu.html", function(){
      var backBtn = $j("#back-provider-button");
      //var file = "categorys.json";
      var file = urlHost+"categorys";
      var targetUl = $j("#cat-list-reff");
      $j.ajax({
        url: file,
        dataType: "json",
        success: function(data){
          // console.dir(data.categorys.records);
          $j.each(data.categorys.records, function(id, obj){
            var what = '<li><a href="'
            +obj[1]+
            '"><img class="menu-icon" src="'
            +obj[2]+
            '" alt="noicon"/><span class="cat-name-span">'
            +obj[3]+
            '</span></a></li>';
            targetUl.append(what);
          });
        }
      });
    });
}
function displaySubItem(parent, id, pageTitle){
  //currentPage = 3;
  $j(parent).load("subitem.html", function(){
    var p = $j(parent).find("#page-title-text");
    $j(p).html(pageTitle);
  });
}
function getSubCategory(parent, name, pageTitle){
  //currentPage = 2;
  $j(parent).load("content.html", function(){
    var p = $j(parent).find("#page-title-text");
    $j(p).html(pageTitle);
    var targetUl = $j(parent).find("#content-id ul");
    $j.ajax({
      //url: "companys.json",
      url: urlHost+"companys",
      dataType: "json",
      success: function(data){
        $j.each(data.companys.records, function(id, obj){
          if(obj[1] == name){
            var what = '<li><a id="sub-item-click" href="'+obj[0]+'"><div class="name-ref">'
            +obj[2]+
            '</div></a></li>';
            targetUl.append(what);
          }
        });
      }
    });
    tempName = name;
    tempPageTitle = pageTitle;
    //alert($j(parent).find("#content-id").html());
  });
}


// ?userName=crisse&city=Årjäng  :: for building url's
//  {
//   "categorys":[
//     {"categoryId": 1,"linkName":"sport","categoryIconSource":"img/icon/sport.png","categoryName": "Sport"},
//     {"categoryId": 2, "linkName":"restaurant","categoryIconSource":"img/icon/restaurant.png","categoryName": "Restaurant"},
//     {"categoryId": 3, "linkName":"homeandgarden","categoryIconSource":"img/icon/homeandgarden.jpg","categoryName": "Hem och trädgård"},
//     {"categoryId": 4, "linkName":"electronics","categoryIconSource":"img/icon/electronics.png","categoryName": "Elektronik"}
//     ]
// }
// {
//   "companys":[
//     {
//       "compId": 1,
//       "compCategoryId": "homeandgarden",
//       "compName": "Handelsträdgården",
//       "compImgIcon": "img/companyimg/handelstradgarden.png"
//     },
//     {
//       "compId": 2,
//       "compCategoryId": "sport",
//       "compName": "Någon Sportbutik",
//       "compImgIcon": "img/companyimg/handelstradgarden.png"
//     }
//     ]
// }
