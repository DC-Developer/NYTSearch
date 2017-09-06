$(document).ready(function(){
    
$("#searchButton").on("click", function(event){
    //stop the button from refreshing the page on click
    event.preventDefault();

    var api_key = "ddbc3b0c5f474397a107a4bde2012797";
    var searchTerm =  $("#searchTerm").val().trim();
    var recordNum = $("#recordRetreive").val();
    var startDate = $("#startYear").val();
    var endDate = $("#endYear").val();

    console.log(searchTerm);
    console.log(recordNum);
    console.log(startDate);
    console.log(endDate);

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    
    if(startDate && endDate != null){
        url += '?' + $.param({
            'api-key': api_key,
            'q': searchTerm,
            'begin_date': startDate,
            'end_date': endDate
          });

    }else{
        url += '?' + $.param({
            'api-key': api_key,
            'q': searchTerm     
          });

    }

    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
        $("#topArticles").empty();
        for(i=0; i < recordNum; i++){
            var count = i + 1;
            var author = result.response.docs[i].byline.original;
            
            
            var linkText = result.response.docs[i].headline.main;
            var siteLink = result.response.docs[i].web_url;
            var newDiv = $("<div id ='newDiv'>");
            var num = $("<div id='numDiv'>").text(count);
            var name = $("<p id ='author'>").text(author);
            var link = $('<a>',{
                    text: linkText,
                    id: 'newLink', // <-- notice I replaced id with class
                    href: siteLink,
                    target: "_blank"
                });
            console.log(result.response.docs[i].byline.original);
            console.log(result.response.docs[i].headline.main);
            
            
            
            newDiv.append(num);
            newDiv.append(link);
            newDiv.append(name);
            $("#topArticles").append(newDiv);
        }

      console.log(result);
    }).fail(function(err) {
      throw err;
    });

});

$("#clear").on("click", function(){
    
    $("#topArticles").empty();
    $("#searchTerm").val("");
    $("#startYear").empty();
    $("#endYear").empty();
});



});






