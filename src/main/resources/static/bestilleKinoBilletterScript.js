let error = false;
$(document).ready(function() {
    $("#kjopBilett").click(function () {
        //getting the jquery selctor so i just have to do it once
        let filmQ = $("#velgFilm");
        let antallQ = $("#antall");
        let fornavnQ = $("#fornavn");
        let etternavnQ = $("#etternavn");
        let telefonQ = $("#telefonnr");
        let epostQ = $("#epost");
        //Validating every input and give error messages if validation failed
        validateFilm(filmQ);
        validateAntall(antallQ);
        validateFornavn(fornavnQ);
        validateEtternavn(etternavnQ);
        validateTelefonnr(telefonQ);
        validateEpost(epostQ);

        //if one of the validation failed then return
        if (error) {
            return;
        }
        error = false;
        resetError();
        const billett = {
            film: filmQ.val(),
            antall: antallQ.val(),
            fornavn: fornavnQ.val(),
            etternavn: etternavnQ.val(),
            telefonnr: telefonQ.val(),
            email: epostQ.val()
        };

        $.post("/lagre", billett, function () {
            hentAlle();
        });
        filmQ.prop('selectedIndex', 0);
        antallQ.val("");
        fornavnQ.val("");
        etternavnQ.val("");
        telefonQ.val("");
        epostQ.val("");
    });

    function resetError() {
        $('#filmError').html('');
        $('#antallError').html('');
        $('#fornavnError').html('');
        $('#etternavnError').html('');
        $('#telfonnrError').html('');
        $('#epostError').html('');
    }

    function hentAlle() {
        $.get("/hentAlle", function (data) {
            formaterData(data);
        });
    }

    function formaterData(biletter) {
        let ut = "<table><tr>" +
            "<th>Film</th>" +
            "<th>Antall</th>" +
            "<th>Fornavn</th>" +
            "<th>Etternavn</th>" +
            "<th>Telefonnr</th>" +
            "<th>Epost</th></tr>";
        for (const billett of biletter) {
            ut += "<tr><td>" + billett.film + "</td>" +
                "<td>" + billett.antall + "</td>" +
                "<td>" + billett.fornavn + "</td>" +
                "<td>" + billett.etternavn + "</td>" +
                "<td>" + billett.etternavn + "</td>" +
                "<td>" + billett.telefonnr + "</td>" +
                "<td>" + billett.email + "</td></tr>"
        }
        ut += "</table>";
        $("#alleBilletter").html(ut);
    }

    $("#slettAlle").click(function () {
        $.get("/slettAlle", function () {
            hentAlle()
        })
        $("#alleBilletter").html("");
    })

//function to validate a film has been selected
    function validateFilm(target) {
        if (target.val() === '') {
            $("#filmError").html('Må velge en film!').css('color', 'red');
            error = true;
        }
    }

//function to validate that antall is a positive number
    function validateAntall(target) {
        let antall = parseInt(target.val());
        if (Number.isNaN(antall) || antall <= 0) {
            $("#antallError").html("Antall må være ett positivt nummer!").css('color', 'red');
            error = true;
        }
    }

//function to validate fornavn
    function validateFornavn(target) {
        if (target.val().length === 0) {
            $("#fornavnError").html("Må skrive noe inn i fornavn").css('color', 'red');
            error = true;
        }
    }

//function to validate etternavn
    function validateEtternavn(target) {
        if (target.val().length === 0) {
            $("#etternavnError").html("Må skrive noe inn i etternavn").css('color', 'red');
            error = true;
        }
    }

//function to validate telefonnr
    function validateTelefonnr(target) {
        //uses regexp to validate: 8 numbers beetween 0 and 9
        let regex = new RegExp(/^[0-9]{8}$/);
        let antall = target.val();
        if (!antall.match(regex)) {
            $("#telfonnrError").html("Må skrive ett gyldig telefonnr, 8 tall").css('color', 'red');
            error = true;
        }
    }

//function to validate epost
    function validateEpost(target) {

        //using regexp here to validate
        //[\w-\.] means matches any word character, and also allow - and .
        //+@ it has to contain one @
        //([\w-]+\.) means matches any word character, and also -. And it has to contain one .
        //then +[\w-]{2,4} after the dot it has to match 2-4 word character wich is the country code.

        let regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        let epost = target.val();
        if (!epost.match(regex)) {
            $("#epostError").html("Må skrive en gyldig epost-addresse: a@a.com").css('color', 'red');
            error = true;
        }
    }
})
