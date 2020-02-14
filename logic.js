// script for daily planner

$(document).ready(function() {

    var $textArea = document.querySelectorAll(".textarea");
    var $row = document.querySelectorAll(".row");
    var $inputs = $("input");
    var date = moment().format('LLLL');
    var time = moment().format('HH');
    var rowTime = new Array();

    function lockIn(event) {
        var index = $(this).attr("data-number");
        var task = $inputs[index].value;
        $textArea[index].textContent = task;
        $inputs[index].style.display = "none";
        localStorage.setItem(`task: ${index}`, `${task}`);      
    }

    function loadTask() {
        $.each($textArea, function(index) {
            if (localStorage.getItem(`task: ${index}`)) {
                this.textContent = localStorage.getItem(`task: ${index}`); 
            }
        });
    }
    
    function timeLogic() {
        $.each($row, function(index) {
            rowTime[index] = $(this).attr("data-time");
            if (rowTime[index] < time) {
                $textArea[index].setAttribute("id", "past");
            }
            else if (rowTime[index] == time) {
                $textArea[index].setAttribute("id", "present");
            }
            else {
                $textArea[index].setAttribute("id", "future");
            } 
        });        
    }

    $("#currentDay").text(date);
    $(".container").on("click", ".saveBtn", lockIn, event);
    timeLogic();
    loadTask();
})
