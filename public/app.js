var empty = "select table_name from user_tables;"

var csv;

function download(dataurl, filename) {
	var a = document.createElement("a");
	a.href = dataurl;
	a.setAttribute("download", filename);
	a.click();
}

function makeTable(query = empty) {
	const Http = new XMLHttpRequest();
	Http.onreadystatechange = function() {
		if (Http.readyState == XMLHttpRequest.DONE) {
			data = JSON.parse(Http.responseText);
			createTable(data);
			csv = encodeURI("data:text/csv;charset=utf-8," 
				+ data.map(e => e.join(",")).join("\n"));
		}
	}
	const url='http://localhost:7000'
	Http.open("POST", url, true);
	Http.setRequestHeader('Content-Type', 'application/json');
	var json = {"query" : query };
	Http.send(JSON.stringify(json));
};

function createTable(array) {
	var content = "";
	array.forEach(function(row) {
		content += "<tr>";
		row.forEach(function(cell) {
			content += "<td>" + cell + "</td>" ;
		});
		content += "</tr>";
	});
	document.getElementById("table").innerHTML = content;
};
