$(document).ready(function() {
    let imgArr = ['img/rock.png', 'img/paper.png', 'img/Scissors.png'];
    //                 12               13                 16
    let scorePlayer = 0;
    let scoreAI = 0;

    function randomAI() {
        return Math.floor(Math.random() * 3); //от 0 до 2
    }
    $('.object-choice .objectId').on('click', function() {
        $('#player-kulak').attr('src', $(this).attr('src'));
        $('#ai-kulak').attr('src', imgArr[randomAI()]);

        if ($('#player-kulak').attr('src') == $('#ai-kulak').attr('src')) {
            $('#winner').text('Draw');
        } else if (($('#player-kulak').attr('src')).length == 12) {
            if (($('#ai-kulak').attr('src')).length == 13) {
                $('#score-AI').text($('#score-AI').text() * 1 + 1);
                $('#winner').text('AI win');
            } else if (($('#ai-kulak').attr('src')).length == 16) {
                $('#score-player').text($('#score-player').text() * 1 + 1);
                $('#winner').text('Player win');
            }
        } else if (($('#player-kulak').attr('src')).length == 13) {
            if (($('#ai-kulak').attr('src')).length == 16) {
                $('#score-AI').text($('#score-AI').text() * 1 + 1);
                $('#winner').text('AI win');
            } else if (($('#ai-kulak').attr('src')).length == 12) {
                $('#score-player').text($('#score-player').text() * 1 + 1);
                $('#winner').text('Player win');
            }
        } else if (($('#player-kulak').attr('src')).length == 16) {
            if (($('#ai-kulak').attr('src')).length == 12) {
                $('#score-AI').text($('#score-AI').text() * 1 + 1);
                $('#winner').text('AI win');
            } else if (($('#ai-kulak').attr('src')).length == 13) {
                $('#score-player').text($('#score-player').text() * 1 + 1);
                $('#winner').text('Player win');
            }
        }
    });
});