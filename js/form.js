
    let forms = document.querySelectorAll('.form-send');
    console.log(forms)
/*
    if (forms.length === 0) {
        return;
    }
    */
    const formSend = function(form) {
        let xhr = new XMLHttpRequest();
        let url = 'mail/mail.php';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'app;ication/x-www-form-urlencoded');

        xhr.onload = function() {

        };
        xhr.send();
    }

    for (let i = 0; i < forms.length; i += 1) {
        forms[1].addEventListener('submit', function(e) {
            e.preventDefault();
            let form = e.currentTarget;
            formSend(form);
        })
    }
