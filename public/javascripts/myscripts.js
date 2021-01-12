var e = document.getElementById("num_vocab_list");
var num_vocab=e.options[e.selectedIndex].text;

var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
// req.open("get", "https://jsondata.okiba.me/v1/json/E5cOQ201221050909", true); // アクセスするファイルを指定
// req.open("get", "/test_words", true);
req.open("get", "/vocabs", true);
req.send(); // HTTPリクエストの発行

req.onload = function() {
  var result = JSON.parse(req.responseText);
  // alert(JSON.stringify(result["common"]))

  createTable(result["common"],num_vocab)

  var japanese_meaning = 2;
    var english_meaning = 3;

    if (document.querySelector(".display_check").checked == true) {
      $('#vocab-table th:nth-child(' + japanese_meaning + ')').show();
      $('#vocab-table td:nth-child(' + japanese_meaning + ')').show();
      $('#vocab-table th:nth-child(' + english_meaning + ')').show();
      $('#vocab-table td:nth-child(' + english_meaning + ')').show();
      
    } else {
      $('#vocab-table th:nth-child(' + japanese_meaning + ')').hide();
      $('#vocab-table td:nth-child(' + japanese_meaning + ')').hide();
      $('#vocab-table th:nth-child(' + english_meaning + ')').hide();
      $('#vocab-table td:nth-child(' + english_meaning + ')').hide();
      
    }

}




function getJson() {
  var e = document.getElementById("num_vocab_list");
  var num_vocab=e.options[e.selectedIndex].text;

  var a = document.getElementById("dataset_list");
  var dataset=a.options[a.selectedIndex].text;

  // alert(dataset);

  var data;


  switch (dataset) {
    case "日常会話でよく使う2918語":
      data = "common";
      break;
    case "大学生レベル2623語":
      data = "university";
      break;
    case "高校レベル2277語":
      data = "high";
      break;
    case "中学生レベル1292語":
      data = "middle";
      break;
    case "小学生レベル1001語":
      data = "elementary";
      break;

  }

  var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
  // req.open("get", "https://jsondata.okiba.me/v1/json/E5cOQ201221050909", true); // アクセスするファイルを指定
  // req.open("get", "/test_words", true);
  req.open("get", "/vocabs", true);
  req.send(); // HTTPリクエストの発行

  req.onload = function() {
    var result = JSON.parse(req.responseText);
    // alert(JSON.stringify(result))

    createTable(result[data],num_vocab)

    var japanese_meaning = 2;
    var english_meaning = 3;

    if (document.querySelector(".display_check").checked == true) {
      $('#vocab-table th:nth-child(' + japanese_meaning + ')').show();
      $('#vocab-table td:nth-child(' + japanese_meaning + ')').show();
      $('#vocab-table th:nth-child(' + english_meaning + ')').show();
      $('#vocab-table td:nth-child(' + english_meaning + ')').show();
      
    } else {
      $('#vocab-table th:nth-child(' + japanese_meaning + ')').hide();
      $('#vocab-table td:nth-child(' + japanese_meaning + ')').hide();
      $('#vocab-table th:nth-child(' + english_meaning + ')').hide();
      $('#vocab-table td:nth-child(' + english_meaning + ')').hide();
      
    }

  }

  
  




}

function createTable(words,num_vocab) {
  // EXTRACT VALUE FOR HTML HEADER.
  rand_words = getRandomSubarray(words,num_vocab)

  // alert(JSON.stringify(rand_words));
  var col = [];
  for (var i = 0; i < rand_words.length; i++) {
    for (var key in rand_words[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }


  }

  //Create Dynamix
  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");
  table.setAttribute('class', 'styled-table');
  table.setAttribute('id', 'vocab-table');

  


  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1); // TABLE ROW.

  
  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th"); // TABLE HEADER.
    th.innerHTML = col[i];
    tr.appendChild(th);
  }
  

  // ADD JSON DATA TO THE TABLE AS ROWS.

  
  for (var i = 0; i < rand_words.length; i++) {

    tr = table.insertRow(-1);

    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = rand_words[i][col[j]];
    }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}

function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - size,
    temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

//when display checkbox is checked
$(function () {
  $('#display_meaning').change(function () {
    var japanese_meaning = 2;
    var english_meaning = 3;
    if (this.checked) {
      $('#vocab-table th:nth-child(' + japanese_meaning + ')').show();
      $('#vocab-table td:nth-child(' + japanese_meaning + ')').show();
      $('#vocab-table th:nth-child(' + english_meaning + ')').show();
      $('#vocab-table td:nth-child(' + english_meaning + ')').show();
    } else {
      $('#vocab-table th:nth-child(' + japanese_meaning + ')').hide();
      $('#vocab-table td:nth-child(' + japanese_meaning + ')').hide();
      $('#vocab-table th:nth-child(' + english_meaning + ')').hide();
      $('#vocab-table td:nth-child(' + english_meaning + ')').hide();
    }
  });                
})  