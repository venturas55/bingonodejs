//var socket = io.connect("http://localhost:4000", { forceNew: true });

var socket = io.connect("http://adriandeharo.es:3000", {  });
//var socket = io.connect("http://localhost:3000", {  }); 
//io();

/*  function render(data) {
    var html = data
        .map(function (elem, index) {
            return `<div>
                   <strong>${elem.author}</strong>:
                   <em>${elem.text}</em>
          </div>`;
        })
        .join(" ");

    document.getElementById("messages").innerHTML = html;
}

socket.on("bola2", function (data) {
    render(data);
}); */
 