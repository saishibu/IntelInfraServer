// weekly forecast toogle

$(function () {
    $(".content").hide();
    $(".action").click(function () {
      $(this).next(".content").slideToggle();
    });
  });


// ------------NAVBAR------------
var btn = document.querySelector(".btn");
var menu = document.querySelector(".menu");
var anchors = document.querySelectorAll(".anr");

btn.addEventListener("click", function(){
  this.classList.toggle("active");
  menu.classList.toggle("active");
});


// for navbar alert notification

