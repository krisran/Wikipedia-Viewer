function searchWikipedia(searchValue) {
var result = false;
 
 if (searchValue === null || searchValue === undefined || searchValue === "") {
   alert("Enter text in the textbox to a search Wikipedia!");
 } else {
   $.ajax({
     type: "GET",
     url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchValue + "&namespace=0&limit=10&callback=?",
     contentType: "application/json; charset=utf-8",
     dataType: "json",
     success: function(data) {

       // wikipedia will returns 10 results in an array
         for (var i = 9; i >= 0; --i) {
            if (data[1][i] !== undefined) { //if an article is found
                $("#wiki-result").prepend("<div class=\"wiki-card\"><h2>" + data[1][i] + "</h2><p class=\"wiki-snippet\">" + data[2][i] + "</p><p><a target=\"_blank\" href=" + data[3][i] + ">Link</a></p></div>");
                result = true;
            }
           }
         
         // show message about the status of search result
          if (result == true)
            $("#wiki-result").prepend("<p class=\"title\">Results for: <em>" + searchValue + "</em></p>");
          else
            $("#wiki-result").prepend("<p class=\"title\">Sorry, the search for \"<em>" + searchValue + "\"</em> did not match any results.</p>");
          },

     error: function(errorMessage) {
       $("#wiki-result").html(errorMessage);
     }
   }); //ajax
 } // else
} //searchWikipedia()
