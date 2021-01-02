window.addEventListener('DOMContentLoaded', function() {
    var ratesForm = document.querySelector('#rates-form');

    ratesForm.querySelectorAll('input[type="text"], input[type="number"], input[type="radio"], input[type="checkbox"],textarea,select').forEach(function(field) {
        field.addEventListener('input', function(e) {
            if (document.querySelector('input[name="ink-color"][value="multiple"]').checked == true) {
                document.querySelector('.form-field.inks').style.display = "block";
            } else document.querySelector('.form-field.inks').style.display = "none";
            getEstimate();
        })
    });

    function getEstimate() {
        var estimate = 0;

        // Count words in text area
        var fieldText = document.querySelector('#field-text');

        if (fieldText.value != "") {
            var numberOfWords = fieldText.value.trim().replaceAll('&','').replaceAll('  ',' ').split(" ").length;

            if (numberOfWords <= 3) estimate += 30;
            else if (numberOfWords <= 6) estimate += 40;
            else if (numberOfWords <= 12) estimate += 55;
            else if (numberOfWords <= 20) estimate += 80;
            else if (numberOfWords <= 50) estimate += 80 + ((numberOfWords - 20) * 5);
            else if (numberOfWords <= 75) estimate += 80 + ((numberOfWords - 20) * 6);
            else if (numberOfWords <= 100) estimate += 80 + ((numberOfWords - 20) * 7);
            else estimate += 80 + ((numberOfWords - 20) * 8);
        }
        

        // colored inks
        var fieldInks = document.querySelector('#field-inks');
        if (fieldInks.value != "" && fieldInks.value.search(/[0-9]+/) > -1 && parseFloat(fieldInks.value) <=10) {
            estimate += 5 * parseFloat(fieldInks.value)
        }

        // checkboxes
        ratesForm.querySelectorAll('input[type="checkbox"').forEach(function(checkbox) {
            if (checkbox.checked && checkbox.hasAttribute('value')) {
                estimate += parseFloat(checkbox.value);
            }
        })


        var estimatePlaceholder = document.querySelector('#rates-estimate')
        estimatePlaceholder.innerHTML = estimate;
    }
})