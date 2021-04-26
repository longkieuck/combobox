$(document).ready(function() {
    let options = [{ text: "Nam", value: 0 }, { text: "Nữ", value: 1 }, { text: "Khác", value: 2 }, ]
    let filterOptions = [...options]
    let selected = { text: "", value: -1 }
    let curPosition = 0 //Vị trí con trỏ hiện tại
        //Ẩn
    let show = false
    $("#table-option").hide()

    $("#txtGender").on('input', function(e) {
        show = true

        filterOptions = options.filter(i => i.text.includes(e.target.value))

        // $("tbody").empty()
        loadOptions(filterOptions,selected)
        $("#table-option").show()
        $("tbody tr").mousedown(function(e) {
            selected = options[$(this).attr("value")]
            $("#txtGender").val(selected.text)
            $(this).siblings().removeClass('tr-selected');
            $(this).addClass('tr-selected')
        })
    })

    $("#btn-show").click(async function(e) {
        if (show == true) {
            $("#table-option").hide()
            show = false
        } else {
            filterOptions = await [...options]
            // await $("tbody").empty()
            await loadOptions(filterOptions,selected)
            await $("#table-option").show()
            $("tbody tr").mousedown(function(e) {
                selected = filterOptions[$(this).attr("value")]
                $("#txtGender").val(selected.text)
                $(this).siblings().removeClass('tr-selected');
                $(this).addClass('tr-selected')
            })

            $(function() {
                $("#table-option > tbody > tr").mouseover(function() {
                    $("#txtGender").val(filterOptions[$(this).attr("value")].text)
                    $(this).siblings().removeClass('tr-before-selected');
                })
            })

            show = true
        }
    })

    window.addEventListener('click', function(event) {
        var box = document.getElementById('table-option');
        var bt = document.getElementById('btn-show');
        if (event.target != box && event.target.parentNode != box && event.target != bt) {
            if (show == true) {
                $("#table-option").hide()
                show = false
            }
        }
    });
    $(function() {
        $(document).keydown(function(e) {
            if (show == true) {
                //down
                if (e.which === 40) {
                    if (curPosition == (filterOptions.length - 1)) {
                        curPosition = 0
                    } else curPosition++
                        setTrBeforeSelectedStyle(curPosition)
                    $("#txtGender").val(filterOptions[curPosition].text)
                }
                //up
                if (e.which === 38) {

                    if (curPosition == 0) {
                        curPosition = filterOptions.length - 1
                    } else curPosition--
                        setTrBeforeSelectedStyle(curPosition)
                    $("#txtGender").val(filterOptions[curPosition].text)
                }
                if (e.which === 13) { //enter
                    selected = filterOptions[curPosition]
                    $("#table-option").hide()
                    show = false
                    $("#txtGender").val(selected.text)
                    curPosition = 0
                }
                if (e.which === 9) { //Tab
                    selected = filterOptions[curPosition]
                    $("#table-option").hide()
                    show = false
                }

            }else{
                filterOptions=[...options]
                if (e.which === 40 && document.activeElement.id == "txtGender") {
                    loadOptions(filterOptions,selected)
                    $("#table-option").show()
                    show=true
                }
            }
        });
    });

    jQuery.fn.extend({
        getData: function() {
            var tb = $("#table-option").attr("id");
            if (tb == this.attr("id")) return options
        },
        getValue: function() {
            var tb = $("#table-option").attr("id");
            if (tb == this.attr("id")) {
                return selected.value
            }
        },
        getText: function() {
            var tb = $("#table-option").attr("id");
            if (tb == this.attr("id")) {
                return selected.text
            }
        }
    });

    $("#txtGender").focus(() => {
        $("#txtGender").css("border-color", "green")
    })

    $("#txtGender").blur(() => {
        let check = false
        let val = $("#txtGender").val()
        options.forEach(i => {
            if (i.text == val) check = true
        })
        if (check == false) $("#txtGender").css("border-color", "red")
        else $("#txtGender").css("border-color", "black")
    })
})

function loadOptions(options,selected){
    $("tbody").empty()
    options.forEach(i => {

            if (i.value == selected.value) {
                $('#table-option').append(`<tr class="tr-selected" value="${i.value}">
                            <td><div class="icon-selected">&#10004;</div>${i.text}</td>
                        </tr>`)
            } else if(i.value == options[0].value)
            $('#table-option').append(`<tr class="tr-before-selected" value="${i.value}">
            <td>${i.text}</td>
                        </tr>`)
                    else
                $('#table-option').append(`<tr value="${i.value}">
                            <td>${i.text}</td>
                        </tr>`)
        })

}

function setTrBeforeSelectedStyle(curPosition) {
    $("#table-option > tbody > tr").siblings().removeClass('tr-before-selected');
    $("#table-option > tbody > tr").each(function(index, tr) {
        if ($(tr).attr("value") == curPosition) {
            $(tr).addClass('tr-before-selected')
        }
    });
}