var myJson;
var head;
var question;
var group = 0;
var correctAnswer = [];
var UserInputArr = [];
var questionInput = [];
var multiple;
var que;
var question;
var correct;
var tanu;
var option;
var buttonName;
var container;
var headtitle;
var quest;
var results;
var submitbtn;
var radios;
var correctmark = 0;

var head;
var textvalue;
var value;
var Mcq;
var resultsAnswer;
var resultsquestion;
var marks;
var output;
var correctvaluedisplay;


$(document).ready(function() {

    $.ajax({
        url: 'js/config.json',
        mimeType: 'application/json',
        success: function(data) {
            myJson = data;
            parseData();
        }
    })


    function ResultsUpdate(question, correct) {
        if (group == resultque.length - 1) {
            $(".checkresult").click(function() {
                $("#output").show();
                $("#container").empty();
                $("#output").append("<h3>" + question);
                $("#output").append("<h4>" + "user input : " + value);
                $("#output").append("<h5>" + "correct Answer : " + correctvaluedisplay);
                if (correctvaluedisplay == value) {
                    correctmark++;
                } else if (tanu != correct) {
                    console.log("incorrect");
                }
                $("#output").append("<h1>" + "Total marks scored : " + correctmark);

            });
        } else if (group <= resultque.length - 1) {
            $(".checkresult").click(function() {
                // $("#output").show();
                $("#container").empty();
                $("#output").append("<h3>" + question);
                $("#output").append("<h4>" + "user input : " + value);
                $("#output").append("<h5>" + "correct Answer : " + correctvaluedisplay);

                if (correctvaluedisplay == value) {
                    correctmark++;
                } else if (tanu != correct) {
                    console.log("incorrect");
                }
            });

        }
    }

    function QuestionUpdate(question, correct) {
        if (group == resultque.length) {

            $(".checkresult").click(function() {
                $(".checkresult").css('cursor', 'auto');
                $("#container").empty();
                UserInputArr.push(tanu);
                console.log(UserInputArr)
                questionInput.push(question);
                group++;
                console.log(group);
                parseData();

            });
        } else if (group < resultque.length - 1) {
            $(".checkresult").click(function() {
                $(".checkresult").css('cursor', 'auto');
                $("#container").empty();
                UserInputArr.push(tanu);
                questionInput.push(question);
                group++;
                console.log(group);
                parseData();
            });
        }

    }

    function parseData() {

        // here  we call to the head section

        multiple = myJson.global;
        // console.log(multiple)
        head = multiple.head.title;
        console.log(head);
        container = $("#container");
        (container).append("<h1>" + head);

        //here we call to the Questions section

        question = multiple.questions[group].ques;
        console.log(question)
        resultque = myJson.global.questions;
        correct = multiple.questions[group].correctAnswer;
        textvalue = multiple.questions[group];
        option = multiple.questions[group].options;
        console.log(option)
        buttonName = multiple.button;

        output = $("#output");
        $("#container").append("<p id=tan>" + question);


        for (var i = 0; i < option.length; i++) {
            $("#container").append("<p id=para>");
            $("#para").append("<input type='radio' value ='" + i + "' id = '" + i + "' name=option class='radiobtn'>")
            $("#para").append("<label name=option for=" + i + ">" + option[i].text + "</label><br>")
            if (i == correct) {
                correctvaluedisplay = option[i].text;
                console.log(correctvaluedisplay)
            }
        }

        $(container).append("<button class=checkresult>" + buttonName.answer)
        $(".checkresult").attr("disabled", "disabled");
        var radios = document.getElementsByName('option');
        for (var n = 0; n < radios.length; n++) {
            radios[n].onclick = function() {
                $("input[name=option]:checked").each(function() {
                    var tanu = $(this).attr("id");
                    console.log("tanu value is" + tanu)
                    value = $("label[for='" + tanu + "']").text();
                    console.log("value value is" + value);
                });
                $(".checkresult").removeAttr("disabled");
            }
        }
        ResultsUpdate(question, correct);
        QuestionUpdate(question, correct);

    }
});