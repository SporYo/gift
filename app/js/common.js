$(function () {

    // Initialize Cloud Firestore through Firebase

    firebase.initializeApp({
        apiKey: '-',
        authDomain: '-',
        projectId: '-'
    });

    var db = firebase.firestore();

    db.collection("gifts").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            let dataFilter = Object.keys(data).filter((key) => data[key] > 0)
            console.log(dataFilter);

            const gift = document.querySelector('.welcome__box');
            const form = document.querySelector('.form');
            gift.addEventListener('click', function () {
                form.classList.toggle('hidden')
            })

            const fromAction = form.querySelector('.form__action')
            const giftPopup = document.querySelector('.gift');

            let giftContent = document.querySelector('.gift__content');
            let giftBox = document.createElement('img');
            giftContent.appendChild(giftBox);
            let randomItem = dataFilter[Math.floor(Math.random() * dataFilter.length)];
            giftBox.src = "./img/welcome/" + randomItem + ".png";

            fromAction.addEventListener('submit', function (event) {
                event.preventDefault()
                form.classList.toggle('hidden')
                giftPopup.classList.toggle('hidden')
                let formInput = document.querySelector('.form__input').value

                fetch('/lander/kostin-test_1637923120/index.php', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            user_email: formInput,
                            user_gift: randomItem
                        })
                    })
                    .then((data) => {
                        var washingtonRef = db.collection("gifts").doc("aN6inZP3d0QcEDpCWHF3");
                        return washingtonRef.update({
                                [randomItem] : firebase.firestore.FieldValue.increment(-1)
                            })
                            .then(() => {
                                console.log("Document successfully updated!");
                            })
                            .catch((error) => {
                                console.error("Error updating document: ", error);
                            });
                    });
            })

        });
    });


    $(".form").on('click', function (e) {
        if (e.target == this) $(".form").addClass('hidden');
    });
    $(".gift").on('click', function (e) {
        if (e.target == this) $(".gift").addClass('hidden');
    });



});