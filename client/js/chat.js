$(function () {
    var socket = io();
    $("form").submit(function () {
        socket.emit("chat.message", $("#chat").val());
        $("#chat").val("");
        return false;
    });
    socket.on("chat.message", function (msg) {
        $("#messages").append($("<li>").text(msg));
        window.scrollTo(0, document.body.scrollHeight);
    });
});