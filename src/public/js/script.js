//var socket = io.connect("http://localhost:4000", { forceNew: true });
// Instead of:
//var socket = io.connect("http://bingo.adriandeharo.es", {  });
// Use:
const socket = io.connect(window.location.origin, { secure: true });
//var socket = io.connect("http://localhost:3001", {  }); 
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
 