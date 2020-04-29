const $$ = (...args) => document.querySelectorAll(...args)

function hasProfile() {
    return localStorage.getItem('firstname') !== null
}

function saveProfile() {
    for (field of $$('#form-profile input:not([disabled]):not([type=checkbox])')) {
        localStorage.setItem(field.id.substring('field-'.length), field.value)
    }
}

function loadProfile() {
    const fields = getProfile();

    for (field of Object.keys(fields)) {
        $(`#field-${field}`).val(fields[field])
    }
}

function getProfile() {
    const fields = {}
    for (let i = 0; i < localStorage.length; i++){
        const name = localStorage.key(i)
        fields[name] = localStorage.getItem(name)
    }
    return fields
}

function saveReason() {
    const value = $('input[name="field-reason"]:checked').val()
    localStorage.setItem('last-reason', value)
}

function restoreReason() {
    const value = localStorage.getItem('last-reason')
    if (value === null)
        return

    $(`#checkbox-${value}`).attr('checked', true)
}

$('#button-generate').click(function () {
    saveProfile();
    saveReason();
});

$(document).ready(function () {
    if (hasProfile()) {
        loadProfile();
        restoreReason();
    }
})