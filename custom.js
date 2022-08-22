$(document).ready(function () {
    //restrict enter key
    $(document).keypress(function (event) {
        if (event.which == '13') {
            event.preventDefault();
        }
    });
    //number convert into word define varibales
    var words1 = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var words2 = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    //number convert into words function
    function inWords(num) {
        if ((num = num.toString()).length > 9) return 'this value not accepted';
        n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (words1[Number(n[1])] || words2[n[1][0]] + ' ' + words1[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (words1[Number(n[2])] || words2[n[2][0]] + ' ' + words1[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (words1[Number(n[3])] || words2[n[3][0]] + ' ' + words1[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (words1[Number(n[4])] || words2[n[4][0]] + ' ' + words1[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? '' : '') + (words1[Number(n[5])] || words2[n[5][0]] + ' ' + words1[n[5][1]]) : '';
        return str;
    }
    //entered number convert into words
    $(document).on('keyup', '.number-converter', function () {
        $(this).parent().find(".number-in-words").text(inWords($(this).val())); //show converted words in next sibling
    });

    //accept only two values after decimal and value greater then zero
    $(document).on('keyup', 'input[type=number]', function (event) {
        let pressedKey = event.which || event.keyCode || event.charCode; //check press key code
        //minimum value set user can't enter value below value
        let minValue = $(this).data('min');
        let value = $(this).val();
        if (minValue != undefined && value == 0 && pressedKey != 8) { //when user start value with 0
            value = '1' //when user enter 0 replace with 1
            $(this).val(value); //rewrite value
        }
        //accept value after decimal
        let acceptDigitAfterDecimal = $(this).data('decimal');
        if (value.split('.').length > 1 && acceptDigitAfterDecimal != undefined && pressedKey != 8) { //8 = keyboard backspace
            value = parseFloat(value).toFixed(acceptDigitAfterDecimal); //set value after decimal
            $(this).val(value); //rewrite value
        }
    });

    //accept only numbers in input type="text"
    function onlyNumber(evt) { // Only ASCII character in that range allowed
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            return false;
        return true;
    }
});


